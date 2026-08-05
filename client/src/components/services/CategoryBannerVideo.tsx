import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import type { CategoryMeta } from "@/data/service-catalog";

/** Full-screen category video banner, unchanged from its original /services implementation.
    Always autoplays once mounted — callers that need lazy loading (e.g. city pages, to protect
    mobile performance) should defer MOUNTING this component (e.g. behind an IntersectionObserver)
    rather than adding a variant/prop here, so /services keeps its exact existing behavior. */
export function CategoryBannerVideo({ cat, Icon }: { cat: CategoryMeta; Icon: React.ElementType }) {
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  function toggle() {
    if (videoRef.current) videoRef.current.muted = !videoRef.current.muted;
    setMuted((m) => !m);
  }
  return (
    <div className="relative h-[380px] md:h-[460px] overflow-hidden bg-slate-900">
      {/* Background video — full width/height, clearly visible */}
      <video
        ref={videoRef}
        src={cat.video}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      />
      {/* Minimal dark vignette only at bottom for text legibility — no colour tint */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />

      {/* Text content */}
      <div className="relative z-10 h-full flex items-center px-6 md:px-12">
        <div className="max-w-7xl mx-auto w-full">
          <div className="max-w-2xl text-white">
            <div className="text-[7rem] font-black opacity-10 font-heading leading-none select-none -mb-8">{cat.num}</div>
            <div className="mb-4">
              <div className="inline-flex items-center gap-3 bg-white/15 backdrop-blur-sm rounded-2xl px-5 py-3 border border-white/20">
                <Icon className="h-7 w-7" aria-hidden="true" />
                <h2 id={`${cat.id}-heading`} className="text-2xl md:text-3xl font-bold font-heading">{cat.name}</h2>
              </div>
            </div>
            <p className="text-white/85 text-lg mb-5 leading-relaxed">{cat.description}</p>
            <span className="inline-block bg-white/20 border border-white/30 text-white rounded-full px-4 py-1.5 text-sm font-bold">
              {cat.services.length} service{cat.services.length !== 1 ? "s" : ""} available
            </span>
          </div>
        </div>
      </div>

      {/* Mute toggle */}
      <button
        type="button"
        onClick={toggle}
        aria-label={muted ? "Unmute video" : "Mute video"}
        className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-sm px-3 py-1.5 text-white text-xs font-medium hover:bg-black/80 transition-colors"
      >
        {muted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
        {muted ? "Sound Off" : "Sound On"}
      </button>
    </div>
  );
}
