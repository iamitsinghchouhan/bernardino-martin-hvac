import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  AlertTriangle,
  BarChart2,
  CalendarCheck,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  DollarSign,
  Eye,
  FileText,
  Mail,
  MessageCircle,
  Monitor,
  Phone,
  Smartphone,
  Tablet,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { SEO } from "@/components/seo";
import { Skeleton } from "@/components/ui/skeleton";
import { AdminCMSLayout } from "@/pages/admin-cms/layout";

type PeriodStats = {
  visitors: number;
  pageViews: number;
  bookings: number;
  contacts: number;
  quotes: number;
  phoneCalls: number;
  whatsappClicks: number;
  revenue: number;
};

type AnalyticsOverview = {
  today: PeriodStats;
  yesterday: PeriodStats;
  thisWeek: PeriodStats;
  lastWeek: PeriodStats;
  thisMonth: PeriodStats;
  lastMonth: PeriodStats;
  allTime: {
    totalVisitors: number;
    totalPageViews: number;
    totalBookings: number;
    totalRevenue: number;
    totalContacts: number;
    totalQuotes: number;
  };
  comparisons: {
    todayVsYesterday: Record<string, number>;
    thisWeekVsLastWeek: Record<string, number>;
    thisMonthVsLastMonth: Record<string, number>;
  };
};

type ChartPoint = {
  date: string;
  visitors: number;
  pageViews: number;
  bookings: number;
  contacts: number;
  quotes: number;
};

type ReferrerRow = { source: string; visitors: number; percentage: number };
type PageRow = { page: string; views: number; percentage: number };
type EventRow = { eventType: string; count: number; label: string };
type BookingServiceRow = { serviceTitle: string; count: number; percentage: number };
type RealtimeData = { activeVisitors: number; pagesBeingViewed: { page: string; count: number }[] };
type RevenueData = {
  totalRevenue: number;
  paidInvoices: number;
  unpaidInvoices: number;
  unpaidAmount: number;
  averageInvoiceValue: number;
  revenueThisMonth: number;
  revenueLastMonth: number;
};
type DeviceData = { mobile: number; tablet: number; desktop: number };

const sourceColors: Record<string, string> = {
  Google: "#4285f4",
  Facebook: "#1877f2",
  Instagram: "#e1306c",
  Direct: "#16a34a",
  Other: "#94a3b8",
};

function formatMoney(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

function pageLabel(page: string) {
  const map: Record<string, string> = {
    "/": "Homepage",
    "/about": "About Us Page",
    "/service-areas": "Service Areas Page",
    "/services": "Services Page",
    "/booking": "Booking Page",
    "/contact": "Contact Page",
    "/quote": "Quote Page",
    "/payment": "Payment Page",
    "/hvac-los-angeles": "HVAC Los Angeles Page",
    "/air-conditioning-service-los-angeles": "Air Conditioning Los Angeles Page",
    "/ac-repair-los-angeles": "AC Repair Los Angeles Page",
    "/mini-split-service-los-angeles": "Mini Split Los Angeles Page",
    "/furnace-service-los-angeles": "Furnace Service Los Angeles Page",
    "/heat-pump-los-angeles": "Heat Pump Los Angeles Page",
    "/solar-installation-los-angeles": "Solar Los Angeles Page",
    "/solar-optimization-los-angeles": "Solar Optimization Los Angeles Page",
    "/plumbing-los-angeles": "Plumbing Los Angeles Page",
    "/plumbing-service-los-angeles": "Plumbing Service Los Angeles Page",
    "/electrical-services-los-angeles": "Electrical Los Angeles Page",
    "/landscaping-los-angeles": "Landscaping Los Angeles Page",
    "/landscaping-services-los-angeles": "Landscaping Services Los Angeles Page",
    "/sod-installation-los-angeles": "Sod Installation Los Angeles Page",
    "/planters-landscaping-los-angeles": "Planters and Landscaping Los Angeles Page",
    "/irrigation-los-angeles": "Irrigation Los Angeles Page",
    "/network-installation-los-angeles": "Network Los Angeles Page",
    "/network-repair-los-angeles": "Network Repair Los Angeles Page",
    "/new-installation-los-angeles": "New Installation Los Angeles Page",
    "/hvac-burbank": "HVAC Burbank Page",
    "/hvac-glendale": "HVAC Glendale Page",
    "/hvac-pasadena": "HVAC Pasadena Page",
  };
  return map[page] ?? page.replace(/^\//, "").split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}

function SectionSkeleton({
  title = true,
  subtitle = true,
  rows = 1,
  className = "",
}: {
  title?: boolean;
  subtitle?: boolean;
  rows?: number;
  className?: string;
}) {
  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-200 p-8 ${className}`}>
      {title ? <Skeleton className="h-8 w-72" /> : null}
      {subtitle ? <Skeleton className="mt-3 h-5 w-full max-w-xl" /> : null}
      <div className="mt-6 space-y-4">
        {Array.from({ length: rows }).map((_, index) => (
          <Skeleton key={index} className="h-24 w-full rounded-2xl" />
        ))}
      </div>
    </div>
  );
}

function StatCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
      <div className="flex items-start justify-between gap-4">
        <Skeleton className="h-14 w-36" />
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>
      <Skeleton className="mt-4 h-7 w-40" />
      <Skeleton className="mt-3 h-5 w-56" />
      <Skeleton className="mt-4 h-5 w-44" />
    </div>
  );
}

function TrendText({ value }: { value: number }) {
  if (value > 0) {
    return (
      <div className="mt-3 flex items-center gap-2 text-base font-semibold text-green-600">
        <TrendingUp className="h-5 w-5" />
        {value}% more than last period
      </div>
    );
  }
  if (value < 0) {
    return (
      <div className="mt-3 flex items-center gap-2 text-base font-semibold text-red-600">
        <TrendingDown className="h-5 w-5" />
        {Math.abs(value)}% less than last period
      </div>
    );
  }
  return <div className="mt-3 text-base font-semibold text-gray-500">Same as last period</div>;
}

export default function AdminCMSAnalytics() {
  const [period, setPeriod] = useState<"today" | "week" | "month" | "all">("week");
  const [chartPeriod, setChartPeriod] = useState<"7d" | "30d" | "90d">("7d");
  const [gscSteps, setGscSteps] = useState([false, false, false, false, false]);

  useEffect(() => {
    setGscSteps([1, 2, 3, 4, 5].map((step) => localStorage.getItem(`gsc_step_${step}_done`) === "true"));
  }, []);

  const overviewQuery = useQuery<AnalyticsOverview>({
    queryKey: ["/api/admin/analytics/overview"],
  });
  const realtimeQuery = useQuery<RealtimeData>({
    queryKey: ["/api/admin/analytics/realtime"],
    refetchInterval: 30_000,
  });
  const chartQuery = useQuery<ChartPoint[]>({
    queryKey: [`/api/admin/analytics/chart?period=${chartPeriod}`],
    staleTime: 5 * 60 * 1000,
  });
  const pagesQuery = useQuery<PageRow[]>({
    queryKey: ["/api/admin/analytics/pages"],
    staleTime: 5 * 60 * 1000,
  });
  const referrersQuery = useQuery<ReferrerRow[]>({
    queryKey: ["/api/admin/analytics/referrers"],
    staleTime: 5 * 60 * 1000,
  });
  const devicesQuery = useQuery<DeviceData>({
    queryKey: ["/api/admin/analytics/devices"],
    staleTime: 5 * 60 * 1000,
  });
  const eventsQuery = useQuery<EventRow[]>({
    queryKey: ["/api/admin/analytics/events"],
    staleTime: 5 * 60 * 1000,
  });
  const servicesQuery = useQuery<BookingServiceRow[]>({
    queryKey: ["/api/admin/analytics/bookings-by-service"],
    staleTime: 5 * 60 * 1000,
  });
  const revenueQuery = useQuery<RevenueData>({
    queryKey: ["/api/admin/analytics/revenue"],
    staleTime: 5 * 60 * 1000,
  });

  const selected = useMemo(() => {
    const data = overviewQuery.data;
    if (!data) return null;
    if (period === "today") return { stats: data.today, compare: data.comparisons.todayVsYesterday };
    if (period === "month") return { stats: data.thisMonth, compare: data.comparisons.thisMonthVsLastMonth };
    if (period === "all") {
      return {
        stats: {
          visitors: data.allTime.totalVisitors,
          pageViews: data.allTime.totalPageViews,
          bookings: data.allTime.totalBookings,
          contacts: data.allTime.totalContacts,
          quotes: data.allTime.totalQuotes,
          phoneCalls: eventsQuery.data?.find((item) => item.eventType === "phone_click")?.count ?? 0,
          whatsappClicks: eventsQuery.data?.find((item) => item.eventType === "whatsapp_click")?.count ?? 0,
          revenue: data.allTime.totalRevenue,
        },
        compare: {
          visitors: data.comparisons.thisMonthVsLastMonth.visitors,
          pageViews: data.comparisons.thisMonthVsLastMonth.pageViews,
          bookings: data.comparisons.thisMonthVsLastMonth.bookings,
          quotes: data.comparisons.thisMonthVsLastMonth.quotes,
          contacts: data.comparisons.thisMonthVsLastMonth.contacts,
          phoneCalls: data.comparisons.thisMonthVsLastMonth.phoneCalls,
          revenue: data.comparisons.thisMonthVsLastMonth.revenue,
        },
      };
    }
    return { stats: data.thisWeek, compare: data.comparisons.thisWeekVsLastWeek };
  }, [overviewQuery.data, period, eventsQuery.data]);

  const eventMap = useMemo(() => {
    const base: Record<string, number> = {
      phone_click: 0,
      whatsapp_click: 0,
      booking_completed: 0,
      quote_requested: 0,
      contact_submitted: 0,
    };
    for (const item of eventsQuery.data ?? []) {
      base[item.eventType] = item.count;
    }
    return base;
  }, [eventsQuery.data]);

  const totalActions = eventMap.phone_click + eventMap.whatsapp_click + eventMap.booking_completed + eventMap.quote_requested + eventMap.contact_submitted;
  const totalVisitors = selected?.stats.visitors ?? 0;
  const conversionRate = totalVisitors ? Number(((totalActions / totalVisitors) * 100).toFixed(1)) : 0;
  const conversionMessage = conversionRate > 5 ? "Great job!" : conversionRate >= 2 ? "Room for improvement" : "Let's work on getting more leads";

  const busiestDay = useMemo(() => {
    const points = chartQuery.data ?? [];
    return points.reduce((best, item) => (item.visitors > (best?.visitors ?? -1) ? item : best), points[0]);
  }, [chartQuery.data]);

  const topReferrer = referrersQuery.data?.[0];
  const topPage = pagesQuery.data?.[0];
  const topDevice = useMemo(() => {
    const devices = devicesQuery.data;
    if (!devices) return "mobile phone";
    const pairs = [
      ["mobile phone", devices.mobile],
      ["tablet", devices.tablet],
      ["computer", devices.desktop],
    ] as const;
    return pairs.sort((a, b) => b[1] - a[1])[0][0];
  }, [devicesQuery.data]);

  function setStep(index: number, checked: boolean) {
    const next = [...gscSteps];
    next[index] = checked;
    setGscSteps(next);
    localStorage.setItem(`gsc_step_${index + 1}_done`, String(checked));
  }

  return (
    <AdminCMSLayout title="Your Website Analytics" subtitle="See how many people visit your website and what they do">
      <SEO title="Admin Panel" description="Admin panel" noindex={true} />

      <style>{`
        @media print {
          body * { visibility: hidden; }
          .print-report, .print-report * { visibility: visible; }
          .print-report { position: absolute; left: 0; top: 0; width: 100%; }
        }
      `}</style>

      <div className="print-report space-y-8">
        <div className="rounded-3xl bg-gradient-to-r from-green-600 to-emerald-500 p-6 text-white shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="h-5 w-5 rounded-full bg-white animate-pulse" />
              <div>
                <div className="text-3xl font-bold">{realtimeQuery.data?.activeVisitors ?? 0} people are on your website right now</div>
                <div className="mt-2 text-lg text-green-50">Live activity updates every 30 seconds</div>
              </div>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {(realtimeQuery.data?.pagesBeingViewed ?? []).map((item) => (
              <span key={item.page} className="rounded-full bg-white/20 px-4 py-2 text-base font-semibold">
                {item.count} people on: {item.page}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="flex flex-wrap gap-3">
            {[
              ["today", "Today"],
              ["week", "This Week"],
              ["month", "This Month"],
              ["all", "All Time"],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setPeriod(value as typeof period)}
                className={`min-h-[52px] rounded-xl px-6 py-3 text-lg font-bold transition-colors ${
                  period === value ? "bg-blue-600 text-white" : "bg-white text-gray-700 border-2 border-gray-300"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {selected ? [
            { label: "Total Visitors", sub: "People visited your website", value: selected.stats.visitors, compare: selected.compare.visitors, icon: Users, color: "text-blue-600" },
            { label: "Page Views", sub: "Total pages viewed", value: selected.stats.pageViews, compare: selected.compare.pageViews, icon: Eye, color: "text-sky-600" },
            { label: "Phone Calls", sub: "People clicked to call you", value: selected.stats.phoneCalls, compare: selected.compare.phoneCalls, icon: Phone, color: "text-green-600" },
            { label: "Bookings Made", sub: "Appointments booked online", value: selected.stats.bookings, compare: selected.compare.bookings, icon: CalendarDays, color: "text-violet-600" },
            { label: "Quote Requests", sub: "Free quotes requested", value: selected.stats.quotes, compare: selected.compare.quotes, icon: FileText, color: "text-orange-500" },
            { label: "Revenue Collected", sub: "Money collected from invoices", value: formatMoney(selected.stats.revenue), compare: selected.compare.revenue, icon: DollarSign, color: "text-green-600" },
          ].map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.label} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                <div className="flex items-start justify-between gap-4">
                  <div className={`text-5xl font-bold text-gray-900 ${card.label === "Revenue Collected" ? "text-4xl" : ""}`}>{card.value}</div>
                  <Icon className={`h-10 w-10 ${card.color}`} />
                </div>
                <div className="mt-3 text-2xl font-semibold text-gray-800">{card.label}</div>
                <div className="mt-2 text-base text-gray-600">{card.sub}</div>
                <TrendText value={card.compare} />
              </div>
            );
          }) : null}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">Visitors &amp; Bookings Over Time</h2>
              <p className="mt-2 text-base text-gray-600">See when people visit your website most</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {(["7d", "30d", "90d"] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setChartPeriod(item)}
                  className={`min-h-[52px] rounded-xl px-5 py-3 text-lg font-bold transition-colors ${
                    chartPeriod === item ? "bg-blue-600 text-white" : "bg-white text-gray-700 border-2 border-gray-300"
                  }`}
                >
                  {item === "7d" ? "Last 7 Days" : item === "30d" ? "Last 30 Days" : "Last 90 Days"}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartQuery.data ?? []}>
                <defs>
                  <linearGradient id="visitorsFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0.05} />
                  </linearGradient>
                  <linearGradient id="bookingsFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16a34a" stopOpacity={0.28} />
                    <stop offset="95%" stopColor="#16a34a" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" tick={{ fontSize: 14 }} />
                <YAxis tick={{ fontSize: 14 }} />
                <Tooltip />
                <Area type="monotone" dataKey="visitors" stroke="#2563eb" fill="url(#visitorsFill)" strokeWidth={3} />
                <Area type="monotone" dataKey="bookings" stroke="#16a34a" fill="url(#bookingsFill)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 space-y-2 text-lg text-gray-700">
            <p>Your busiest day this period was {busiestDay?.date ?? "not available yet"} with {busiestDay?.visitors ?? 0} visitors.</p>
            <p>You got {(chartQuery.data ?? []).reduce((sum, item) => sum + item.bookings, 0)} bookings in this period — great job!</p>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold text-gray-800">Which pages people visit most</h2>
            <div className="mt-6 space-y-4">
              {(pagesQuery.data ?? []).map((item, index) => (
                <div key={item.page} className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">{index + 1}</div>
                    <div className="flex-1">
                      <div className="text-lg font-semibold text-gray-800">{item.page}</div>
                      <div className="text-base text-gray-600">{pageLabel(item.page)}</div>
                      <div className="mt-2 flex items-center justify-between text-base">
                        <span className="font-bold text-gray-900">{item.views} views</span>
                        <span className="text-gray-500">{item.percentage}%</span>
                      </div>
                      <div className="mt-2 h-3 rounded-full bg-gray-200">
                        <div className="h-3 rounded-full bg-blue-600" style={{ width: `${item.percentage}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-lg text-gray-700">Your most popular page is {topPage ? pageLabel(topPage.page) : "not available yet"} — consider keeping it updated.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold text-gray-800">Where your visitors come from</h2>
            <div className="mt-6 h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={referrersQuery.data ?? []} dataKey="visitors" nameKey="source" innerRadius={65} outerRadius={110} paddingAngle={3}>
                    {(referrersQuery.data ?? []).map((entry) => (
                      <Cell key={entry.source} fill={sourceColors[entry.source] || sourceColors.Other} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-3">
              {(referrersQuery.data ?? []).map((item) => (
                <div key={item.source} className="flex items-center justify-between text-base">
                  <div className="flex items-center gap-3">
                    <span className="h-4 w-4 rounded-full" style={{ backgroundColor: sourceColors[item.source] || sourceColors.Other }} />
                    <span className="font-semibold text-gray-800">{item.source}</span>
                  </div>
                  <span className="text-gray-600">{item.visitors} ({item.percentage}%)</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-lg text-gray-700">Most of your visitors come from {topReferrer?.source ?? "not available yet"}.</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-semibold text-gray-800">What devices people use to visit your website</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {[
              { label: "Mobile Phone", value: devicesQuery.data?.mobile ?? 0, icon: Smartphone },
              { label: "Tablet", value: devicesQuery.data?.tablet ?? 0, icon: Tablet },
              { label: "Computer", value: devicesQuery.data?.desktop ?? 0, icon: Monitor },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
                  <Icon className="h-12 w-12 text-blue-600" />
                  <div className="mt-4 text-4xl font-bold text-gray-900">{item.value}%</div>
                  <div className="mt-2 text-xl font-semibold text-gray-700">{item.label}</div>
                  <div className="mt-4 h-3 rounded-full bg-gray-200">
                    <div className="h-3 rounded-full bg-blue-600" style={{ width: `${item.value}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-6 text-lg text-gray-700">Most people visit on {topDevice} — make sure your website looks great on {topDevice}.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-semibold text-gray-800">What people do on your website</h2>
          <p className="mt-2 text-base text-gray-600">These are the actions visitors take when they visit</p>
          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[
              { key: "phone_click", label: "Called Your Phone", desc: "People clicked your phone number to call", icon: Phone, color: "text-green-600" },
              { key: "whatsapp_click", label: "WhatsApp Messages", desc: "People clicked to chat on WhatsApp", icon: MessageCircle, color: "text-green-600" },
              { key: "booking_completed", label: "Bookings Completed", desc: "People filled in the booking form", icon: CalendarCheck, color: "text-blue-600" },
              { key: "quote_requested", label: "Quotes Requested", desc: "People asked for a price estimate", icon: FileText, color: "text-orange-500" },
              { key: "contact_submitted", label: "Contact Messages", desc: "People sent you a contact message", icon: Mail, color: "text-violet-600" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.key} className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
                  <Icon className={`h-12 w-12 ${item.color}`} />
                  <div className="mt-4 text-4xl font-bold text-gray-900">{eventMap[item.key]}</div>
                  <div className="mt-2 text-xl font-semibold text-gray-800">{item.label}</div>
                  <div className="mt-2 text-sm text-gray-500">{item.desc}</div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-6">
            <p className="text-lg font-semibold text-blue-900">
              This week {totalActions} people contacted you in total. That means {conversionRate}% of your visitors took action — {conversionMessage}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-semibold text-gray-800">Which services people book most</h2>
          <p className="mt-2 text-base text-gray-600">See which of your services is most popular</p>
          <div className="mt-6 h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={servicesQuery.data ?? []} layout="vertical" margin={{ left: 50 }}>
                <XAxis type="number" tick={{ fontSize: 14 }} />
                <YAxis type="category" dataKey="serviceTitle" width={150} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#2563eb" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 space-y-2 text-lg text-gray-700">
            {(servicesQuery.data ?? []).map((item, index) => (
              <div key={item.serviceTitle}>#{index + 1} {item.serviceTitle} — {item.count} bookings ({item.percentage}%)</div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-semibold text-gray-800">Your Money Summary</h2>
          <p className="mt-2 text-base text-gray-600">Track what you have earned and what is still owed</p>
          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              { label: "Total Earned", value: formatMoney(revenueQuery.data?.totalRevenue ?? 0), sub: "collected from paid invoices", icon: DollarSign, color: "text-green-600" },
              { label: "Still Owed", value: formatMoney(revenueQuery.data?.unpaidAmount ?? 0), sub: "from unpaid invoices", icon: AlertTriangle, color: "text-orange-500" },
              { label: "Average Invoice", value: formatMoney(revenueQuery.data?.averageInvoiceValue ?? 0), sub: "average invoice value", icon: BarChart2, color: "text-blue-600" },
              { label: "This Month", value: formatMoney(revenueQuery.data?.revenueThisMonth ?? 0), sub: "earned this month", icon: CalendarDays, color: "text-violet-600" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
                  <Icon className={`h-12 w-12 ${item.color}`} />
                  <div className="mt-4 text-4xl font-bold text-gray-900">{item.value}</div>
                  <div className="mt-2 text-xl font-semibold text-gray-800">{item.label}</div>
                  <div className="mt-2 text-base text-gray-600">{item.sub}</div>
                </div>
              );
            })}
          </div>
          <div className="mt-6 text-lg text-gray-700">
            <div>This month: {formatMoney(revenueQuery.data?.revenueThisMonth ?? 0)}</div>
            <div>Last month: {formatMoney(revenueQuery.data?.revenueLastMonth ?? 0)}</div>
            <TrendText value={revenueQuery.data ? Number((((revenueQuery.data.revenueThisMonth - revenueQuery.data.revenueLastMonth) / (revenueQuery.data.revenueLastMonth || 1)) * 100).toFixed(1)) : 0} />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-semibold text-gray-800">How to Get More Visitors from Google</h2>
          <p className="mt-2 text-base text-gray-600">Simple tips to help more people find your website</p>
          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[
              ["Your website is set up for Google", "Your pages have titles and descriptions that Google can read. Keep updating your content regularly to rank higher.", "Edit SEO Settings", "/admin/cms/seo"],
              ["Add new pages for more keywords", "Every new page you create is a chance to appear in Google. Create pages for specific services and cities.", "Create New Page", "/admin/cms/pages"],
              ["Ask customers for Google Reviews", "Google reviews help you appear higher in local search results. Ask every happy customer to leave a review.", "Share Google Review Link", "https://search.google.com/local/writereview?placeid="],
              ["Keep your business info up to date", "Make sure your phone number, address, and hours are correct on your website and Google Business Profile.", "Update Business Info", "/admin/cms/settings"],
              ["Post regularly on social media", "Sharing your work on Facebook and Instagram brings more visitors to your website.", "Update Social Links", "/admin/cms/settings"],
            ].map(([title, text, buttonText, href]) => (
              <div key={title} className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
                <div className="mt-4 text-lg font-bold text-gray-800">{title}</div>
                <div className="mt-2 text-base text-gray-600">{text}</div>
                <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="mt-4 inline-flex min-h-[52px] items-center rounded-xl bg-blue-600 px-6 py-3 text-lg font-bold text-white hover:bg-blue-700">
                  {buttonText}
                </a>
              </div>
            ))}
          </div>
        </div>

        <details className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <summary className="flex cursor-pointer list-none items-center justify-between text-2xl font-semibold text-gray-800">
            Connect Google Search Console (Optional but Recommended)
            <ChevronDown className="h-6 w-6" />
          </summary>
          <div className="mt-6 space-y-4">
            {[
              "Go to search.google.com/search-console",
              "Add your website bernardinomartinhvac.com",
              "Verify ownership",
              "Submit your sitemap: bernardinomartinhvac.com/sitemap.xml",
              "Come back in 3-5 days to see your Google rankings",
            ].map((step, index) => (
              <label key={step} className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-4">
                <input
                  type="checkbox"
                  checked={gscSteps[index] || false}
                  onChange={(event) => setStep(index, event.target.checked)}
                  className="mt-1 h-6 w-6"
                />
                <span className="text-lg text-gray-700">{index + 1}. {step}</span>
              </label>
            ))}
          </div>
        </details>

        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => window.print()}
            className="min-h-[52px] rounded-xl bg-blue-600 px-8 py-4 text-lg font-bold text-white hover:bg-blue-700"
          >
            Download Monthly Report (PDF)
          </button>
        </div>
      </div>
    </AdminCMSLayout>
  );
}
