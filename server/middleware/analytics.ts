import crypto from "crypto";

export function detectDeviceType(userAgent: string) {
  if (/ipad|tablet/i.test(userAgent)) return "tablet";
  if (/mobile|android|iphone/i.test(userAgent)) return "mobile";
  return "desktop";
}

export function hashIpAddress(ip: string) {
  return crypto.createHash("sha256").update(ip).digest("hex").slice(0, 16);
}

export function categorizeReferrer(referrer: string) {
  if (!referrer) return "Direct";
  if (referrer.toLowerCase().includes("google")) return "Google";
  if (referrer.toLowerCase().includes("facebook")) return "Facebook";
  if (referrer.toLowerCase().includes("instagram")) return "Instagram";
  return "Other";
}
