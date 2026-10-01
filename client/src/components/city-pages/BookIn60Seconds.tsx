/** The phone-in-hand "book fast" band that sits right under the trust strip, before a visitor
    has to decide whether to keep scrolling. Opens the same shared quick-quote widget/dialog
    already used throughout the city page — this component does not implement its own booking
    logic, it just triggers it. */
type BookIn60SecondsProps = {
  cityName: string;
  phone: string;
  phoneHref: string;
  onStartQuote: () => void;
};

const STEPS = ["Pick your service", "Enter your name & phone", "We call to confirm a time"];

export function BookIn60Seconds({ cityName, phone, phoneHref, onStartQuote }: BookIn60SecondsProps) {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-[1fr_1.3fr] md:px-8">
        <div className="relative mx-auto max-w-[220px]">
          <div
            aria-hidden="true"
            className="absolute bottom-[-18px] left-1/2 h-[60px] w-[160px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(240,112,42,0.22),transparent_70%)] blur-[2px]"
          />
          <div className="relative mx-auto h-[400px] w-[200px] rounded-[30px] bg-primary p-2.5 shadow-xl">
            <div className="flex h-full w-full flex-col items-center justify-center gap-2.5 rounded-[22px] bg-gradient-to-br from-[#eef1ff] to-[#dde2fb] p-4 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-2xl text-white">
                ✓
              </div>
              <p className="font-heading text-sm font-bold text-primary">Quote Sent!</p>
              <p className="text-[10.5px] text-muted-foreground">
                A {cityName} tech will call you shortly
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-heading text-2xl font-bold text-primary md:text-[28px]">
            Book {cityName} HVAC Service in 60 Seconds
          </h2>
          <p className="mt-3 max-w-md text-[15px] text-muted-foreground">
            No phone tag, no waiting on hold — tell us what's wrong and we'll call you
            back with a real appointment window.
          </p>

          <ol className="my-6 flex flex-col gap-3">
            {STEPS.map((step, i) => (
              <li key={step} className="flex items-center gap-3 text-[14.5px] font-semibold">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary text-[13px] font-extrabold text-white">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>

          <button
            type="button"
            onClick={onStartQuote}
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--rb-orange)] px-6 py-3 text-sm font-bold text-white transition hover:brightness-95"
          >
            Start My Quote →
          </button>
          <p className="mt-2.5 text-xs text-muted-foreground">
            Or call{" "}
            <a href={phoneHref} className="font-bold text-primary">
              {phone}
            </a>{" "}
            — we're open 7AM–8PM daily.
          </p>
        </div>
      </div>
    </section>
  );
}
