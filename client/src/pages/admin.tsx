import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { Booking, Invoice, ContactMessage, Reminder, Quote } from "@shared/schema";
import type { DashboardStats } from "../../server-types";

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
  return new Date(d).toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" });
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/20 text-yellow-300",
  confirmed: "bg-blue-500/20 text-blue-300",
  completed: "bg-green-500/20 text-green-300",
  cancelled: "bg-red-500/20 text-red-300",
  paid: "bg-green-500/20 text-green-300",
  unpaid: "bg-orange-500/20 text-orange-300",
  sent: "bg-green-500/20 text-green-300",
};

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${statusColors[status] || "bg-gray-500/20 text-gray-300"}`}>
      {status}
    </span>
  );
}

function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="bg-[#1a1f4e] rounded-xl p-5 border border-white/5">
      <p className="text-gray-400 text-sm mb-1">{label}</p>
      <p className="text-2xl font-bold text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>{value}</p>
      {sub && <p className="text-xs text-gray-500 mt-1">{sub}</p>}
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
      <h2 className="text-xl font-bold text-white mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>Dashboard Overview</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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

  if (isLoading) return <LoadingSpinner />;

  return (
    <div data-testid="admin-appointments">
      <h2 className="text-xl font-bold text-white mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>Appointments</h2>
      {!bookings?.length ? (
        <EmptyState text="No appointments yet" />
      ) : (
        <div className="space-y-3">
          {bookings.map((b) => (
            <div key={b.id} className="bg-[#1a1f4e] rounded-xl p-5 border border-white/5" data-testid={`card-booking-${b.id}`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-white font-semibold truncate">{b.fullName}</h3>
                    <StatusBadge status={b.status} />
                  </div>
                  <p className="text-sm text-gray-400">{b.serviceTitle}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-gray-500">
                    <span>{b.email}</span>
                    <span>{b.phone}</span>
                    <span>Preferred: {b.preferredDate}</span>
                    <span>Created: {formatDateTime(b.createdAt)}</span>
                  </div>
                  {b.notes && <p className="text-xs text-gray-500 mt-1 italic">"{b.notes}"</p>}
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <select
                    data-testid={`select-booking-status-${b.id}`}
                    value={b.status}
                    onChange={(e) => updateStatus.mutate({ id: b.id, status: e.target.value })}
                    className="px-3 py-1.5 rounded-lg bg-[#0f1235] border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#3DB54A]"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>
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

  if (isLoading) return <LoadingSpinner />;

  return (
    <div data-testid="admin-invoices">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>Invoices</h2>
        <button
          data-testid="button-create-invoice"
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 rounded-lg bg-[#3DB54A] hover:bg-[#35a241] text-white text-sm font-medium transition-colors"
        >
          {showForm ? "Cancel" : "+ New Invoice"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={(e) => { e.preventDefault(); createInvoice.mutate(form); }}
          className="bg-[#1a1f4e] rounded-xl p-5 border border-white/5 mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
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
              <label className="block text-xs font-medium text-gray-400 mb-1">{label}</label>
              <input
                data-testid={`input-invoice-${key}`}
                type={type}
                value={form[key as keyof typeof form]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                placeholder={placeholder}
                required
                className="w-full px-3 py-2 rounded-lg bg-[#0f1235] border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3DB54A]"
              />
            </div>
          ))}
          <div className="sm:col-span-2">
            <button
              data-testid="button-submit-invoice"
              type="submit"
              disabled={createInvoice.isPending}
              className="px-6 py-2 rounded-lg bg-[#3DB54A] hover:bg-[#35a241] text-white text-sm font-medium transition-colors disabled:opacity-50"
            >
              {createInvoice.isPending ? "Creating..." : "Create Invoice"}
            </button>
          </div>
        </form>
      )}

      {!invoiceList?.length ? (
        <EmptyState text="No invoices yet" />
      ) : (
        <div className="space-y-3">
          {invoiceList.map((inv) => (
            <div key={inv.id} className="bg-[#1a1f4e] rounded-xl p-5 border border-white/5" data-testid={`card-invoice-${inv.id}`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-white font-semibold">{inv.invoiceNumber}</h3>
                    <StatusBadge status={inv.status} />
                  </div>
                  <p className="text-sm text-gray-400">{inv.customerName} — {inv.serviceTitle}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-gray-500">
                    <span>{inv.customerEmail}</span>
                    <span>Amount: {formatCurrency(inv.amount)}</span>
                    {inv.dueDate && <span>Due: {inv.dueDate}</span>}
                    {inv.paidAt && <span>Paid: {formatDate(inv.paidAt)}</span>}
                  </div>
                </div>
                {inv.status !== "paid" && (
                  <button
                    data-testid={`button-mark-paid-${inv.id}`}
                    onClick={() => markPaid.mutate(inv.invoiceNumber)}
                    className="px-4 py-1.5 rounded-lg bg-green-600/20 text-green-300 hover:bg-green-600/30 text-sm font-medium transition-colors flex-shrink-0"
                  >
                    Mark Paid
                  </button>
                )}
              </div>
            </div>
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
      <h2 className="text-xl font-bold text-white mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>Contact Messages</h2>
      {!messages?.length ? (
        <EmptyState text="No contact messages yet" />
      ) : (
        <div className="space-y-3">
          {messages.map((m) => (
            <div key={m.id} className="bg-[#1a1f4e] rounded-xl p-5 border border-white/5" data-testid={`card-contact-${m.id}`}>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-white font-semibold">{m.name}</h3>
                <span className="text-xs text-gray-500">{formatDateTime(m.createdAt)}</span>
              </div>
              <p className="text-sm text-gray-300 mb-2">{m.message}</p>
              <div className="flex gap-4 text-xs text-gray-500">
                <span>{m.email}</span>
                {m.phone && <span>{m.phone}</span>}
              </div>
            </div>
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
      <h2 className="text-xl font-bold text-white mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>Reminders</h2>
      {!reminderList?.length ? (
        <EmptyState text="No reminders yet" />
      ) : (
        <div className="space-y-3">
          {reminderList.map((r) => (
            <div key={r.id} className="bg-[#1a1f4e] rounded-xl p-5 border border-white/5" data-testid={`card-reminder-${r.id}`}>
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-white font-semibold">{r.customerName}</h3>
                <StatusBadge status={r.status} />
                <span className="px-2 py-0.5 rounded-full text-xs bg-[#0f1235] text-gray-400 capitalize">{r.channel}</span>
              </div>
              <p className="text-sm text-gray-400">{r.serviceTitle} — {r.reminderType}</p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-gray-500">
                <span>Scheduled: {formatDateTime(r.scheduledFor)}</span>
                <span>Appointment: {r.appointmentDate}</span>
                {r.sentAt && <span>Sent: {formatDateTime(r.sentAt)}</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
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
    <div className="text-center py-12 text-gray-500">
      <p>{text}</p>
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
      <h2 className="text-xl font-bold text-white mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>Quote Requests</h2>
      {!quoteList?.length ? (
        <EmptyState text="No quote requests yet" />
      ) : (
        <div className="space-y-3">
          {quoteList.map((q) => (
            <div key={q.id} className="bg-[#1a1f4e] rounded-xl p-5 border border-white/5" data-testid={`card-quote-${q.id}`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-white font-semibold">{q.fullName}</h3>
                    <StatusBadge status={q.status} />
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${q.urgency === "priority" ? "bg-red-500/20 text-red-300" : "bg-blue-500/20 text-blue-300"}`}>
                      {q.urgency}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">{q.serviceType} &bull; {q.propertyType}</p>
                  <p className="text-sm text-gray-300 mt-2">{q.description}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-gray-500">
                    <span>{q.email}</span>
                    <span>{q.phone}</span>
                    {q.address && <span>{q.address}</span>}
                    <span>{formatDateTime(q.createdAt)}</span>
                  </div>
                </div>
              </div>
            </div>
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
    <div className="min-h-screen bg-[#0f1235]" data-testid="admin-dashboard">
      <header className="bg-[#1a1f4e] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3DB54A] to-[#2d8a38] flex items-center justify-center">
              <span className="text-white font-bold text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>BM</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>Admin Panel</h1>
              <p className="text-xs text-gray-500 hidden sm:block">Bernardino Martin's HVAC</p>
            </div>
          </div>
          <button
            data-testid="button-admin-logout"
            onClick={logout}
            className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 text-sm transition-colors"
          >
            Sign Out
          </button>
        </div>
      </header>

      <nav className="bg-[#1a1f4e]/50 border-b border-white/5 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              data-testid={`tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                activeTab === tab.id
                  ? "text-[#3DB54A] border-[#3DB54A]"
                  : "text-gray-400 border-transparent hover:text-gray-200"
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
