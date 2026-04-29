import { useMemo, type ReactNode } from "react";
import { useLocation } from "wouter";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CalendarDays,
  CreditCard,
  FileText,
  Mail,
  MessageSquareQuote,
  ReceiptText,
} from "lucide-react";

import { SEO } from "@/components/seo";
import { AdminCMSLayout } from "@/pages/admin-cms/layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { DeleteModal } from "@/components/admin/DeleteModal";
import { EmailComposer } from "@/components/admin/EmailComposer";
import { InvoiceForm } from "@/components/admin/InvoiceForm";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Booking, ContactMessage, Invoice, InvoiceLineItem, Quote } from "@shared/schema";

type AdminTab = "overview" | "bookings" | "quotes" | "contacts" | "invoices";

type AdminStats = {
  totalBookings: number;
  pendingBookings: number;
  totalInvoices: number;
  paidInvoices: number;
  unpaidInvoices: number;
  totalRevenue: number;
  totalContacts: number;
  pendingReminders: number;
};

type AdminInvoiceRecord = Invoice & {
  lineItems?: InvoiceLineItem[];
};

const tabConfig: Array<{
  value: AdminTab;
  label: string;
  href: string;
  icon: typeof CalendarDays;
}> = [
  { value: "overview", label: "Overview", href: "/admin/cms", icon: FileText },
  { value: "bookings", label: "Bookings", href: "/admin/cms/bookings", icon: CalendarDays },
  { value: "quotes", label: "Quotes", href: "/admin/cms/quotes", icon: MessageSquareQuote },
  { value: "contacts", label: "Contacts", href: "/admin/cms/contacts", icon: Mail },
  { value: "invoices", label: "Invoices", href: "/admin/cms/invoices", icon: CreditCard },
];

const statusClasses: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800",
  confirmed: "bg-sky-100 text-sky-800",
  completed: "bg-emerald-100 text-emerald-800",
  cancelled: "bg-rose-100 text-rose-800",
  paid: "bg-emerald-100 text-emerald-800",
  unpaid: "bg-orange-100 text-orange-800",
  draft: "bg-slate-200 text-slate-800",
  sent: "bg-blue-100 text-blue-800",
  new: "bg-sky-100 text-sky-800",
  deleted: "bg-rose-100 text-rose-800",
  resolved: "bg-emerald-100 text-emerald-800",
};

function formatCurrency(cents: number | null | undefined) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format((cents ?? 0) / 100);
}

function formatDateTime(value: string | Date | null | undefined) {
  if (!value) return "Not available";
  return new Date(value).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatDate(value: string | Date | null | undefined) {
  if (!value) return "Not available";
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getActiveTab(pathname: string): AdminTab {
  const match = tabConfig.find((item) => item.href === pathname);
  return match?.value ?? "overview";
}

function getTabCopy(tab: AdminTab) {
  switch (tab) {
    case "bookings":
      return {
        title: "Bookings Management",
        subtitle: "Confirm jobs, update statuses, and softly remove requests without losing history.",
      };
    case "quotes":
      return {
        title: "Quote Requests",
        subtitle: "Review incoming quote requests and softly delete the ones you no longer want in active lists.",
      };
    case "contacts":
      return {
        title: "Contact Message Replies",
        subtitle: "Reply directly from the admin panel and keep a record of what was sent.",
      };
    case "invoices":
      return {
        title: "Invoice Workspace",
        subtitle: "Create invoices with line items, review billing details, and mark payments received.",
      };
    default:
      return {
        title: "Admin Operations",
        subtitle: "Use one place to manage bookings, quotes, contact replies, and invoices safely.",
      };
  }
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
        statusClasses[status.toLowerCase()] ?? "bg-slate-100 text-slate-700"
      }`}
    >
      {status}
    </span>
  );
}

function InfoCard({
  label,
  value,
  helper,
}: {
  label: string;
  value: string | number;
  helper?: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">{label}</p>
      <p className="mt-4 text-3xl font-bold text-slate-950">{value}</p>
      {helper ? <p className="mt-2 text-sm text-slate-600">{helper}</p> : null}
    </div>
  );
}

function SectionShell({
  title,
  description,
  children,
  action,
}: {
  title: string;
  description: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <div className="flex flex-col gap-4 border-b border-slate-100 pb-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-950">{title}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600">{description}</p>
        </div>
        {action}
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center">
      <p className="text-lg font-semibold text-slate-800">{title}</p>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
    </div>
  );
}

function OverviewTab({ stats }: { stats: AdminStats | undefined }) {
  const quickLinks = useMemo(
    () => tabConfig.filter((item) => item.value !== "overview"),
    [],
  );

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard
          label="Bookings"
          value={stats?.totalBookings ?? 0}
          helper={`${stats?.pendingBookings ?? 0} still pending`}
        />
        <InfoCard
          label="Invoices"
          value={stats?.totalInvoices ?? 0}
          helper={`${stats?.unpaidInvoices ?? 0} unpaid`}
        />
        <InfoCard
          label="Collected Revenue"
          value={formatCurrency(stats?.totalRevenue)}
          helper={`${stats?.paidInvoices ?? 0} invoices paid`}
        />
        <InfoCard
          label="Contacts"
          value={stats?.totalContacts ?? 0}
          helper={`${stats?.pendingReminders ?? 0} pending reminders`}
        />
      </div>

      <SectionShell
        title="Quick Actions"
        description="Jump straight into the operational areas the team uses most."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {quickLinks.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.value}
                href={item.href}
                className="rounded-3xl border border-blue-200 bg-blue-50 p-5 transition-colors hover:bg-blue-100"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-blue-700 p-3 text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-slate-900">{item.label}</p>
                    <p className="text-sm text-slate-600">Open {item.label.toLowerCase()} tools</p>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </SectionShell>
    </div>
  );
}

function BookingsTab() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { data: bookings = [], isLoading } = useQuery<Booking[]>({
    queryKey: ["/api/admin/bookings"],
  });

  const statusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      await apiRequest("PATCH", `/api/admin/bookings/${id}/status`, { status });
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["/api/admin/bookings"] }),
        queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] }),
      ]);
      toast({ title: "Booking status updated" });
    },
    onError: (error: Error) => {
      toast({
        title: "Could not update booking",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return <div className="py-8 text-sm text-slate-500">Loading bookings...</div>;
  }

  if (!bookings.length) {
    return (
      <EmptyState
        title="No active bookings"
        description="New customer bookings will appear here once they are submitted."
      />
    );
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <div
          key={booking.id}
          className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
        >
          <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-xl font-semibold text-slate-950">{booking.fullName}</h3>
                <StatusBadge status={booking.status} />
              </div>
              <p className="mt-3 text-sm font-semibold text-slate-800">{booking.serviceTitle}</p>
              <div className="mt-4 grid gap-2 text-sm text-slate-600 md:grid-cols-2">
                <p>Email: {booking.email}</p>
                <p>Phone: {booking.phone}</p>
                <p>Preferred Date: {booking.preferredDate}</p>
                <p>Created: {formatDateTime(booking.createdAt)}</p>
                <p className="md:col-span-2">Address: {booking.address}</p>
              </div>
              {booking.notes ? (
                <div className="mt-4 rounded-2xl bg-white p-4 text-sm leading-7 text-slate-700">
                  {booking.notes}
                </div>
              ) : null}
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto">
              <select
                value={booking.status}
                onChange={(event) =>
                  statusMutation.mutate({ id: booking.id, status: event.target.value })
                }
                className="min-h-11 rounded-2xl border border-slate-300 bg-white px-4 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <DeleteModal
                endpoint={`/api/admin/bookings/${booking.id}`}
                entityLabel="Booking"
                queryKeysToInvalidate={[["/api/admin/bookings"], ["/api/admin/stats"]]}
                successMessage="Booking softly deleted"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function QuotesTab() {
  const { data: quotes = [], isLoading } = useQuery<Quote[]>({
    queryKey: ["/api/admin/quotes"],
  });

  if (isLoading) {
    return <div className="py-8 text-sm text-slate-500">Loading quotes...</div>;
  }

  if (!quotes.length) {
    return (
      <EmptyState
        title="No active quote requests"
        description="Quote requests will show up here once customers ask for estimates."
      />
    );
  }

  return (
    <div className="space-y-4">
      {quotes.map((quote) => (
        <div
          key={quote.id}
          className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
        >
          <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-xl font-semibold text-slate-950">{quote.fullName}</h3>
                <StatusBadge status={quote.status} />
                <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700">
                  {quote.urgency}
                </span>
              </div>
              <p className="mt-3 text-sm font-semibold text-slate-800">
                {quote.serviceType} for {quote.propertyType}
              </p>
              <div className="mt-4 grid gap-2 text-sm text-slate-600 md:grid-cols-2">
                <p>Email: {quote.email}</p>
                <p>Phone: {quote.phone}</p>
                <p>Created: {formatDateTime(quote.createdAt)}</p>
                {quote.address ? <p className="md:col-span-2">Address: {quote.address}</p> : null}
              </div>
              <div className="mt-4 rounded-2xl bg-white p-4 text-sm leading-7 text-slate-700">
                {quote.description}
              </div>
            </div>

            <div className="w-full sm:w-auto">
              <DeleteModal
                endpoint={`/api/admin/quotes/${quote.id}`}
                entityLabel="Quote"
                queryKeysToInvalidate={[["/api/admin/quotes"], ["/api/admin/stats"]]}
                successMessage="Quote softly deleted"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ContactsTab() {
  const { data: contacts = [], isLoading } = useQuery<ContactMessage[]>({
    queryKey: ["/api/admin/contacts"],
  });

  if (isLoading) {
    return <div className="py-8 text-sm text-slate-500">Loading contact messages...</div>;
  }

  if (!contacts.length) {
    return (
      <EmptyState
        title="No contact messages"
        description="When customers submit the contact form, their messages will show here."
      />
    );
  }

  return (
    <div className="space-y-4">
      {contacts.map((contact) => (
        <div
          key={contact.id}
          className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
        >
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-xl font-semibold text-slate-950">{contact.name}</h3>
            {contact.isResolved ? <StatusBadge status="resolved" /> : <StatusBadge status="pending" />}
          </div>
          <div className="mt-4 grid gap-2 text-sm text-slate-600 md:grid-cols-2">
            <p>Email: {contact.email}</p>
            {contact.phone ? <p>Phone: {contact.phone}</p> : null}
            <p className="md:col-span-2">Received: {formatDateTime(contact.createdAt)}</p>
            {contact.repliedAt ? (
              <p className="md:col-span-2">Last Reply: {formatDateTime(contact.repliedAt)}</p>
            ) : null}
          </div>
          <div className="mt-4 rounded-2xl bg-white p-4 text-sm leading-7 text-slate-700">
            {contact.message}
          </div>
          <div className="mt-5">
            <EmailComposer
              contactId={contact.id}
              recipientName={contact.name}
              recipientEmail={contact.email}
              existingReplyMessage={contact.replyMessage}
              isResolved={contact.isResolved}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function InvoicesTab() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { data: invoices = [], isLoading } = useQuery<AdminInvoiceRecord[]>({
    queryKey: ["/api/admin/invoices"],
  });

  const markPaidMutation = useMutation({
    mutationFn: async (invoiceNumber: string) => {
      await apiRequest("POST", `/api/invoices/${invoiceNumber}/pay`, {});
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["/api/admin/invoices"] }),
        queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] }),
      ]);
      toast({ title: "Invoice marked as paid" });
    },
    onError: (error: Error) => {
      toast({
        title: "Could not update invoice",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <div className="space-y-8">
      <SectionShell
        title="Create Invoice"
        description="Build a new invoice with flexible line items. Existing invoice APIs stay compatible while new invoices can store richer details."
      >
        <InvoiceForm />
      </SectionShell>

      <SectionShell
        title="Recent Invoices"
        description="Review invoice status, line items, and quick billing actions."
      >
        {isLoading ? (
          <div className="py-8 text-sm text-slate-500">Loading invoices...</div>
        ) : !invoices.length ? (
          <EmptyState
            title="No invoices created yet"
            description="Create your first invoice above and it will appear here."
          />
        ) : (
          <div className="space-y-4">
            {invoices.map((invoice) => (
              <div
                key={invoice.id}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
              >
                <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-xl font-semibold text-slate-950">
                        {invoice.invoiceNumber}
                      </h3>
                      <StatusBadge status={invoice.status} />
                    </div>
                    <p className="mt-3 text-sm font-semibold text-slate-800">
                      {invoice.clientName ?? invoice.customerName} · {invoice.clientEmail ?? invoice.customerEmail}
                    </p>
                    <div className="mt-4 grid gap-2 text-sm text-slate-600 md:grid-cols-2">
                      <p>Service: {invoice.serviceTitle}</p>
                      <p>Created: {formatDateTime(invoice.createdAt)}</p>
                      <p>Amount: {formatCurrency(invoice.amount)}</p>
                      <p>Due Date: {invoice.dueDate ? formatDate(invoice.dueDate) : "Not set"}</p>
                      {invoice.paidAt ? (
                        <p className="md:col-span-2">Paid At: {formatDateTime(invoice.paidAt)}</p>
                      ) : null}
                    </div>

                    {invoice.lineItems?.length ? (
                      <div className="mt-4 rounded-2xl bg-white p-4">
                        <p className="text-sm font-semibold text-slate-900">Line Items</p>
                        <div className="mt-3 space-y-2">
                          {invoice.lineItems.map((item) => (
                            <div
                              key={item.id}
                              className="flex flex-col gap-1 text-sm text-slate-700 sm:flex-row sm:items-center sm:justify-between"
                            >
                              <span>{item.description || "Line item"}</span>
                              <span>
                                Qty {item.quantity || "0"} × ${item.unitPrice || "0.00"}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>

                  <div className="flex w-full flex-col gap-3 sm:w-auto">
                    {invoice.status.toLowerCase() !== "paid" ? (
                      <Button
                        type="button"
                        className="bg-emerald-600 text-white hover:bg-emerald-700"
                        onClick={() => markPaidMutation.mutate(invoice.invoiceNumber)}
                        disabled={markPaidMutation.isPending}
                      >
                        <ReceiptText className="mr-2 h-4 w-4" />
                        {markPaidMutation.isPending ? "Updating..." : "Mark Paid"}
                      </Button>
                    ) : null}

                    <DeleteModal
                      endpoint={`/api/admin/invoices/${invoice.id}`}
                      entityLabel="Invoice"
                      queryKeysToInvalidate={[["/api/admin/invoices"], ["/api/admin/stats"]]}
                      successMessage="Invoice deleted"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </SectionShell>
    </div>
  );
}

export default function AdminCMSDashboard() {
  const [location, navigate] = useLocation();
  const activeTab = getActiveTab(location);
  const { title, subtitle } = getTabCopy(activeTab);
  const { data: stats } = useQuery<AdminStats>({
    queryKey: ["/api/admin/stats"],
  });

  return (
    <AdminCMSLayout title={title} subtitle={subtitle}>
      <SEO title="Admin CMS" description="Operations and website management tools." noindex={true} />

      <div className="space-y-8">
        <div className="rounded-[2rem] border border-blue-100 bg-gradient-to-r from-blue-50 via-white to-sky-50 p-6 shadow-sm">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
                Operations Center
              </p>
              <h2 className="mt-3 text-3xl font-bold text-slate-950">
                Manage customer activity without touching the database directly
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
                These tools now support soft deletes for bookings and quotes, direct replies to contact messages, and structured invoices with line items.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl border border-blue-100 bg-white px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Bookings
                </p>
                <p className="mt-1 text-xl font-bold text-slate-950">{stats?.totalBookings ?? 0}</p>
              </div>
              <div className="rounded-2xl border border-blue-100 bg-white px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Pending Bookings
                </p>
                <p className="mt-1 text-xl font-bold text-slate-950">{stats?.pendingBookings ?? 0}</p>
              </div>
              <div className="rounded-2xl border border-blue-100 bg-white px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Contacts
                </p>
                <p className="mt-1 text-xl font-bold text-slate-950">{stats?.totalContacts ?? 0}</p>
              </div>
              <div className="rounded-2xl border border-blue-100 bg-white px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Invoices
                </p>
                <p className="mt-1 text-xl font-bold text-slate-950">{stats?.totalInvoices ?? 0}</p>
              </div>
            </div>
          </div>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={(value) => {
            const next = tabConfig.find((item) => item.value === value);
            if (next) {
              navigate(next.href);
            }
          }}
          className="space-y-6"
        >
          <TabsList className="h-auto w-full flex-wrap justify-start gap-2 rounded-[2rem] bg-white p-2 shadow-sm">
            {tabConfig.map((tab) => {
              const Icon = tab.icon;
              return (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="rounded-2xl px-4 py-3 text-sm font-semibold data-[state=active]:bg-blue-700 data-[state=active]:text-white"
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {tab.label}
                </TabsTrigger>
              );
            })}
          </TabsList>

          <TabsContent value="overview">
            <OverviewTab stats={stats} />
          </TabsContent>

          <TabsContent value="bookings">
            <SectionShell
              title="Bookings"
              description="Update booking statuses or softly remove requests that should no longer appear in the active queue."
            >
              <BookingsTab />
            </SectionShell>
          </TabsContent>

          <TabsContent value="quotes">
            <SectionShell
              title="Quotes"
              description="Keep quote intake tidy by reviewing requests and softly removing anything that should be archived from daily operations."
            >
              <QuotesTab />
            </SectionShell>
          </TabsContent>

          <TabsContent value="contacts">
            <SectionShell
              title="Contacts"
              description="Reply to customers directly from the panel. Replies are stored so the team can see what has already been handled."
            >
              <ContactsTab />
            </SectionShell>
          </TabsContent>

          <TabsContent value="invoices">
            <InvoicesTab />
          </TabsContent>
        </Tabs>
      </div>
    </AdminCMSLayout>
  );
}
