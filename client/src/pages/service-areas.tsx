import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { CITIES } from "@/lib/constants";
import { MapPin } from "lucide-react";
import { Link } from "wouter";
import { lazy, Suspense } from "react";

const ServiceAreasMap = lazy(() => import("@/components/service-areas-map").then(m => ({ default: m.ServiceAreasMap })));

export default function ServiceAreas() {
  return (
    <Layout>
      <SEO title="HVAC & Solar Service Areas – Los Angeles, Pasadena & Beyond" description="Serving Los Angeles, Santa Monica, Pasadena, Beverly Hills & surrounding cities with professional HVAC repair, solar installation & plumbing. Call for same-day service." />
      
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{backgroundImage: "url('/images/hero-home.webp')", backgroundSize: "cover", backgroundPosition: "center"}}></div>
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-slate-300 to-white">
            Our Service Areas
          </h1>
          <p className="text-lg md:text-xl text-slate-300">
            Providing top-rated HVAC, Solar, and Plumbing solutions across Greater Los Angeles.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-20">
        {/* Real Interactive Map - Lazy loaded */}
        <Suspense fallback={
          <div className="mb-20 relative w-full max-w-5xl mx-auto h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-slate-100 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        }>
          <ServiceAreasMap />
        </Suspense>

        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-heading font-bold mb-8 text-center">Cities We Serve</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {CITIES.map((city) => (
              <Link key={city} href={`/booking?service=ac-repair`} className="flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-xl hover:border-primary hover:shadow-lg hover:-translate-y-1 transition-all group">
                  <div className="bg-primary/5 p-2 rounded-lg group-hover:bg-primary transition-colors">
                    <MapPin className="h-4 w-4 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <span className="font-semibold text-slate-700 group-hover:text-slate-900">{city}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
