/** The second full-width image break lower on the page. Uses a DIFFERENT real photo than the
    hero (the landmark photo) and a different CTA angle — e.g. Comfort Club — not a repeat of
    the hero's message. */
type SecondHeroBannerProps = {
  imageSrc: string;
  imageAlt: string;
  heading: string;
  body: string;
  ctaLabel: string;
  onCtaClick: () => void;
};

export function SecondHeroBanner({ imageSrc, imageAlt, heading, body, ctaLabel, onCtaClick }: SecondHeroBannerProps) {
  return (
    <section className="relative flex min-h-[360px] items-center text-white">
      <img src={imageSrc} alt={imageAlt} className="absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async" />
      {/* No darkening scrim on the photo itself, per request — legibility comes from
          text-shadow-hero on the copy instead. */}
      <div className="relative mx-auto w-full max-w-6xl px-6 py-14 text-shadow-hero md:px-8">
        <h2 className="max-w-md font-heading text-[28px] font-bold md:text-[34px]">{heading}</h2>
        <p className="mt-3 max-w-md text-white/90">{body}</p>
        <button
          type="button"
          onClick={onCtaClick}
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[var(--rb-orange-dark)] px-6 py-3 text-sm font-bold text-white transition hover:brightness-95"
        >
          {ctaLabel} →
        </button>
      </div>
    </section>
  );
}
