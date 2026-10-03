import { cn } from "@/lib/utils";

type SaleStickerProps = {
  /** Big line, e.g. "$79" or "15% OFF" — keep to 2-3 words max */
  big: string;
  /** Small line underneath, e.g. "DIAGNOSTIC" or "FIRST VISIT" */
  small: string;
  /** Corner to pin the sticker to within a `position: relative` parent */
  position?: "top-right" | "top-left";
  className?: string;
};

/** Rotated "stamp" style promo badge. Only render this when `big`/`small` describe a real,
    currently-active promotion (e.g. one of the real PROMOS entries) — never as decoration. If
    there's no real current offer, the parent should omit this component entirely. */
export function SaleSticker({ big, small, position = "top-right", className }: SaleStickerProps) {
  return (
    <div
      className={cn(
        "absolute z-10 flex h-20 w-20 rotate-[-12deg] flex-col items-center justify-center rounded-full border-[3px] border-dashed border-white/55 bg-[var(--rb-orange-dark)] text-center text-white shadow-[0_10px_24px_rgba(240,112,42,0.4)] md:h-[98px] md:w-[98px]",
        position === "top-right" ? "right-4 top-4 md:right-10 md:top-7" : "left-4 top-4 md:left-10 md:top-7",
        className
      )}
      role="note"
      aria-label={`${big} ${small}`}
    >
      <span className="font-heading text-sm font-extrabold leading-none md:text-xl">{big}</span>
      <span className="mt-0.5 text-[8px] font-bold tracking-wide md:text-[9.5px]">{small}</span>
    </div>
  );
}
