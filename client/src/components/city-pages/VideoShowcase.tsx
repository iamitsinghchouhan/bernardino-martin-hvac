import { useRef, useState } from "react";

/** "See {city} Jobs in Action" — one autoplaying video plus a thumbnail strip. Only rendered by
    the caller once a real, city-specific video asset exists — never a placeholder. */
type VideoThumb = {
  label: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
};

type VideoShowcaseProps = {
  cityName: string;
  videoSrc: string;
  posterSrc: string;
  thumbs: VideoThumb[];
};

export function VideoShowcase({ cityName, videoSrc, posterSrc, thumbs }: VideoShowcaseProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    videoRef.current?.play();
    setPlaying(true);
  };

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="mb-8">
          <h2 className="font-heading text-2xl font-bold text-primary md:text-[30px]">
            See {cityName} Jobs in Action
          </h2>
          <p className="mt-2 text-[15px] text-muted-foreground">
            Real installs, real technicians, real neighborhoods.
          </p>
        </div>

        <div className="relative mb-5 aspect-video overflow-hidden rounded-2xl">
          <video
            ref={videoRef}
            src={videoSrc}
            poster={posterSrc}
            muted
            loop
            playsInline
            preload="metadata"
            className="h-full w-full object-cover"
          />
          {!playing && (
            <button
              type="button"
              onClick={handlePlay}
              aria-label="Play video"
              className="absolute inset-0 flex items-center justify-center bg-black/10"
            >
              <span className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-white/95 text-2xl text-primary shadow-lg">
                ▶
              </span>
            </button>
          )}
        </div>

        {thumbs.length > 0 && (
          <div className="grid grid-cols-2 gap-3.5 md:grid-cols-4">
            {thumbs.map((thumb) => (
              <a
                key={thumb.label}
                href={thumb.href}
                className="group relative block aspect-square overflow-hidden rounded-xl"
              >
                <img src={thumb.imageSrc} alt={thumb.imageAlt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute bottom-2 left-2 right-2 text-[11px] font-bold text-white drop-shadow">
                  {thumb.label}
                </span>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
