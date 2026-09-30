/** Shared AOS stagger timing, so entrance-animation delays are defined once instead of hand-tuned
    per section. Reuses the same 0/100/150/200ms cadence already used ad hoc throughout
    city-page-template.tsx — this just gives it one name so new sections stay consistent with it
    rather than picking a slightly different number each time. */
export const STAGGER = {
  first: undefined,
  second: "100",
  third: "150",
  fourth: "200",
} as const;
