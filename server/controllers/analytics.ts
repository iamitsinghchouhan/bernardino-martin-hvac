import type { NextFunction, Request, Response } from "express";
import { and, count, desc, eq, gte, inArray, lt, sql } from "drizzle-orm";

import { db } from "../db";
import { AppError } from "../utils/errors";
import { categorizeReferrer, detectDeviceType, hashIpAddress } from "../middleware/analytics";
import {
  analyticsEvents,
  bookings,
  contactMessages,
  dailyStats,
  insertAnalyticsEventSchema,
  insertDailyStatSchema,
  insertPageViewSchema,
  invoices,
  pageViews,
  quotes,
} from "@shared/schema";

const EVENT_LABELS: Record<string, string> = {
  phone_click: "Called Your Phone Number",
  whatsapp_click: "Clicked WhatsApp Chat",
  booking_completed: "Completed a Booking",
  quote_requested: "Requested a Quote",
  contact_submitted: "Sent a Contact Message",
  booking_started: "Started a Booking",
};

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function startOfWeek(date: Date) {
  const day = date.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  return startOfDay(addDays(date, diff));
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function endExclusive(date: Date) {
  return new Date(date);
}

function percentageChange(current: number, previous: number) {
  if (previous === 0 && current === 0) return 0;
  if (previous === 0) return 100;
  return Number((((current - previous) / previous) * 100).toFixed(1));
}

async function periodCounts(start: Date, end: Date) {
  const distinctSessions = sql<number>`COUNT(DISTINCT ${pageViews.sessionId})`;
  const [pageStats] = await db.select({
    visitors: distinctSessions,
    pageViews: count(pageViews.id),
  }).from(pageViews).where(and(gte(pageViews.visitedAt, start), lt(pageViews.visitedAt, end)));

  const [bookingStats] = await db.select({ count: count(bookings.id) }).from(bookings).where(and(gte(bookings.createdAt, start), lt(bookings.createdAt, end)));
  const [contactStats] = await db.select({ count: count(contactMessages.id) }).from(contactMessages).where(and(gte(contactMessages.createdAt, start), lt(contactMessages.createdAt, end)));
  const [quoteStats] = await db.select({ count: count(quotes.id) }).from(quotes).where(and(gte(quotes.createdAt, start), lt(quotes.createdAt, end)));
  const [phoneStats] = await db.select({ count: count(analyticsEvents.id) }).from(analyticsEvents).where(and(eq(analyticsEvents.eventType, "phone_click"), gte(analyticsEvents.occurredAt, start), lt(analyticsEvents.occurredAt, end)));
  const [whatsappStats] = await db.select({ count: count(analyticsEvents.id) }).from(analyticsEvents).where(and(eq(analyticsEvents.eventType, "whatsapp_click"), gte(analyticsEvents.occurredAt, start), lt(analyticsEvents.occurredAt, end)));
  const [revenueStats] = await db.select({
    total: sql<number>`COALESCE(SUM(${invoices.amount}), 0)`,
  }).from(invoices).where(and(eq(invoices.status, "paid"), gte(invoices.paidAt, start), lt(invoices.paidAt, end)));

  return {
    visitors: Number(pageStats?.visitors ?? 0),
    pageViews: Number(pageStats?.pageViews ?? 0),
    bookings: Number(bookingStats?.count ?? 0),
    contacts: Number(contactStats?.count ?? 0),
    quotes: Number(quoteStats?.count ?? 0),
    phoneCalls: Number(phoneStats?.count ?? 0),
    whatsappClicks: Number(whatsappStats?.count ?? 0),
    revenue: Number(revenueStats?.total ?? 0),
  };
}

async function getAllTimeStats() {
  const distinctSessions = sql<number>`COUNT(DISTINCT ${pageViews.sessionId})`;
  const [pageStats] = await db.select({
    totalVisitors: distinctSessions,
    totalPageViews: count(pageViews.id),
  }).from(pageViews);

  const [bookingStats] = await db.select({ totalBookings: count(bookings.id) }).from(bookings);
  const [contactStats] = await db.select({ totalContacts: count(contactMessages.id) }).from(contactMessages);
  const [quoteStats] = await db.select({ totalQuotes: count(quotes.id) }).from(quotes);
  const [revenueStats] = await db.select({
    totalRevenue: sql<number>`COALESCE(SUM(${invoices.amount}), 0)`,
  }).from(invoices).where(eq(invoices.status, "paid"));

  return {
    totalVisitors: Number(pageStats?.totalVisitors ?? 0),
    totalPageViews: Number(pageStats?.totalPageViews ?? 0),
    totalBookings: Number(bookingStats?.totalBookings ?? 0),
    totalRevenue: Number(revenueStats?.totalRevenue ?? 0),
    totalContacts: Number(contactStats?.totalContacts ?? 0),
    totalQuotes: Number(quoteStats?.totalQuotes ?? 0),
  };
}

export async function trackPageView(req: Request, res: Response, next: NextFunction) {
  try {
    const page = typeof req.body?.page === "string" ? req.body.page : "";
    const referrer = typeof req.body?.referrer === "string" ? req.body.referrer : "";
    const sessionId = typeof req.body?.sessionId === "string" ? req.body.sessionId : "";

    if (!page || !sessionId) {
      throw AppError.validation("Page and session are required");
    }

    const userAgent = req.headers["user-agent"] || "";
    const forwardedFor = Array.isArray(req.headers["x-forwarded-for"])
      ? req.headers["x-forwarded-for"][0]
      : req.headers["x-forwarded-for"];
    const rawIp = (forwardedFor?.split(",")[0] || req.ip || "").trim();

    const payload = insertPageViewSchema.parse({
      page,
      referrer: categorizeReferrer(referrer),
      userAgent,
      deviceType: detectDeviceType(userAgent),
      country: null,
      city: null,
      sessionId,
      ipHash: rawIp ? hashIpAddress(rawIp) : null,
    });

    res.json({ success: true });

    void db.insert(pageViews).values(payload).catch(() => {
      // silent fire-and-forget failure
    });
  } catch (err) {
    next(err);
  }
}

export async function trackAnalyticsEvent(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = insertAnalyticsEventSchema.parse({
      eventType: req.body?.eventType,
      eventData: req.body?.eventData ?? null,
      page: req.body?.page ?? null,
      sessionId: req.body?.sessionId ?? null,
    });

    res.json({ success: true });
    void db.insert(analyticsEvents).values(payload).catch(() => {
      // silent fire-and-forget failure
    });
  } catch (err) {
    next(err);
  }
}

export async function getAnalyticsOverview(_req: Request, res: Response, next: NextFunction) {
  try {
    const now = new Date();
    const todayStart = startOfDay(now);
    const yesterdayStart = addDays(todayStart, -1);
    const weekStart = startOfWeek(now);
    const lastWeekStart = addDays(weekStart, -7);
    const monthStart = startOfMonth(now);
    const lastMonthStart = new Date(monthStart.getFullYear(), monthStart.getMonth() - 1, 1);

    const today = await periodCounts(todayStart, endExclusive(now));
    const yesterday = await periodCounts(yesterdayStart, todayStart);
    const thisWeek = await periodCounts(weekStart, endExclusive(now));
    const lastWeek = await periodCounts(lastWeekStart, weekStart);
    const thisMonth = await periodCounts(monthStart, endExclusive(now));
    const lastMonth = await periodCounts(lastMonthStart, monthStart);
    const allTime = await getAllTimeStats();

    res.json({
      today,
      yesterday,
      thisWeek,
      lastWeek,
      thisMonth,
      lastMonth,
      allTime,
      comparisons: {
        todayVsYesterday: {
          visitors: percentageChange(today.visitors, yesterday.visitors),
          pageViews: percentageChange(today.pageViews, yesterday.pageViews),
          bookings: percentageChange(today.bookings, yesterday.bookings),
          contacts: percentageChange(today.contacts, yesterday.contacts),
          quotes: percentageChange(today.quotes, yesterday.quotes),
          phoneCalls: percentageChange(today.phoneCalls, yesterday.phoneCalls),
          revenue: percentageChange(today.revenue, yesterday.revenue),
        },
        thisWeekVsLastWeek: {
          visitors: percentageChange(thisWeek.visitors, lastWeek.visitors),
          pageViews: percentageChange(thisWeek.pageViews, lastWeek.pageViews),
          bookings: percentageChange(thisWeek.bookings, lastWeek.bookings),
          contacts: percentageChange(thisWeek.contacts, lastWeek.contacts),
          quotes: percentageChange(thisWeek.quotes, lastWeek.quotes),
          phoneCalls: percentageChange(thisWeek.phoneCalls, lastWeek.phoneCalls),
          revenue: percentageChange(thisWeek.revenue, lastWeek.revenue),
        },
        thisMonthVsLastMonth: {
          visitors: percentageChange(thisMonth.visitors, lastMonth.visitors),
          pageViews: percentageChange(thisMonth.pageViews, lastMonth.pageViews),
          bookings: percentageChange(thisMonth.bookings, lastMonth.bookings),
          contacts: percentageChange(thisMonth.contacts, lastMonth.contacts),
          quotes: percentageChange(thisMonth.quotes, lastMonth.quotes),
          phoneCalls: percentageChange(thisMonth.phoneCalls, lastMonth.phoneCalls),
          revenue: percentageChange(thisMonth.revenue, lastMonth.revenue),
        },
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function getAnalyticsPages(_req: Request, res: Response, next: NextFunction) {
  try {
    const viewsCount = count(pageViews.id);
    const rows = await db
      .select({
        page: pageViews.page,
        views: viewsCount,
      })
      .from(pageViews)
      .groupBy(pageViews.page)
      .orderBy(desc(viewsCount))
      .limit(10);

    const totalViews = rows.reduce((sum, row) => sum + Number(row.views ?? 0), 0) || 1;
    res.json(rows.map((row) => ({
      page: row.page,
      views: Number(row.views ?? 0),
      percentage: Number(((Number(row.views ?? 0) / totalViews) * 100).toFixed(1)),
    })));
  } catch (err) {
    next(err);
  }
}

export async function getAnalyticsDevices(_req: Request, res: Response, next: NextFunction) {
  try {
    const rows = await db
      .select({
        deviceType: pageViews.deviceType,
        count: count(pageViews.id),
      })
      .from(pageViews)
      .groupBy(pageViews.deviceType);

    const total = rows.reduce((sum, row) => sum + Number(row.count ?? 0), 0) || 1;
    const values = {
      mobile: 0,
      tablet: 0,
      desktop: 0,
    };

    for (const row of rows) {
      const key = (row.deviceType || "desktop") as keyof typeof values;
      if (key in values) {
        values[key] = Number(((Number(row.count ?? 0) / total) * 100).toFixed(1));
      }
    }

    res.json(values);
  } catch (err) {
    next(err);
  }
}

export async function getAnalyticsReferrers(_req: Request, res: Response, next: NextFunction) {
  try {
    const distinctVisitors = sql<number>`COUNT(DISTINCT ${pageViews.sessionId})`;
    const rows = await db
      .select({
        source: pageViews.referrer,
        visitors: distinctVisitors,
      })
      .from(pageViews)
      .groupBy(pageViews.referrer);

    const total = rows.reduce((sum, row) => sum + Number(row.visitors ?? 0), 0) || 1;
    res.json(rows.map((row) => ({
      source: row.source || "Direct",
      visitors: Number(row.visitors ?? 0),
      percentage: Number(((Number(row.visitors ?? 0) / total) * 100).toFixed(1)),
    })).sort((a, b) => Number(b.visitors ?? 0) - Number(a.visitors ?? 0)));
  } catch (err) {
    next(err);
  }
}

export async function getAnalyticsChart(req: Request, res: Response, next: NextFunction) {
  try {
    const period = String(req.query.period || "7d");
    const days = period === "30d" ? 30 : period === "90d" ? 90 : 7;
    const start = startOfDay(addDays(new Date(), -(days - 1)));
    const dates = Array.from({ length: days }, (_, index) => {
      const date = addDays(start, index);
      return {
        key: date.toISOString().slice(0, 10),
        label: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        visitors: 0,
        pageViews: 0,
        bookings: 0,
        contacts: 0,
        quotes: 0,
      };
    });

    const dateMap = new Map(dates.map((item) => [item.key, item]));
    const end = addDays(start, days);

    const pageRows = await db.select().from(pageViews).where(and(gte(pageViews.visitedAt, start), lt(pageViews.visitedAt, end)));
    const bookingRows = await db.select().from(bookings).where(and(gte(bookings.createdAt, start), lt(bookings.createdAt, end)));
    const contactRows = await db.select().from(contactMessages).where(and(gte(contactMessages.createdAt, start), lt(contactMessages.createdAt, end)));
    const quoteRows = await db.select().from(quotes).where(and(gte(quotes.createdAt, start), lt(quotes.createdAt, end)));

    for (const row of pageRows) {
      if (!row.visitedAt) continue;
      const key = new Date(row.visitedAt).toISOString().slice(0, 10);
      const item = dateMap.get(key);
      if (item) {
        item.pageViews += 1;
      }
    }

    const sessionMap = new Map<string, Set<string>>();
    for (const row of pageRows) {
      if (!row.visitedAt || !row.sessionId) continue;
      const key = new Date(row.visitedAt).toISOString().slice(0, 10);
      if (!sessionMap.has(key)) sessionMap.set(key, new Set());
      sessionMap.get(key)!.add(row.sessionId);
    }
    for (const [key, sessions] of sessionMap.entries()) {
      const item = dateMap.get(key);
      if (item) item.visitors = sessions.size;
    }

    for (const row of bookingRows) {
      const key = new Date(row.createdAt).toISOString().slice(0, 10);
      const item = dateMap.get(key);
      if (item) item.bookings += 1;
    }
    for (const row of contactRows) {
      const key = new Date(row.createdAt).toISOString().slice(0, 10);
      const item = dateMap.get(key);
      if (item) item.contacts += 1;
    }
    for (const row of quoteRows) {
      const key = new Date(row.createdAt).toISOString().slice(0, 10);
      const item = dateMap.get(key);
      if (item) item.quotes += 1;
    }

    res.json(dates.map((item) => ({
      date: item.label,
      visitors: item.visitors,
      pageViews: item.pageViews,
      bookings: item.bookings,
      contacts: item.contacts,
      quotes: item.quotes,
    })));
  } catch (err) {
    next(err);
  }
}

export async function getAnalyticsEvents(_req: Request, res: Response, next: NextFunction) {
  try {
    const rows = await db
      .select({
        eventType: analyticsEvents.eventType,
        count: count(analyticsEvents.id),
      })
      .from(analyticsEvents)
      .where(inArray(analyticsEvents.eventType, Object.keys(EVENT_LABELS)))
      .groupBy(analyticsEvents.eventType);

    res.json(rows.map((row) => ({
      eventType: row.eventType,
      count: row.count,
      label: EVENT_LABELS[row.eventType] || row.eventType,
    })).sort((a, b) => b.count - a.count));
  } catch (err) {
    next(err);
  }
}

export async function getBookingsByService(_req: Request, res: Response, next: NextFunction) {
  try {
    const bookingCount = count(bookings.id);
    const rows = await db
      .select({
        serviceTitle: bookings.serviceTitle,
        count: bookingCount,
      })
      .from(bookings)
      .groupBy(bookings.serviceTitle)
      .orderBy(desc(bookingCount));

    const total = rows.reduce((sum, row) => sum + row.count, 0) || 1;
    res.json(rows.map((row) => ({
      serviceTitle: row.serviceTitle,
      count: row.count,
      percentage: Number(((row.count / total) * 100).toFixed(1)),
    })));
  } catch (err) {
    next(err);
  }
}

export async function getRevenueAnalytics(_req: Request, res: Response, next: NextFunction) {
  try {
    const [paidStats] = await db.select({
      totalRevenue: sql<number>`COALESCE(SUM(CASE WHEN ${invoices.status} = 'paid' THEN ${invoices.amount} ELSE 0 END), 0)`,
      paidInvoices: count(sql`CASE WHEN ${invoices.status} = 'paid' THEN 1 END`),
      averageInvoiceValue: sql<number>`COALESCE(AVG(CASE WHEN ${invoices.status} = 'paid' THEN ${invoices.amount} END), 0)`,
    }).from(invoices);

    const [unpaidStats] = await db.select({
      unpaidInvoices: count(sql`CASE WHEN ${invoices.status} != 'paid' THEN 1 END`),
      unpaidAmount: sql<number>`COALESCE(SUM(CASE WHEN ${invoices.status} != 'paid' THEN ${invoices.amount} ELSE 0 END), 0)`,
    }).from(invoices);

    const now = new Date();
    const monthStart = startOfMonth(now);
    const lastMonthStart = new Date(monthStart.getFullYear(), monthStart.getMonth() - 1, 1);

    const [thisMonth] = await db.select({
      total: sql<number>`COALESCE(SUM(${invoices.amount}), 0)`,
    }).from(invoices).where(and(eq(invoices.status, "paid"), gte(invoices.paidAt, monthStart), lt(invoices.paidAt, now)));

    const [lastMonth] = await db.select({
      total: sql<number>`COALESCE(SUM(${invoices.amount}), 0)`,
    }).from(invoices).where(and(eq(invoices.status, "paid"), gte(invoices.paidAt, lastMonthStart), lt(invoices.paidAt, monthStart)));

    res.json({
      totalRevenue: Number(paidStats?.totalRevenue ?? 0),
      paidInvoices: paidStats?.paidInvoices ?? 0,
      unpaidInvoices: unpaidStats?.unpaidInvoices ?? 0,
      unpaidAmount: Number(unpaidStats?.unpaidAmount ?? 0),
      averageInvoiceValue: Math.round(Number(paidStats?.averageInvoiceValue ?? 0)),
      revenueThisMonth: Number(thisMonth?.total ?? 0),
      revenueLastMonth: Number(lastMonth?.total ?? 0),
    });
  } catch (err) {
    next(err);
  }
}

export async function getRealtimeAnalytics(_req: Request, res: Response, next: NextFunction) {
  try {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    const distinctVisitors = sql<number>`COUNT(DISTINCT ${pageViews.sessionId})`;
    const [active] = await db.select({
      activeVisitors: distinctVisitors,
    }).from(pageViews).where(gte(pageViews.visitedAt, fiveMinutesAgo));

    const activeCount = sql<number>`COUNT(DISTINCT ${pageViews.sessionId})`;
    const rows = await db
      .select({
        page: pageViews.page,
        count: activeCount,
      })
      .from(pageViews)
      .where(gte(pageViews.visitedAt, fiveMinutesAgo))
      .groupBy(pageViews.page)
      .orderBy(desc(activeCount));

    res.json({
      activeVisitors: active?.activeVisitors ?? 0,
      pagesBeingViewed: rows,
    });
  } catch (err) {
    next(err);
  }
}

export async function aggregateDailyAnalytics() {
  const target = startOfDay(addDays(new Date(), -1));
  const targetKey = target.toISOString().slice(0, 10);
  const nextDay = addDays(target, 1);

  const pageStats = await periodCounts(target, nextDay);
  const [uniqueVisitorStats] = await db.select({
    uniqueVisitors: sql<number>`COUNT(DISTINCT ${pageViews.ipHash})`,
  }).from(pageViews).where(and(gte(pageViews.visitedAt, target), lt(pageViews.visitedAt, nextDay)));

  const [paidInvoicesStats] = await db.select({
    invoicesPaid: count(invoices.id),
  }).from(invoices).where(and(eq(invoices.status, "paid"), gte(invoices.paidAt, target), lt(invoices.paidAt, nextDay)));

  const payload = insertDailyStatSchema.parse({
    date: targetKey,
    totalVisitors: pageStats.visitors,
    uniqueVisitors: uniqueVisitorStats?.uniqueVisitors ?? 0,
    totalPageViews: pageStats.pageViews,
    bookingsCreated: pageStats.bookings,
    contactsCreated: pageStats.contacts,
    quotesCreated: pageStats.quotes,
    invoicesPaid: paidInvoicesStats?.invoicesPaid ?? 0,
    revenueCollected: pageStats.revenue,
  });

  const [existing] = await db.select().from(dailyStats).where(eq(dailyStats.date, targetKey));
  if (existing) {
    await db.update(dailyStats).set(payload).where(eq(dailyStats.date, targetKey));
    return;
  }

  await db.insert(dailyStats).values(payload);
}
