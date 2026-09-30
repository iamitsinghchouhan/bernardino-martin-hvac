type Technician = {
  name: string;
  role: string;
  photo: string;
  yearsExperience?: number;
};

type CityTeamSectionProps = {
  cityName: string;
  technicians: Technician[];
};

/** Real technician/team section, per the doc's explicit instruction: "do not use stock photos of
    generic people in uniforms." No real technician photos or names exist in the codebase yet, so
    nothing calls this component with data today — it renders nothing if given an empty list
    (same render-nothing-rather-than-fake pattern as the city gallery-photo strip), and is ready
    to wire into city-page-template.tsx the moment real photos are provided (Phase 8). */
export function CityTeamSection({ cityName, technicians }: CityTeamSectionProps) {
  if (technicians.length === 0) return null;

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          <div className="max-w-2xl" data-aos="fade-up">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Meet The Team</p>
            <h2 className="text-display mt-3 text-3xl text-slate-950 md:text-4xl">
              Who Shows Up in {cityName}
            </h2>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {technicians.map((tech) => (
              <div
                key={tech.name}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                data-aos="fade-up"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={tech.photo}
                    alt={`${tech.name}, ${tech.role} at Bernardino Martin`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <p className="text-lg font-bold text-slate-900">{tech.name}</p>
                  <p className="text-sm text-slate-600">{tech.role}</p>
                  {tech.yearsExperience && (
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.1em] text-primary">
                      {tech.yearsExperience}+ Years Experience
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
