import { useState, useEffect, type ReactNode } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { Booking, Invoice, ContactMessage, Reminder, Quote } from "@shared/schema";
import type { DashboardStats } from "../../server-types";
import { Trash2 } from "lucide-react";

type AdminTab = "overview" | "appointments" | "invoices" | "contacts" | "reminders" | "quotes";

function formatCurrency(cents: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);
}

function formatDate(d: string | Date | null) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function formatDateTime(d: string | Date | null) {
  if (!d) return "—";
  return new Date(d).toLocaleString("en-US", {
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
};

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${statusColors[status] || "bg-slate-100 text-slate-700"}`}>
      {status}
    </span>
  );
}

function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-slate-600 text-base mb-2">{label}</p>
      <p className="text-3xl font-bold text-slate-900" style={{ fontFamily: "'Outfit', sans-serif" }}>{value}</p>
      {sub && <p className="text-base text-slate-500 mt-2">{sub}</p>}
    </div>
  );
}

function SectionCard({ children, testId }: { children: ReactNode; testId?: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" data-testid={testId}>
      {children}
    </div>
  );
}

function DangerButton({
  onClick,
  disabled,
  label,
  testId,
}: {
  onClick: () => void;
  disabled?: boolean;
  label: string;
  testId?: string;
}) {
  return (
    <button
      type="button"
      data-testid={testId}
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center gap-2 rounded-lg border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm font-semibold text-rose-700 transition-colors hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <Trash2 className="h-4 w-4" aria-hidden="true" />
      {label}
    </button>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex justify-center py-12">
      <div className="w-8 h-8 border-4 border-[#3DB54A] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="text-center py-12 text-slate-500">
      <p className="text-lg">{text}</p>
    </div>
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
      <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Total Bookings" value={stats.totalBookings} sub={`${stats.pendingBookings} pending`} />
        <StatCard label="Total Invoices" value={stats.totalInvoices} sub={`${stats.paidInvoices} paid / ${stats.unpaidInvoices} unpaid`} />
        <StatCard label="Revenue Collected" value={formatCurrency(stats.totalRevenue)} />
        <StatCard label="Contact Messages" value={stats.totalContacts} sub={`${stats.pendingReminders} pending reminders`} />
      </div>
    </div>
  );
}

function AppointmentsTab() {
  const queryClient = useQueryClient();
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
      queryClient.invalidateQueries({ queryKey: ["/api/admin/bookings"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/reminders"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div data-testid="admin-appointments">
      <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>Appointments</h2>
      {!bookings?.length ? (
        <EmptyState text="No appointments yet" />
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <SectionCard key={b.id} testId={`card-booking-${b.id}`}>
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-slate-900 truncate">{b.fullName}</h3>
                    <StatusBadge status={b.status} />
                  </div>
                  <p className="text-lg text-slate-700">{b.serviceTitle}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3 text-base text-slate-500">
                    <span>{b.email}</span>
                    <span>{b.phone}</span>
                    <span>Preferred: {b.preferredDate}</span>
                    <span>Created: {formatDateTime(b.createdAt)}</span>
                  </div>
                  {b.notes && <p className="text-base text-slate-500 mt-3 italic">"{b.notes}"</p>}
                </div>
                <div className="flex flex-col sm:flex-row gap-3 lg:items-center">
                  <select
                    data-testid={`select-booking-status-${b.id}`}
                    value={b.status}
                    onChange={(e) => updateStatus.mutate({ id: b.id, status: e.target.value })}
                    className="px-4 py-3 rounded-lg bg-white border border-slate-300 text-slate-800 text-base focus:outline-none focus:ring-2 focus:ring-[#3DB54A]"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <DangerButton
                    testId={`button-delete-booking-${b.id}`}
                    disabled={deleteBooking.isPending}
                    onClick={() => {
                      if (window.confirm(`Delete the booking for ${b.fullName}? This will also remove its reminders.`)) {
                        deleteBooking.mutate(b.id);
                      }
                    }}
                    label={deleteBooking.isPending ? "Deleting..." : "Delete"}
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
      setForm({ invoiceNumber: "", customerEmail: "", customerName: "", serviceTitle: "", amount: "", status: "unpaid", dueDate: "" });
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
      queryClient.invalidateQueries({ queryKey: ["/api/admin/invoices"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div data-testid="admin-invoices">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-slate-900" style={{ fontFamily: "'Outfit', sans-serif" }}>Invoices</h2>
        <button
          data-testid="button-create-invoice"
          onClick={() => setShowForm(!showForm)}
          className="px-5 py-3 rounded-lg bg-[#3DB54A] hover:bg-[#35a241] text-white text-base font-semibold transition-colors"
        >
          {showForm ? "Cancel" : "+ New Invoice"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={(e) => { e.preventDefault(); createInvoice.mutate(form); }}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {[
            { label: "Invoice #", key: "invoiceNumber", placeholder: "INV-001", type: "text" },
            { label: "Customer Name", key: "customerName", placeholder: "John Doe", type: "text" },
            { label: "Customer Email", key: "customerEmail", placeholder: "john@example.com", type: "email" },
            { label: "Service", key: "serviceTitle", placeholder: "AC Repair", type: "text" },
            { label: "Amount ($)", key: "amount", placeholder: "150.00", type: "number" },
            { label: "Due Date", key: "dueDate", placeholder: "2025-03-01", type: "date" },
          ].map(({ label, key, placeholder, type }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-slate-600 mb-2">{label}</label>
              <input
                data-testid={`input-invoice-${key}`}
                type={type}
                value={form[key as keyof typeof form]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                placeholder={placeholder}
                required
                className="w-full px-4 py-3 rounded-lg bg-white border border-slate-300 text-slate-900 text-base placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3DB54A]"
              />
            </div>
          ))}
          <div className="sm:col-span-2">
            <button
              data-testid="button-submit-invoice"
              type="submit"
              disabled={createInvoice.isPending}
              className="px-6 py-3 rounded-lg bg-[#3DB54A] hover:bg-[#35a241] text-white text-base font-semibold transition-colors disabled:opacity-50"
            >
              {createInvoice.isPending ? "Creating..." : "Create Invoice"}
            </button>
          </div>
        </form>
      )}

      {!invoiceList?.length ? (
        <EmptyState text="No invoices yet" />
      ) : (
        <div className="space-y-4">
          {invoiceList.map((inv) => (
            <SectionCard key={inv.id} testId={`card-invoice-${inv.id}`}>
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-slate-900">{inv.invoiceNumber}</h3>
                    <StatusBadge status={inv.status} />
                  </div>
                  <p className="text-lg text-slate-700">{inv.customerName} — {inv.serviceTitle}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3 text-base text-slate-500">
                    <span>{inv.customerEmail}</span>
                    <span>Amount: {formatCurrency(inv.amount)}</span>
                    {inv.dueDate && <span>Due: {inv.dueDate}</span>}
                    {inv.paidAt && <span>Paid: {formatDate(inv.paidAt)}</span>}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  {inv.status !== "paid" && (
                    <button
                      data-testid={`button-mark-paid-${inv.id}`}
                      onClick={() => markPaid.mutate(inv.invoiceNumber)}
                      className="px-4 py-2.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-sm font-semibold transition-colors"
                    >
                      Mark Paid
                    </button>
                  )}
                  <DangerButton
                    testId={`button-delete-invoice-${inv.id}`}
                    disabled={deleteInvoice.isPending}
                    onClick={() => {
                      if (window.confirm(`Delete invoice ${inv.invoiceNumber}?`)) {
                        deleteInvoice.mutate(inv.id);
                      }
                    }}
                    label={deleteInvoice.isPending ? "Deleting..." : "Delete"}
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
      <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>Contact Messages</h2>
      {!messages?.length ? (
        <EmptyState text="No contact messages yet" />
      ) : (
        <div className="space-y-4">
          {messages.map((m) => (
            <SectionCard key={m.id} testId={`card-contact-${m.id}`}>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-semibold text-slate-900">{m.name}</h3>
                <span className="text-base text-slate-500">{formatDateTime(m.createdAt)}</span>
              </div>
              <p className="text-lg text-slate-700 mb-3">{m.message}</p>
              <div className="flex flex-wrap gap-4 text-base text-slate-500">
                <span>{m.email}</span>
                {m.phone && <span>{m.phone}</span>}
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
      <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>Reminders</h2>
      {!reminderList?.length ? (
        <EmptyState text="No reminders yet" />
      ) : (
        <div className="space-y-4">
          {reminderList.map((r) => (
            <SectionCard key={r.id} testId={`card-reminder-${r.id}`}>
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h3 className="text-xl font-semibold text-slate-900">{r.customerName}</h3>
                <StatusBadge status={r.status} />
                <span className="px-2.5 py-0.5 rounded-full text-sm bg-slate-100 text-slate-600 capitalize">{r.channel}</span>
              </div>
              <p className="text-lg text-slate-700">{r.serviceTitle} — {r.reminderType}</p>
              <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3 text-base text-slate-500">
                <span>Scheduled: {formatDateTime(r.scheduledFor)}</span>
                <span>Appointment: {r.appointmentDate}</span>
                {r.sentAt && <span>Sent: {formatDateTime(r.sentAt)}</span>}
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
      <h2 className="text-3xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>Quote Requests</h2>
      {!quoteList?.length ? (
        <EmptyState text="No quote requests yet" />
      ) : (
        <div className="space-y-4">
          {quoteList.map((q) => (
            <SectionCard key={q.id} testId={`card-quote-${q.id}`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-slate-900">{q.fullName}</h3>
                    <StatusBadge status={q.status} />
                    <span className={`px-2.5 py-0.5 rounded-full text-sm font-medium ${q.urgency === "priority" ? "bg-rose-100 text-rose-700" : "bg-sky-100 text-sky-700"}`}>
                      {q.urgency}
                    </span>
                  </div>
                  <p className="text-lg text-slate-700">{q.serviceType} • {q.propertyType}</p>
                  <p className="text-lg text-slate-700 mt-3">{q.description}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3 text-base text-slate-500">
                    <span>{q.email}</span>
                    <span>{q.phone}</span>
                    {q.address && <span>{q.address}</span>}
                    <span>{formatDateTime(q.createdAt)}</span>
                  </div>
                </div>
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
    <div className="min-h-screen bg-slate-100" data-testid="admin-dashboard">
      <header className="border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3DB54A] to-[#2d8a38] flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-base" style={{ fontFamily: "'Outfit', sans-serif" }}>BM</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "'Outfit', sans-serif" }}>Admin Panel</h1>
              <p className="text-base text-slate-500 hidden sm:block">BERNARDINO MARTIN — Heating • Air Conditioning • Solar</p>
            </div>
          </div>
          <button
            data-testid="button-admin-logout"
            onClick={logout}
            className="px-4 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-base font-medium transition-colors"
          >
            Sign Out
          </button>
        </div>
      </header>

      <nav className="border-b border-slate-200 bg-slate-50 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              data-testid={`tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-4 text-base font-semibold whitespace-nowrap transition-colors border-b-2 ${
                activeTab === tab.id
                  ? "text-[#2d8a38] border-[#3DB54A]"
                  : "text-slate-500 border-transparent hover:text-slate-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {activeTab === "overview" && <OverviewTab />}
        {activeTab === "appointments" && <AppointmentsTab />}
        {activeTab === "invoices" && <InvoicesTab />}
        {activeTab === "contacts" && <ContactsTab />}
        {activeTab === "quotes" && <QuotesTab />}
        {activeTab === "reminders" && <RemindersTab />}
      </main>
    </div>
  );
}
