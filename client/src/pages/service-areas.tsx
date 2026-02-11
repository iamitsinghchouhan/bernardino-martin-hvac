import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { CITIES } from "@/lib/constants";
import { MapPin } from "lucide-react";
import { Link } from "wouter";

export default function ServiceAreas() {
  return (
    <Layout>
      <SEO title="Service Areas" description="We serve Los Angeles and surrounding areas with professional HVAC and Solar services." />
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-heading font-bold mb-6 text-center">Service Areas</h1>
        <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
          We proudly serve the greater Los Angeles area. Find your city below to learn more about our local services.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {CITIES.map((city) => (
            <Link key={city} href={`/service-areas/${city.toLowerCase().replace(/\s+/g, '-')}`}>
              <a className="flex items-center gap-2 p-4 bg-white border rounded-lg hover:border-primary hover:shadow-md transition-all group">
                <MapPin className="h-5 w-5 text-slate-400 group-hover:text-primary transition-colors" />
                <span className="font-medium text-slate-700 group-hover:text-slate-900">{city}</span>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
