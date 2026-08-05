import { useState } from "react";
import { ImageOff } from "lucide-react";

export function getImageFallbacks(src: string) {
  const sources = [src];
  if (src.endsWith(".webp")) {
    sources.push(src.replace(/\.webp$/, ".png"), src.replace(/\.webp$/, ".jpg"));
  } else if (src.endsWith(".png")) {
    sources.push(src.replace(/\.png$/, ".webp"), src.replace(/\.png$/, ".jpg"));
  } else if (src.endsWith(".jpg")) {
    sources.push(src.replace(/\.jpg$/, ".webp"), src.replace(/\.jpg$/, ".png"));
  }
  return Array.from(new Set(sources));
}

export function AdaptiveImage({ src, alt, className, imgClassName, width, height, priority = false }: {
  src: string; alt: string; className?: string; imgClassName?: string;
  width?: number; height?: number; priority?: boolean;
}) {
  const fallbacks = getImageFallbacks(src);
  const [index, setIndex] = useState(0);
  const currentSrc = fallbacks[index];
  return (
    <div className={className}>
      {currentSrc ? (
        <img src={currentSrc} alt={alt} className={imgClassName} loading={priority ? "eager" : "lazy"} decoding="async"
          fetchPriority={priority ? "high" : "auto"} width={width} height={height}
          onError={() => setIndex((i) => Math.min(i + 1, fallbacks.length))} />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-400">
          <ImageOff className="h-8 w-8" />
        </div>
      )}
    </div>
  );
}
