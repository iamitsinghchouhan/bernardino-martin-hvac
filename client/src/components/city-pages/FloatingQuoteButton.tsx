import { useEffect, useState } from "react";

/** Desktop-only floating CTA, fixed bottom-LEFT, so a quote is never more than one click away.
    Deliberately on the opposite corner from the existing chat-widget bubble and "Call Now"
    button (both bottom-6 right-6 in layout.tsx/chat-widget.tsx) — bottom-right is already taken.
    Hidden on mobile — the existing mobile sticky call/book bar already covers that role there,
    so don't show both at once on small screens. Also hidden near the very top of the page —
    every city-page hero already has its own in-flow Book Now/Call buttons at a similar bottom
    position, and this appearing immediately overlapped them on load. */
type FloatingQuoteButtonProps = {
  onClick: () => void;
  label?: string;
};

export function FloatingQuoteButton({ onClick, label = "Get Instant Quote" }: FloatingQuoteButtonProps) {
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    function onScroll() {
      setPastHero(window.scrollY > 700);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!pastHero) return null;

  return (
    <button
      type="button"
      onClick={onClick}
      className="fixed bottom-6 left-6 z-50 hidden animate-in fade-in items-center gap-2.5 rounded-full bg-[var(--rb-orange)] px-5 py-4 text-sm font-bold text-white shadow-[0_14px_30px_rgba(240,112,42,0.45)] transition-shadow duration-300 hover:shadow-[0_14px_38px_rgba(240,112,42,0.7)] md:flex"
    >
      {label}
    </button>
  );
}
