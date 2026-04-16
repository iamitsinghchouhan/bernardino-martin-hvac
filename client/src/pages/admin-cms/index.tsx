import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import {
  BarChart2,
  CalendarDays,
  CreditCard,
  FileText,
  Image as ImageIcon,
  Mail,
  Search,
  Settings2,
  Star,
} from "lucide-react";

import { SEO } from "@/components/seo";
import { AdminCMSLayout } from "@/pages/admin-cms/layout";

type CMSOverview = {
  totalPages: number;
  totalReviews: number;
  totalMedia: number;
  totalSettings: number;
  totalSeoPages: number;
  totalBookings: number;
  unpaidInvoices: number;
  contactMessages: number;
};

type AnalyticsOverview = {
  today: { visitors: number; phoneCalls: number };
  thisWeek: { bookings: number };
};

export default function AdminCMSDashboard() {
  const [, navigate] = useLocation();
  const { data, isLoading } = useQuery<CMSOverview>({
    queryKey: ["/api/admin/cms/overview"],
  });
  const { data: analyticsPreview } = useQuery<AnalyticsOverview>({
    queryKey: ["/api/admin/analytics/overview"],
  });

  const cards = useMemo(
    () => [
      {
        label: "Total Reviews",
        value: data?.totalReviews ?? 0,
        icon: Star,
        color: "text-yellow-500",
        href: "/admin/cms/reviews",
      },
      {
        label: "Total Pages",
        value: data?.totalPages ?? 0,
        icon: FileText,
        color: "text-blue-600",
        href: "/admin/cms/pages",
      },
      {
        label: "Media Files",
        value: data?.totalMedia ?? 0,
        icon: ImageIcon,
        color: "text-green-600",
        href: "/admin/cms/media",
      },
      {
        label: "Total Bookings",
        value: data?.totalBookings ?? 0,
        icon: CalendarDays,
        color: "text-violet-600",
        href: "/admin",
      },
      {
        label: "Unpaid Invoices",
        value: data?.unpaidInvoices ?? 0,
        icon: CreditCard,
        color: "text-red-500",
        href: "/admin",
      },
      {
        label: "Contact Messages",
        value: data?.contactMessages ?? 0,
        icon: Mail,
        color: "text-orange-500",
        href: "/admin",
      },
    ],
    [data],
  );

  const quickActions = [
    { label: "Add a New Review", href: "/admin/cms/reviews", icon: Star },
    { label: "Upload an Image", href: "/admin/cms/media", icon: ImageIcon },
    { label: "Edit Business Info", href: "/admin/cms/settings", icon: Settings2 },
    { label: "Update SEO Settings", href: "/admin/cms/seo", icon: Search },
  ];

  return (
    <AdminCMSLayout
      title="Welcome to Your Control Panel"
      subtitle="Here you can manage everything on your website"
    >
      <SEO title="Admin Panel" description="Admin panel" noindex={true} />

      {isLoading ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-lg text-gray-600">
          Loading your website details...
        </div>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <button
                  key={card.label}
                  type="button"
                  onClick={() => navigate(card.href)}
                  className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-left transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-5xl font-bold text-gray-900">{card.value}</div>
                      <div className="mt-3 text-xl font-semibold text-gray-700">{card.label}</div>
                    </div>
                    <Icon className={`h-10 w-10 ${card.color}`} />
                  </div>
                </button>
              );
            })}
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mt-8">
            <h2 className="text-2xl font-semibold text-gray-800">Quick Actions</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.label}
                    type="button"
                    onClick={() => navigate(action.href)}
                    className="min-h-[72px] rounded-2xl bg-blue-600 px-6 py-5 text-left text-white transition-colors hover:bg-blue-700"
                  >
                    <div className="flex items-center gap-4">
                      <Icon className="h-8 w-8 shrink-0" />
                      <span className="text-xl font-bold">{action.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mt-8">
            <h2 className="text-2xl font-semibold text-gray-800">Analytics Summary</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                {
                  label: "Visitors Today",
                  value: analyticsPreview?.today.visitors ?? 0,
                },
                {
                  label: "Bookings This Week",
                  value: analyticsPreview?.thisWeek.bookings ?? 0,
                },
                {
                  label: "Phone Calls Today",
                  value: analyticsPreview?.today.phoneCalls ?? 0,
                },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
                  <div className="text-4xl font-bold text-gray-900">{item.value}</div>
                  <div className="mt-2 text-xl font-semibold text-gray-700">{item.label}</div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => navigate("/admin/cms/analytics")}
              className="mt-6 min-h-[64px] w-full rounded-2xl bg-blue-600 px-6 py-5 text-white transition-colors hover:bg-blue-700"
            >
              <span className="inline-flex items-center gap-4 text-xl font-bold">
                <BarChart2 className="h-8 w-8" />
                View Full Analytics Dashboard
              </span>
            </button>
          </div>
        </>
      )}
    </AdminCMSLayout>
  );
}
