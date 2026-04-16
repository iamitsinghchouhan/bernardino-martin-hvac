import type { NextFunction, Request, Response } from "express";
import fs from "fs/promises";
import path from "path";
import { count, desc, eq } from "drizzle-orm";

import { db } from "../db";
import { storage } from "../storage";
import { AppError } from "../utils/errors";
import {
  cmsPages,
  insertCmsPageSchema,
  insertMediaLibrarySchema,
  insertReviewSchema,
  insertSeoPageSchema,
  mediaLibrary,
  reviews,
  seoPages,
  siteSettings,
} from "@shared/schema";

const DEFAULT_SITE_SETTINGS = [
  { key: "phone", value: "(818) 400-0227", label: "Phone Number", type: "text" },
  { key: "email", value: "martinsolarstar@gmail.com", label: "Email Address", type: "text" },
  { key: "address", value: "Los Angeles, CA", label: "Business Address", type: "text" },
  { key: "facebook", value: "https://www.facebook.com/profile.php?id=61551460556076", label: "Facebook URL", type: "url" },
  { key: "instagram", value: "https://www.instagram.com/bernardinomartinsolar/", label: "Instagram URL", type: "url" },
  { key: "youtube", value: "https://www.youtube.com/bernardinomartinhvac", label: "YouTube URL", type: "url" },
  { key: "whatsapp", value: "18184000227", label: "WhatsApp Number", type: "text" },
  { key: "tagline", value: "Heating • Air Conditioning • Solar", label: "Business Tagline", type: "text" },
  { key: "easter_promo_active", value: "true", label: "Easter Promotion Active", type: "boolean" },
  { key: "easter_promo_code", value: "EASTER25", label: "Easter Promo Code", type: "text" },
  { key: "easter_promo_discount", value: "15% OFF", label: "Easter Discount Amount", type: "text" },
];

const DEFAULT_SEO_PAGES = [
  "/",
  "/services",
  "/about",
  "/contact",
  "/booking",
  "/hvac-los-angeles",
  "/solar-installation-los-angeles",
  "/plumbing-los-angeles",
  "/electrical-services-los-angeles",
  "/landscaping-los-angeles",
  "/irrigation-los-angeles",
  "/network-installation-los-angeles",
  "/hvac-burbank",
  "/hvac-glendale",
  "/hvac-pasadena",
];

function defaultSeoEntry(slug: string) {
  const clean = slug === "/" ? "Homepage" : slug.replace(/^\//, "").split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
  return {
    pageSlug: slug,
    pageTitle: clean,
    metaTitle: `${clean} | Bernardino Martin`,
    metaDescription: `Professional ${clean.toLowerCase()} information from Bernardino Martin.`,
    keywords: clean.toLowerCase(),
    isIndexed: !slug.startsWith("/admin"),
  };
}

async function ensureDefaultSiteSettings() {
  const existing = await db.select().from(siteSettings);
  const existingKeys = new Set(existing.map((item) => item.key));
  const missing = DEFAULT_SITE_SETTINGS.filter((item) => !existingKeys.has(item.key));
  if (missing.length) {
    await db.insert(siteSettings).values(missing);
  }
}

async function ensureDefaultSeoPages() {
  const existing = await db.select().from(seoPages);
  const existingSlugs = new Set(existing.map((item) => item.pageSlug));
  const missing = DEFAULT_SEO_PAGES.filter((slug) => !existingSlugs.has(slug)).map(defaultSeoEntry);
  if (missing.length) {
    await db.insert(seoPages).values(missing);
  }
}

function parseId(param: string | string[] | undefined, label: string) {
  const value = Array.isArray(param) ? param[0] : param;
  const id = Number.parseInt(value ?? "", 10);
  if (Number.isNaN(id)) {
    throw AppError.validation(`Invalid ${label}`);
  }
  return id;
}

function uploadsDirCandidates() {
  const root = process.cwd();
  return [
    path.join(root, "client/public/images/uploads"),
    path.join(root, "dist/public/images/uploads"),
  ];
}

async function ensureUploadDirectories() {
  await Promise.all(uploadsDirCandidates().map((dir) => fs.mkdir(dir, { recursive: true })));
}

async function saveUploadFile(filename: string, content: Buffer) {
  await ensureUploadDirectories();
  await Promise.all(
    uploadsDirCandidates().map((dir) => fs.writeFile(path.join(dir, filename), content)),
  );
}

async function deleteUploadFile(filename: string) {
  await Promise.all(
    uploadsDirCandidates().map(async (dir) => {
      try {
        await fs.unlink(path.join(dir, filename));
      } catch {
        // Ignore missing file in one of the mirrored folders
      }
    }),
  );
}

function sanitizeFilename(filename: string) {
  return filename.replace(/[^a-zA-Z0-9._-]/g, "-").toLowerCase();
}

export async function getSettings(_req: Request, res: Response, next: NextFunction) {
  try {
    await ensureDefaultSiteSettings();
    const settings = await db.select().from(siteSettings).orderBy(siteSettings.label);
    res.json(settings);
  } catch (err) {
    next(err);
  }
}

export async function updateSetting(req: Request, res: Response, next: NextFunction) {
  try {
    await ensureDefaultSiteSettings();
    const key = Array.isArray(req.params.key) ? req.params.key[0] : req.params.key;
    if (!key) {
      throw AppError.validation("Setting key is required");
    }

    const value = typeof req.body?.value === "string" ? req.body.value : String(req.body?.value ?? "");
    if (!value.trim()) {
      throw AppError.validation("Setting value is required");
    }

    const [updated] = await db
      .update(siteSettings)
      .set({ value, updatedAt: new Date() })
      .where(eq(siteSettings.key, key))
      .returning();

    if (!updated) {
      throw AppError.notFound("Setting not found");
    }

    res.json(updated);
  } catch (err) {
    next(err);
  }
}

export async function getReviews(_req: Request, res: Response, next: NextFunction) {
  try {
    const items = await db.select().from(reviews).orderBy(desc(reviews.updatedAt), desc(reviews.createdAt));
    res.json(items);
  } catch (err) {
    next(err);
  }
}

export async function getPublicReviews(_req: Request, res: Response, next: NextFunction) {
  try {
    const items = await db.select().from(reviews).where(eq(reviews.isActive, true)).orderBy(desc(reviews.updatedAt), desc(reviews.createdAt));
    res.json(items);
  } catch (err) {
    next(err);
  }
}

export async function createReview(req: Request, res: Response, next: NextFunction) {
  try {
    const data = insertReviewSchema.parse(req.body);
    const [created] = await db.insert(reviews).values(data).returning();
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
}

export async function updateReview(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseId(req.params.id, "review id");
    const data = insertReviewSchema.parse(req.body);
    const [updated] = await db
      .update(reviews)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(reviews.id, id))
      .returning();

    if (!updated) {
      throw AppError.notFound("Review not found");
    }

    res.json(updated);
  } catch (err) {
    next(err);
  }
}

export async function deleteReview(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseId(req.params.id, "review id");
    const deleted = await db.delete(reviews).where(eq(reviews.id, id)).returning({ id: reviews.id });
    if (!deleted.length) {
      throw AppError.notFound("Review not found");
    }
    res.json({ success: true, message: "Review deleted" });
  } catch (err) {
    next(err);
  }
}

export async function getSeoPages(_req: Request, res: Response, next: NextFunction) {
  try {
    await ensureDefaultSeoPages();
    const items = await db.select().from(seoPages).orderBy(seoPages.pageSlug);
    res.json(items);
  } catch (err) {
    next(err);
  }
}

export async function createSeoPage(req: Request, res: Response, next: NextFunction) {
  try {
    const data = insertSeoPageSchema.parse(req.body);
    const [created] = await db.insert(seoPages).values(data).returning();
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
}

export async function updateSeoPage(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseId(req.params.id, "SEO page id");
    const data = insertSeoPageSchema.parse(req.body);
    const [updated] = await db
      .update(seoPages)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(seoPages.id, id))
      .returning();

    if (!updated) {
      throw AppError.notFound("SEO page not found");
    }

    res.json(updated);
  } catch (err) {
    next(err);
  }
}

export async function getMedia(_req: Request, res: Response, next: NextFunction) {
  try {
    const items = await db.select().from(mediaLibrary).orderBy(desc(mediaLibrary.uploadedAt));
    res.json(items);
  } catch (err) {
    next(err);
  }
}

export async function uploadMedia(req: Request, res: Response, next: NextFunction) {
  try {
    const base64 = typeof req.body?.base64 === "string" ? req.body.base64 : "";
    const filename = typeof req.body?.filename === "string" ? req.body.filename : "";
    const mimeType = typeof req.body?.mimeType === "string" ? req.body.mimeType : "application/octet-stream";
    const altText = typeof req.body?.altText === "string" ? req.body.altText : "";

    if (!base64 || !filename) {
      throw AppError.validation("Image file data is required");
    }

    const cleanedBase64 = base64.includes(",") ? base64.split(",")[1] : base64;
    const content = Buffer.from(cleanedBase64, "base64");
    const safeFilename = `${Date.now()}-${sanitizeFilename(filename)}`;
    await saveUploadFile(safeFilename, content);

    const mediaData = insertMediaLibrarySchema.parse({
      filename: safeFilename,
      originalName: filename,
      url: `/images/uploads/${safeFilename}`,
      size: content.length,
      mimeType,
      altText: altText || null,
    });

    const [created] = await db.insert(mediaLibrary).values(mediaData).returning();
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
}

export async function deleteMedia(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseId(req.params.id, "media id");
    const [item] = await db.select().from(mediaLibrary).where(eq(mediaLibrary.id, id));
    if (!item) {
      throw AppError.notFound("Media item not found");
    }

    await deleteUploadFile(item.filename);
    await db.delete(mediaLibrary).where(eq(mediaLibrary.id, id));
    res.json({ success: true, message: "Media deleted" });
  } catch (err) {
    next(err);
  }
}

export async function getCmsPages(_req: Request, res: Response, next: NextFunction) {
  try {
    const items = await db.select().from(cmsPages).orderBy(desc(cmsPages.updatedAt), desc(cmsPages.createdAt));
    res.json(items);
  } catch (err) {
    next(err);
  }
}

export async function createCmsPage(req: Request, res: Response, next: NextFunction) {
  try {
    const data = insertCmsPageSchema.parse(req.body);
    const [created] = await db.insert(cmsPages).values(data).returning();
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
}

export async function updateCmsPage(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseId(req.params.id, "page id");
    const data = insertCmsPageSchema.parse(req.body);
    const [updated] = await db
      .update(cmsPages)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(cmsPages.id, id))
      .returning();

    if (!updated) {
      throw AppError.notFound("Page not found");
    }

    res.json(updated);
  } catch (err) {
    next(err);
  }
}

export async function deleteCmsPage(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseId(req.params.id, "page id");
    const deleted = await db.delete(cmsPages).where(eq(cmsPages.id, id)).returning({ id: cmsPages.id });
    if (!deleted.length) {
      throw AppError.notFound("Page not found");
    }
    res.json({ success: true, message: "Page deleted" });
  } catch (err) {
    next(err);
  }
}

export async function getOverview(_req: Request, res: Response, next: NextFunction) {
  try {
    await ensureDefaultSiteSettings();
    await ensureDefaultSeoPages();

    const [pagesCount] = await db.select({ total: count() }).from(cmsPages);
    const [reviewsCount] = await db.select({ total: count() }).from(reviews);
    const [mediaCount] = await db.select({ total: count() }).from(mediaLibrary);
    const [settingsCount] = await db.select({ total: count() }).from(siteSettings);
    const [seoCount] = await db.select({ total: count() }).from(seoPages);
    const bookingStats = await storage.getDashboardStats();

    res.json({
      totalPages: pagesCount.total,
      totalReviews: reviewsCount.total,
      totalMedia: mediaCount.total,
      totalSettings: settingsCount.total,
      totalSeoPages: seoCount.total,
      totalBookings: bookingStats.totalBookings,
      unpaidInvoices: bookingStats.unpaidInvoices,
      contactMessages: bookingStats.totalContacts,
    });
  } catch (err) {
    next(err);
  }
}

export async function getPublicPageBySlug(req: Request, res: Response, next: NextFunction) {
  try {
    const slug = Array.isArray(req.params.slug) ? req.params.slug[0] : req.params.slug;
    if (!slug) {
      throw AppError.notFound("Page not found");
    }

    const [page] = await db
      .select()
      .from(cmsPages)
      .where(eq(cmsPages.slug, slug));

    if (!page || !page.isPublished) {
      throw AppError.notFound("Page not found");
    }

    res.json(page);
  } catch (err) {
    next(err);
  }
}
