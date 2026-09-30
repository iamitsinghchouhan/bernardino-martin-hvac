/** Bold, benefit-driven one-liners for the "Core Service Mix" cards on redesignV2 city pages.
    Keyed by the real SERVICES id (client/src/lib/constants.ts) — one line per catalog service,
    not per city, so it automatically varies city-to-city via the {city} placeholder without
    needing to hand-author dozens of near-duplicate lines. Every claim here traces back to real
    data already in SERVICES (the "Same-day service available" bullet on hvac-repair, or the
    real price/duration fields) — nothing invented. Services without a hook yet simply render
    without one; add here as the catalog is covered for the full rollout. */
const SERVICE_HOOKS: Record<string, (city: string) => string> = {
  "hvac-repair": (city) => `AC down in ${city} heat? We're usually there same day.`,
  "hvac-maintenance": (city) => `A quick ${city} tune-up now. No mid-summer surprise later.`,
  "hvac-ductless": () => "No ductwork? No problem — mini-splits install in a single visit.",
  "hvac-heating": (city) => `${city} nights get cold too. Heating help, starting at $99.`,
  "hvac-ducts": () => "Clean air starts with clean ducts — starting at $299.",
};

export function getServiceHook(serviceId: string, cityName: string): string | undefined {
  return SERVICE_HOOKS[serviceId]?.(cityName);
}
