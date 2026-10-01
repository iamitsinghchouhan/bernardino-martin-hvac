import { AnimatedCounter } from "@/components/city-pages/AnimatedCounter";

/** Full-width band with real, count-up stats. Every stat passed in must be a real, verifiable
    number (review count, response time) — never invent a figure to fill a column. */
type Stat = {
  /** Numeric value to count up to, if this stat is a number (e.g. review count) */
  value?: number;
  /** Use instead of `value` for a non-numeric real stat, e.g. "25–45 min" */
  staticValue?: string;
  label: string;
};

type StatBlockProps = {
  heading: string;
  subheading: string;
  stats: Stat[];
};

export function StatBlock({ heading, subheading, stats }: StatBlockProps) {
  return (
    <section className="bg-primary py-16 text-white md:py-20">
      <div className="mx-auto max-w-6xl px-6 text-center md:px-8">
        <h2 className="font-heading text-2xl font-bold md:text-[30px]">{heading}</h2>
        <p className="mt-2 text-[15px] text-white/75">{subheading}</p>

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="font-heading text-[46px] font-extrabold text-secondary">
                {stat.value !== undefined ? <AnimatedCounter value={stat.value} /> : stat.staticValue}
              </div>
              <div className="mt-1.5 text-sm text-white/75">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
