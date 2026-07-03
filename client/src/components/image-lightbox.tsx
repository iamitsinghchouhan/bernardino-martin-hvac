import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export interface LightboxImage {
  src: string;
  alt: string;
}

interface ImageLightboxProps {
  images: LightboxImage[];
  initialIndex?: number;
  onClose: () => void;
}

export function ImageLightbox({ images, initialIndex = 0, onClose }: ImageLightboxProps) {
  const [idx, setIdx] = useState(initialIndex);
  const total = images.length;
  const current = images[Math.min(idx, total - 1)];

  useEffect(() => {
    const saved = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = saved; };
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") setIdx((i) => Math.max(0, i - 1));
      else if (e.key === "ArrowRight") setIdx((i) => Math.min(total - 1, i + 1));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [total, onClose]);

  if (!current) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95"
      onClick={onClose}
    >
      <button
        type="button"
        aria-label="Close fullscreen"
        onClick={onClose}
        className="absolute top-4 right-4 z-10 rounded-full bg-white/15 p-2.5 text-white hover:bg-white/30 transition-colors"
      >
        <X className="h-5 w-5" />
      </button>

      {idx > 0 && (
        <button
          type="button"
          aria-label="Previous image"
          onClick={(e) => { e.stopPropagation(); setIdx((i) => i - 1); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/15 p-3 text-white hover:bg-white/30 transition-colors"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      )}

      {idx < total - 1 && (
        <button
          type="button"
          aria-label="Next image"
          onClick={(e) => { e.stopPropagation(); setIdx((i) => i + 1); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/15 p-3 text-white hover:bg-white/30 transition-colors"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      )}

      <img
        key={current.src}
        src={current.src}
        alt={current.alt}
        className="max-h-[90vh] max-w-[90vw] rounded-xl object-contain shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />

      {total > 1 && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-4 py-1.5 text-sm font-semibold text-white/80 select-none">
          {idx + 1} / {total}
        </div>
      )}
    </div>,
    document.body,
  );
}
