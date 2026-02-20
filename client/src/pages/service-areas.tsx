import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { CITIES } from "@/lib/constants";
import { MapPin, Navigation } from "lucide-react";
import { Link } from "wouter";

export default function ServiceAreas() {
  return (
    <Layout>
      <SEO title="Service Areas" description="We serve Los Angeles and surrounding areas with professional HVAC and Solar services." />
      
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{backgroundImage: "url('/images/hero-home.png')", backgroundSize: "cover", backgroundPosition: "center"}}></div>
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-100 to-white">
            Our Service Areas
          </h1>
          <p className="text-lg md:text-xl text-slate-300">
            Providing top-rated HVAC, Solar, and Plumbing solutions across Greater Los Angeles.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-20">
        {/* Minimalist Smart-Scaling Labeled Map */}
        <div className="mb-20 relative w-full max-w-5xl mx-auto h-[400px] md:h-[500px] bg-slate-50 rounded-3xl overflow-hidden shadow-inner border border-slate-200 flex flex-col items-center justify-center">
            <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: "radial-gradient(#0f172a 1px, transparent 1px)", backgroundSize: "24px 24px" }}></div>
            
            {/* Map UI Element */}
            <div className="relative z-10 w-full h-full flex items-center justify-center p-4 md:p-8">
               <div className="relative w-full max-w-3xl aspect-[16/9] bg-white/60 backdrop-blur-md rounded-2xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6">
                 
                 {/* Map markers representation */}
                 {CITIES.map((city, i) => (
                    <div key={city} className="absolute flex flex-col items-center gap-1.5 transition-transform hover:scale-110 hover:z-20 cursor-pointer" style={{ 
                        top: `${15 + Math.random() * 70}%`, 
                        left: `${10 + Math.random() * 80}%`,
                        zIndex: 10
                    }}>
                        <div className="relative">
                          <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping"></div>
                          <div className="relative h-3.5 w-3.5 rounded-full bg-primary shadow-[0_0_15px_rgba(37,99,235,0.6)] border-2 border-white"></div>
                        </div>
                        <span className="text-[10px] md:text-xs font-bold text-slate-800 bg-white/95 px-2 py-1 rounded-md shadow-sm whitespace-nowrap border border-slate-100">{city}</span>
                    </div>
                 ))}
                 
                 {/* Center Graphic */}
                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-50">
                    <div className="flex flex-col items-center text-slate-300">
                      <Navigation className="h-16 w-16 mb-2" />
                      <span className="text-3xl md:text-5xl font-black font-heading uppercase tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-br from-slate-200 to-slate-400">LOS ANGELES</span>
                    </div>
                 </div>
               </div>
            </div>
            
            <div className="absolute bottom-4 left-4 right-4 text-center text-xs text-slate-500 font-medium bg-white/80 backdrop-blur px-4 py-2 rounded-lg">
               Smart-Scaling Coverage Map • Real-time Service Dispatch
            </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-heading font-bold mb-8 text-center">Cities We Serve</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {CITIES.map((city) => (
              <Link key={city} href={`/booking?service=ac-repair`}>
                <a className="flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-xl hover:border-primary hover:shadow-lg hover:-translate-y-1 transition-all group">
                  <div className="bg-blue-50 p-2 rounded-lg group-hover:bg-primary transition-colors">
                    <MapPin className="h-4 w-4 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <span className="font-semibold text-slate-700 group-hover:text-slate-900">{city}</span>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
