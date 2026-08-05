import { Link } from "wouter";
import { Clock, Maximize2 } from "lucide-react";
import type { ServiceCatalogItem } from "@/data/service-catalog";
import { AdaptiveImage } from "./AdaptiveImage";

export function ServiceCardTile({ svc, categoryBg, onImageClick }: { svc: ServiceCatalogItem; categoryBg: string; onImageClick?: () => void }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:-translate-y-1">
      <div
        className="relative aspect-[4/3] overflow-hidden bg-slate-100 cursor-zoom-in"
        onClick={onImageClick}
        role={onImageClick ? "button" : undefined}
        aria-label={onImageClick ? `View ${svc.name} fullscreen` : undefined}
        tabIndex={onImageClick ? 0 : undefined}
        onKeyDown={onImageClick ? (e) => e.key === "Enter" && onImageClick() : undefined}
      >
        <AdaptiveImage src={svc.image} alt={svc.name}
          className="h-full w-full" imgClassName="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          width={400} height={300} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 flex gap-2">
          <span className="flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold text-slate-900 shadow-sm">
            <Clock className="h-3 w-3 text-primary" aria-hidden="true" /> {svc.duration}
          </span>
        </div>
        {onImageClick && (
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-xs text-white">
              <Maximize2 className="h-3 w-3" /> Fullscreen
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-start gap-3">
          <div className={`rounded-lg ${categoryBg} p-2 shrink-0 text-white transition-colors group-hover:scale-110`}>
            <svc.icon className="h-4 w-4" aria-hidden="true" />
          </div>
          <h3 className="text-sm font-bold leading-tight text-slate-900 transition-colors group-hover:text-primary pt-1">
            {svc.name}
          </h3>
        </div>
        <p className="mb-4 flex-1 text-xs leading-relaxed text-slate-500">{svc.desc}</p>
        <div className="mb-4">
          <span className="rounded-md bg-secondary/10 px-2.5 py-1 text-sm font-bold text-secondary">{svc.price}</span>
        </div>
        <div className="flex gap-2">
          <Link href={`/booking?service=${svc.slug}`}
            className="flex-1 flex items-center justify-center rounded-lg bg-primary px-3 py-2 text-xs font-bold text-white hover:bg-primary/90 transition-colors text-center">
            Book Now
          </Link>
          <Link href={`/services/${svc.slug}`}
            className="flex-1 flex items-center justify-center rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:border-primary/30 transition-colors text-center">
            Learn More
          </Link>
        </div>
      </div>
    </article>
  );
}
