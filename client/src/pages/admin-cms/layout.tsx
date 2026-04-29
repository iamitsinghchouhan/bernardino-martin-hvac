import { type ReactNode, useEffect, useState } from "react";
import { useLocation } from "wouter";
import {
  Building2,
  BarChart2,
  CalendarDays,
  CreditCard,
  FileText,
  Image as ImageIcon,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  MessageSquareQuote,
  Search,
  Star,
} from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/queryClient";

type MenuItem =
  | {
      label: string;
      href?: string;
      icon?: typeof LayoutDashboard;
      onClick?: () => void;
      divider?: never;
    }
  | {
      divider: string;
      label?: never;
      href?: never;
      icon?: never;
      onClick?: never;
    };

const baseItemClass =
  "flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-left text-lg font-semibold text-white transition-colors hover:bg-blue-700";

export function AdminCMSLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  const [location, navigate] = useLocation();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  const handleLogout = async () => {
    await apiRequest("POST", "/api/admin/logout", {});
    queryClient.clear();
    navigate("/admin/login");
  };

  const menuItems: MenuItem[] = [
    { label: "Dashboard", href: "/admin/cms", icon: LayoutDashboard },
    { label: "Analytics & Stats", href: "/admin/cms/analytics", icon: BarChart2 },
    { divider: "CONTENT" },
    { label: "Business Info", href: "/admin/cms/settings", icon: Building2 },
    { label: "Reviews", href: "/admin/cms/reviews", icon: Star },
    { label: "SEO Settings", href: "/admin/cms/seo", icon: Search },
    { label: "Media Library", href: "/admin/cms/media", icon: ImageIcon },
    { label: "Custom Pages", href: "/admin/cms/pages", icon: FileText },
    { divider: "OPERATIONS" },
    { label: "Bookings", href: "/admin/cms/bookings", icon: CalendarDays },
    { label: "Quotes", href: "/admin/cms/quotes", icon: MessageSquareQuote },
    { label: "Contacts", href: "/admin/cms/contacts", icon: Mail },
    { label: "Invoices", href: "/admin/cms/invoices", icon: CreditCard },
    { divider: "SYSTEM" },
    { label: "Logout", icon: LogOut, onClick: handleLogout },
  ];

  function renderMenu() {
    return (
      <div className="flex h-full flex-col bg-blue-800 text-white">
        <div className="border-b border-white/15 px-6 py-7">
          <div className="text-3xl font-bold tracking-tight">BM Admin</div>
          <p className="mt-2 text-base text-blue-100">Simple website controls</p>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="space-y-2">
            {menuItems.map((item) => {
              if (item.divider) {
                return (
                  <div key={item.divider} className="px-4 pt-5 pb-2 text-sm font-bold tracking-[0.18em] text-blue-200">
                    {item.divider}
                  </div>
                );
              }

              const Icon = item.icon!;
              const isActive = item.href
                ? item.href === "/admin/cms"
                  ? location === item.href
                  : location === item.href || location.startsWith(`${item.href}/`)
                : false;

              const isAnalytics = item.href === "/admin/cms/analytics";
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => {
                    if (item.onClick) {
                      void item.onClick();
                      return;
                    }
                    if (item.href) navigate(item.href);
                  }}
                  className={`${baseItemClass} ${isActive ? "bg-blue-600" : ""} ${isAnalytics && !isActive ? "bg-blue-700/60" : ""}`}
                >
                  <Icon className="h-8 w-8 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen">
        <aside className="hidden w-[280px] shrink-0 lg:block">{renderMenu()}</aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="border-b border-gray-200 bg-white px-4 py-4 lg:hidden">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-2xl font-bold text-gray-900">BM Admin</div>
                <p className="text-base text-gray-600">Website controls</p>
              </div>

              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button className="min-h-[52px] rounded-xl bg-blue-600 px-5 text-lg font-bold text-white hover:bg-blue-700">
                    <Menu className="mr-2 h-6 w-6" />
                    Menu
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[320px] max-w-[90vw] p-0">
                  {renderMenu()}
                </SheetContent>
              </Sheet>
            </div>
          </header>

          <main className="flex-1 overflow-auto bg-gray-50 p-4 lg:p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
              <p className="mt-3 text-lg text-gray-600">{subtitle}</p>
            </div>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
