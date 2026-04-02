import { useEffect, useState, type ReactNode } from "react";
import { useLocation } from "wouter";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { SEO } from "@/components/seo";
import type { Booking, ContactMessage, Invoice, Quote, Reminder } from "@shared/schema";
import type { DashboardStats } from "../../server-types";

type AdminTab = "overview" | "appointments" | "invoices" | "contacts" | "reminders" | "quotes";

function formatCurrency(cents: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);
}

function formatDate(value: string | Date | null) {
  if (!value) return "--";
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatDateTime(value: string | Date | null) {
  if (!value) return "--";
  return new Date(value).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

const statusColors: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800",
  confirmed: "bg-sky-100 text-sky-800",
  completed: "bg-emerald-100 text-emerald-800",
  cancelled: "bg-rose-100 text-rose-800",
  paid: "bg-emerald-100 text-emerald-800",
  unpaid: "bg-orange-100 text-orange-800",
  sent: "bg-emerald-100 text-emerald-800",
  new: "bg-sky-100 text-sky-800",
};

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-semibold capitalize ${
        statusColors[status] || "bg-slate-100 text-slate-700"
      }`}
    >
      {status}
    </span>
  );
}

function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-slate-600">{label}</p>
      <p className="mt-3 text-2xl font-bold text-slate-950">{value}</p>
      {sub ? <p className="mt-2 text-sm font-medium text-slate-500">{sub}</p> : null}
    </div>
  );
}

function SectionCard({ children, testId }: { children: ReactNode; testId?: string }) {
  return (
    <div
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      data-testid={testId}
    >
      {children}
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex justify-center py-12">
      <div className="h-8 w-8 rounded-full border-4 border-blue-700 border-t-transparent animate-spin" />
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
      <p className="text-sm font-medium text-slate-500">{text}</p>
    </div>
  );
}

function DeleteConfirmButton({
  testId,
  title,
  description,
  confirmLabel,
  disabled,
  onConfirm,
}: {
  testId: string;
  title: string;
  description: string;
  confirmLabel: string;
  disabled?: boolean;
  onConfirm: () => void;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          data-testid={testId}
          disabled={disabled}
          className="border-rose-200 text-rose-700 hover:bg-rose-50 hover:text-rose-800"
        >
          <Trash2 className="h-4 w-4" aria-hidden="true" />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-rose-600 text-white hover:bg-rose-700"
          >
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function OverviewTab() {
  const { data: stats, isLoading } = useQuery<DashboardStats>({
    queryKey: ["/api/admin/stats"],
  });

  if (isLoading) return <LoadingSpinner />;
  if (!stats) return null;

  return (
    <div data-testid="admin-overview">
      <h2 className="mb-6 text-lg font-semibold text-slate-950">Dashboard Overview</h2>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Bookings" value={stats.totalBookings} sub={`${stats.pendingBookings} pending`} />
        <StatCard
          label="Total Invoices"
          value={stats.totalInvoices}
          sub={`${stats.paidInvoices} paid / ${stats.unpaidInvoices} unpaid`}
        />
        <StatCard label="Revenue Collected" value={formatCurrency(stats.totalRevenue)} />
        <StatCard
          label="Contact Messages"
          value={stats.totalContacts}
          sub={`${stats.pendingReminders} pending reminders`}
        />
      </div>
    </div>
  );
}

function AppointmentsTab() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { data: bookings, isLoading } = useQuery<Booking[]>({
    queryKey: ["/api/admin/bookings"],
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      await apiRequest("PATCH", `/api/admin/bookings/${id}/status`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/bookings"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
    },
  });

  const deleteBooking = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/admin/bookings/${id}`);
    },
    onSuccess: () => {
      toast({
        title: "Booking deleted successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/bookings"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/reminders"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
    },
    onError: () => {
      toast({
        title: "Failed to delete booking",
        variant: "destructive",
      });
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div data-testid="admin-appointments">
      <h2 className="mb-6 text-lg font-semibold text-slate-950">Appointments</h2>
      {!bookings?.length ? (
        <EmptyState text="No appointments yet" />
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <SectionCard key={booking.id} testId={`card-booking-${booking.id}`}>
              <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-lg font-semibold text-slate-950">{booking.fullName}</h3>
                    <StatusBadge status={booking.status} />
                  </div>
                  <p className="mt-3 text-sm font-medium text-slate-800">{booking.serviceTitle}</p>
                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium text-slate-600">
                    <span>{booking.email}</span>
                    <span>{booking.phone}</span>
                    <span>Preferred: {booking.preferredDate}</span>
                    <span>Created: {formatDateTime(booking.createdAt)}</span>
                  </div>
                  {booking.notes ? (
                    <p className="mt-4 text-sm font-medium italic text-slate-500">"{booking.notes}"</p>
                  ) : null}
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <select
                    data-testid={`select-booking-status-${booking.id}`}
                    value={booking.status}
                    onChange={(event) =>
                      updateStatus.mutate({ id: booking.id, status: event.target.value })
                    }
                    className="min-h-10 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>

                  <DeleteConfirmButton
                    testId={`button-delete-booking-${booking.id}`}
                    title="Delete booking?"
                    description="Are you sure you want to delete this booking? This cannot be undone."
                    confirmLabel={deleteBooking.isPending ? "Deleting..." : "Delete Booking"}
                    disabled={deleteBooking.isPending}
                    onConfirm={() => deleteBooking.mutate(booking.id)}
                  />
                </div>
              </div>
            </SectionCard>
          ))}
        </div>
      )}
    </div>
  );
}

function InvoicesTab() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { data: invoiceList, isLoading } = useQuery<Invoice[]>({
    queryKey: ["/api/admin/invoices"],
  });
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    invoiceNumber: "",
    customerEmail: "",
    customerName: "",
    serviceTitle: "",
    amount: "",
    status: "unpaid",
    dueDate: "",
  });

  const createInvoice = useMutation({
    mutationFn: async (data: typeof form) => {
      await apiRequest("POST", "/api/admin/invoices", {
        ...data,
        amount: Math.round(parseFloat(data.amount) * 100),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/invoices"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      setShowForm(false);
      setForm({
        invoiceNumber: "",
        customerEmail: "",
        customerName: "",
        serviceTitle: "",
        amount: "",
        status: "unpaid",
        dueDate: "",
      });
    },
  });

  const markPaid = useMutation({
    mutationFn: async (invoiceNumber: string) => {
      await apiRequest("POST", `/api/invoices/${invoiceNumber}/pay`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/invoices"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
    },
  });

  const deleteInvoice = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/admin/invoices/${id}`);
    },
    onSuccess: () => {
      toast({
        title: "Invoice deleted successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/invoices"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
    },
    onError: () => {
      toast({
        title: "Failed to delete invoice",
        variant: "destructive",
      });
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div data-testid="admin-invoices">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold text-slate-950">Invoices</h2>
        <Button
          data-testid="button-create-invoice"
          className="bg-blue-700 text-white hover:bg-blue-800"
          onClick={() => setShowForm((value) => !value)}
        >
          {showForm ? "Cancel" : "New Invoice"}
        </Button>
      </div>

      {showForm ? (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            createInvoice.mutate(form);
          }}
          className="mb-6 grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:grid-cols-2"
        >
          {[
            { label: "Invoice #", key: "invoiceNumber", placeholder: "INV-001", type: "text" },
            { label: "Customer Name", key: "customerName", placeholder: "John Doe", type: "text" },
            { label: "Customer Email", key: "customerEmail", placeholder: "john@example.com", type: "email" },
            { label: "Service", key: "serviceTitle", placeholder: "AC Repair & Diagnostics", type: "text" },
            { label: "Amount ($)", key: "amount", placeholder: "150.00", type: "number" },
            { label: "Due Date", key: "dueDate", placeholder: "2026-03-29", type: "date" },
          ].map(({ label, key, placeholder, type }) => (
            <div key={key}>
              <label className="mb-2 block text-sm font-medium text-slate-700">{label}</label>
              <input
                data-testid={`input-invoice-${key}`}
                type={type}
                value={form[key as keyof typeof form]}
                onChange={(event) => setForm({ ...form, [key]: event.target.value })}
                placeholder={placeholder}
                required
                className="min-h-10 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          ))}
          <div className="sm:col-span-2">
            <Button
              data-testid="button-submit-invoice"
              type="submit"
              disabled={createInvoice.isPending}
              className="bg-blue-700 text-white hover:bg-blue-800"
            >
              {createInvoice.isPending ? "Creating..." : "Create Invoice"}
            </Button>
          </div>
        </form>
      ) : null}

      {!invoiceList?.length ? (
        <EmptyState text="No invoices yet" />
      ) : (
        <div className="space-y-4">
          {invoiceList.map((invoice) => (
            <SectionCard key={invoice.id} testId={`card-invoice-${invoice.id}`}>
              <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-lg font-semibold text-slate-950">{invoice.invoiceNumber}</h3>
                    <StatusBadge status={invoice.status} />
                  </div>
                  <p className="mt-3 text-sm font-medium text-slate-800">
                    {invoice.customerName} - {invoice.serviceTitle}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium text-slate-600">
                    <span>{invoice.customerEmail}</span>
                    <span>Amount: {formatCurrency(invoice.amount)}</span>
                    {invoice.dueDate ? <span>Due: {invoice.dueDate}</span> : null}
                    {invoice.paidAt ? <span>Paid: {formatDate(invoice.paidAt)}</span> : null}
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  {invoice.status !== "paid" ? (
                    <Button
                      data-testid={`button-mark-paid-${invoice.id}`}
                      variant="outline"
                      className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800"
                      onClick={() => markPaid.mutate(invoice.invoiceNumber)}
                    >
                      Mark Paid
                    </Button>
                  ) : null}

                  <DeleteConfirmButton
                    testId={`button-delete-invoice-${invoice.id}`}
                    title="Delete invoice?"
                    description="Are you sure you want to delete this invoice? This cannot be undone."
                    confirmLabel={deleteInvoice.isPending ? "Deleting..." : "Delete Invoice"}
                    disabled={deleteInvoice.isPending}
                    onConfirm={() => deleteInvoice.mutate(invoice.id)}
                  />
                </div>
              </div>
            </SectionCard>
          ))}
        </div>
      )}
    </div>
  );
}

function ContactsTab() {
  const { data: messages, isLoading } = useQuery<ContactMessage[]>({
    queryKey: ["/api/admin/contacts"],
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div data-testid="admin-contacts">
      <h2 className="mb-6 text-lg font-semibold text-slate-950">Contact Messages</h2>
      {!messages?.length ? (
        <EmptyState text="No contact messages yet" />
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <SectionCard key={message.id} testId={`card-contact-${message.id}`}>
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-lg font-semibold text-slate-950">{message.name}</h3>
                <span className="text-sm font-medium text-slate-500">
                  {formatDateTime(message.createdAt)}
                </span>
              </div>
              <p className="mt-4 text-sm font-medium leading-7 text-slate-700">{message.message}</p>
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium text-slate-600">
                <span>{message.email}</span>
                {message.phone ? <span>{message.phone}</span> : null}
              </div>
            </SectionCard>
          ))}
        </div>
      )}
    </div>
  );
}

function RemindersTab() {
  const { data: reminderList, isLoading } = useQuery<Reminder[]>({
    queryKey: ["/api/admin/reminders"],
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div data-testid="admin-reminders">
      <h2 className="mb-6 text-lg font-semibold text-slate-950">Reminders</h2>
      {!reminderList?.length ? (
        <EmptyState text="No reminders yet" />
      ) : (
        <div className="space-y-4">
          {reminderList.map((reminder) => (
            <SectionCard key={reminder.id} testId={`card-reminder-${reminder.id}`}>
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-lg font-semibold text-slate-950">{reminder.customerName}</h3>
                <StatusBadge status={reminder.status} />
                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold capitalize text-slate-600">
                  {reminder.channel}
                </span>
              </div>
              <p className="mt-3 text-sm font-medium text-slate-800">
                {reminder.serviceTitle} - {reminder.reminderType}
              </p>
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium text-slate-600">
                <span>Scheduled: {formatDateTime(reminder.scheduledFor)}</span>
                <span>Appointment: {reminder.appointmentDate}</span>
                {reminder.sentAt ? <span>Sent: {formatDateTime(reminder.sentAt)}</span> : null}
              </div>
            </SectionCard>
          ))}
        </div>
      )}
    </div>
  );
}

function QuotesTab() {
  const { data: quoteList, isLoading } = useQuery<Quote[]>({
    queryKey: ["/api/admin/quotes"],
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div data-testid="admin-quotes">
      <h2 className="mb-6 text-lg font-semibold text-slate-950">Quote Requests</h2>
      {!quoteList?.length ? (
        <EmptyState text="No quote requests yet" />
      ) : (
        <div className="space-y-4">
          {quoteList.map((quote) => (
            <SectionCard key={quote.id} testId={`card-quote-${quote.id}`}>
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-lg font-semibold text-slate-950">{quote.fullName}</h3>
                <StatusBadge status={quote.status} />
                <span
                  className={`rounded-full px-3 py-1 text-sm font-semibold capitalize ${
                    quote.urgency === "priority"
                      ? "bg-rose-100 text-rose-700"
                      : "bg-sky-100 text-sky-700"
                  }`}
                >
                  {quote.urgency}
                </span>
              </div>
              <p className="mt-3 text-sm font-medium text-slate-800">
                {quote.serviceType} - {quote.propertyType}
              </p>
              <p className="mt-4 text-sm font-medium leading-7 text-slate-700">{quote.description}</p>
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium text-slate-600">
                <span>{quote.email}</span>
                <span>{quote.phone}</span>
                {quote.address ? <span>{quote.address}</span> : null}
                <span>{formatDateTime(quote.createdAt)}</span>
              </div>
            </SectionCard>
          ))}
        </div>
      )}
    </div>
  );
}

const tabs: { id: AdminTab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "appointments", label: "Appointments" },
  { id: "invoices", label: "Invoices" },
  { id: "quotes", label: "Quotes" },
  { id: "contacts", label: "Contacts" },
  { id: "reminders", label: "Reminders" },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [, navigate] = useLocation();
  const queryClient = useQueryClient();

  const { data: auth, isLoading } = useQuery<{ isAdmin: boolean }>({
    queryKey: ["/api/admin/me"],
  });

  useEffect(() => {
    if (!isLoading && !auth?.isAdmin) {
      navigate("/admin/login");
    }
  }, [auth, isLoading, navigate]);

  const logout = async () => {
    await apiRequest("POST", "/api/admin/logout", {});
    queryClient.clear();
    navigate("/admin/login");
  };

  if (isLoading || !auth?.isAdmin) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-slate-50" data-testid="admin-dashboard">
      <SEO title="Admin Dashboard" description="Manage Bernardino Martin HVAC bookings, invoices, contacts, reminders, and quotes." noindex={true} />
      <header className="border-b border-blue-900 bg-blue-900 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-base font-bold">
              BM
            </div>
            <div>
              <h1 className="text-2xl font-bold">Admin Panel</h1>
              <p className="text-sm font-medium text-blue-100 hidden sm:block">
                BERNARDINO MARTIN - Heating - Air Conditioning - Solar
              </p>
            </div>
          </div>

          <Button
            data-testid="button-admin-logout"
            variant="outline"
            className="border-white/25 bg-white/10 text-white hover:bg-white/15 hover:text-white"
            onClick={logout}
          >
            Sign Out
          </Button>
        </div>
      </header>

      <nav className="border-b border-blue-800 bg-blue-800 text-white">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 sm:px-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              data-testid={`tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`border-b-2 px-4 py-4 text-sm font-semibold whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "border-white text-white"
                  : "border-transparent text-blue-100 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {activeTab === "overview" ? <OverviewTab /> : null}
        {activeTab === "appointments" ? <AppointmentsTab /> : null}
        {activeTab === "invoices" ? <InvoicesTab /> : null}
        {activeTab === "contacts" ? <ContactsTab /> : null}
        {activeTab === "quotes" ? <QuotesTab /> : null}
        {activeTab === "reminders" ? <RemindersTab /> : null}
      </main>
    </div>
  );
}
