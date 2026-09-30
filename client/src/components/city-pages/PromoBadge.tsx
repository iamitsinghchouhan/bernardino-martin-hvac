import type { LucideIcon } from "lucide-react";

type PromoBadgeProps = {
  label: string;
  icon?: LucideIcon;
  href?: string;
  /** "solid" for the hero's dark trust-badge row (white-on-glass); "light" for use on a white
      section background. Defaults to "solid". */
  tone?: "solid" | "light";
};

/** Reusable pill badge — the doc's "one flexible badge system" instead of separate one-off
    implementations for the emergency/financing/guarantee badges here and the seasonal promo
    badges later (Phase 7). Deliberately has no countdown timer, no scarcity copy, and no
    always-on "SALE" state built in: it only ever renders the real label it's given. Subtle
    hover lift only — opacity/transform, no layout-triggering properties, so it can't cost CLS. */
export function PromoBadge({ label, icon: Icon, href, tone = "solid" }: PromoBadgeProps) {
  const classes =
    tone === "solid"
      ? "rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-white transition-transform duration-200 hover:-translate-y-0.5"
      : "rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.08em] text-slate-700 shadow-sm transition-transform duration-200 hover:-translate-y-0.5";

  const content = (
    <span className={`inline-flex items-center gap-1.5 ${classes}`}>
      {Icon && <Icon className="h-3.5 w-3.5" aria-hidden="true" />}
      {label}
    </span>
  );

  if (href) {
    return (
      <a href={href} className="inline-block">
        {content}
      </a>
    );
  }
  return content;
}
