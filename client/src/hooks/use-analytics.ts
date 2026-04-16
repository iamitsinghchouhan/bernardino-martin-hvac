import { useEffect } from "react";
import { useLocation } from "wouter";

function getOrCreateSessionId(): string {
  let sessionId = sessionStorage.getItem("bm_session_id");
  if (!sessionId) {
    sessionId = Math.random().toString(36).substring(2) + Date.now().toString(36);
    sessionStorage.setItem("bm_session_id", sessionId);
  }
  return sessionId;
}

export function usePageTracking() {
  const [location] = useLocation();

  useEffect(() => {
    const sessionId = getOrCreateSessionId();
    fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        page: location,
        referrer: document.referrer || "",
        sessionId,
      }),
    }).catch(() => {});
  }, [location]);
}

export function trackEvent(eventType: string, eventData?: string) {
  const sessionId = getOrCreateSessionId();
  const page = window.location.pathname;
  fetch("/api/analytics/event", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ eventType, eventData, page, sessionId }),
  }).catch(() => {});
}
