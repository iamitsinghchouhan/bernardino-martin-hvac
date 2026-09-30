import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SERVICES } from "@/lib/constants";
import { trackEvent } from "@/hooks/use-analytics";

type CityQuickQuoteWidgetProps = {
  cityName: string;
  /** cityData.commonServices — titles matched against SERVICES, same lookup CityServicesShowcase
      already uses. Falls back to the full catalog if none resolve. */
  commonServices: string[];
  /** Pre-selects this SERVICES id when the widget is opened from a specific service card's
      "Book This" action, so the visitor doesn't have to re-pick what they already chose. */
  initialServiceId?: string;
  onSubmitted?: () => void;
};

/** Two fields plus a dropdown, not a long form. Submitting deep-links to the existing /booking
    flow pre-filled with these answers — POST /api/bookings requires fullName/email/phone/address/
    serviceId/serviceTitle/preferredDate (shared/schema.ts), so a true 3-field direct submit would
    need fake placeholder address/date values polluting real lead data. This keeps the backend
    untouched while still removing the friction of starting over on a blank form. */
export function CityQuickQuoteWidget({ cityName, commonServices, initialServiceId, onSubmitted }: CityQuickQuoteWidgetProps) {
  const [, navigate] = useLocation();
  const [serviceId, setServiceId] = useState(initialServiceId ?? "");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const cityOptions = commonServices
    .map((title) => SERVICES.find((s) => s.title === title))
    .filter((s): s is (typeof SERVICES)[number] => Boolean(s));
  const baseOptions = cityOptions.length > 0 ? cityOptions : SERVICES;

  // A pre-selected service (e.g. Comfort Club's "hvac-maintenance") must always be a real,
  // visible option — even for a city whose commonServices list doesn't happen to include it —
  // otherwise the Select shows a value with no matching item to display.
  const initialOption = initialServiceId ? SERVICES.find((s) => s.id === initialServiceId) : undefined;
  const serviceOptions =
    initialOption && !baseOptions.some((s) => s.id === initialOption.id)
      ? [initialOption, ...baseOptions]
      : baseOptions;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!serviceId || !name || !phone) return;

    trackEvent("quick_quote_submitted", cityName);
    const params = new URLSearchParams({ service: serviceId, city: cityName, name, phone });
    onSubmitted?.();
    navigate(`/booking?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <label className="text-xs font-bold uppercase tracking-[0.14em] text-slate-600">Service</label>
        <Select value={serviceId} onValueChange={setServiceId} required>
          <SelectTrigger aria-label="Select a service">
            <SelectValue placeholder={`What does ${cityName} need?`} />
          </SelectTrigger>
          <SelectContent>
            {serviceOptions.map((s) => (
              <SelectItem key={s.id} value={s.id}>
                {s.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-bold uppercase tracking-[0.14em] text-slate-600">Name</label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          required
          aria-label="Your name"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-bold uppercase tracking-[0.14em] text-slate-600">Phone</label>
        <Input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone number"
          required
          aria-label="Phone number"
        />
      </div>

      <Button type="submit" size="lg" className="w-full bg-primary font-bold hover:bg-primary/90">
        Get My Free Quote
      </Button>
    </form>
  );
}
