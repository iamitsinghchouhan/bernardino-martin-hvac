import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { COMPANY_NAME, COMPANY_FULL, COMPANY_PHONE } from "@/lib/constants";
import { CheckCircle, ShieldCheck, Home, MapPin } from "lucide-react";

/* ─── Scroll-triggered video hook ─── */
function useScrollVideo(ref: React.RefObject<HTMLVideoElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
}

/* ─── Service Row ─── */
interface ServiceRowProps {
  video: string;
  title: string;
  description: string;
  bullets: string[];
  reverse?: boolean;
}

function ServiceRow({ video, title, description, bullets, reverse }: ServiceRowProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  useScrollVideo(videoRef);

  const videoBlock = (
    <div className="w-full rounded-2xl overflow-hidden shadow-lg bg-slate-900 aspect-video">
      <video
        ref={videoRef}
        src={video}
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
      />
    </div>
  );

  const textBlock = (
    <div className="flex flex-col justify-center space-y-4">
      <h3 className="text-2xl font-bold text-slate-900">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
      <ul className="space-y-2">
        {bullets.map((b) => (
          <li key={b} className="flex items-center gap-2 text-slate-700">
            <CheckCircle className="text-green-500 shrink-0" size={18} />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-10 items-center py-12 border-b border-slate-100 last:border-0`}>
      {reverse ? (
        <>
          {textBlock}
          {videoBlock}
        </>
      ) : (
        <>
          {videoBlock}
          {textBlock}
        </>
      )}
    </div>
  );
}

/* ─── Trust Badge ─── */
function TrustBadge({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-2">
      <ShieldCheck className="text-blue-600" size={16} />
      <span className="text-blue-800 font-medium text-sm">{label}</span>
    </div>
  );
}

/* ─── Trust Card ─── */
interface TrustCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function TrustCard({ icon, title, description }: TrustCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col gap-3">
      <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
        {icon}
      </div>
      <h3 className="font-bold text-lg text-slate-900">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

/* ─── Page ─── */
export default function About() {
  const cities = [
    "Los Angeles", "Burbank", "Glendale", "Pasadena", "San Fernando Valley",
    "Santa Monica", "Hollywood", "North Hollywood", "Van Nuys", "Chatsworth",
    "Northridge", "Reseda", "Canoga Park", "Woodland Hills", "Calabasas",
    "Sherman Oaks", "Studio City", "Encino", "Tarzana", "West Hills",
  ];

  const services = [
    {
      video: "/videos/svc-hvac.mp4",
      title: "HVAC & Heating",
      description:
        "We install, repair, and maintain all heating and cooling systems including AC units, ductless mini-splits, furnaces, heat pumps, duct systems, and thermostats.",
      bullets: [
        "AC Repair & Installation",
        "Heating Systems",
        "Duct Cleaning & Installation",
        "Thermostat Services",
        "HVAC Maintenance",
      ],
    },
    {
      video: "/videos/svc-solar.mp4",
      title: "Solar & Energy",
      description:
        "We design and install complete solar energy systems for residential properties in Los Angeles. Reduce your energy bills and increase your home's value.",
      bullets: [
        "Solar Panel Installation",
        "Solar System Maintenance",
        "Solar Irrigation Systems",
        "Energy Efficiency Consulting",
      ],
    },
    {
      video: "/videos/svc-plumbing.mp4",
      title: "Plumbing",
      description:
        "Full range of residential plumbing services including pipe installations, fixture upgrades, leak repairs, water filtration, reverse osmosis, soft water. SMART AUTOMATIC JET CLEANUP system and SMART SHUTOFF VALVE.",
      bullets: [
        "Pipe Installation & Repair",
        "Water Filtration & Reverse Osmosis",
        "Smart Shutoff Valve",
        "Jet Cleanup System",
        "Fixture Upgrades",
      ],
    },
    {
      video: "/videos/svc-electrical.mp4",
      title: "Electrical",
      description:
        "Our licensed electricians handle everything from panel upgrades to full home wiring. We ensure your home's electrical system is safe, up to code, and ready for modern demands.",
      bullets: [
        "Electrical Panel Installation & Repair",
        "Home Wiring",
        "Safety Inspections",
        "Smart Home Electrical",
      ],
    },
    {
      video: "/videos/svc-landscaping.mp4",
      title: "Outdoor & Landscaping",
      description:
        "We transform outdoor spaces with professional landscaping, sod installation, planting, and irrigation. We install San Augustine and RTF sod varieties.",
      bullets: [
        "Landscaping Design",
        "Sod Installation (San Augustine & RTF)",
        "Smart Irrigation Systems",
        "Planting & Garden Care",
      ],
    },
    {
      video: "/videos/svc-irrigation.mp4",
      title: "Smart Irrigation",
      description:
        "Our electronic irrigation systems are fully controllable via smartphone. Smart valve reduces water damage risk and can reduce home insurance up to 40%.",
      bullets: [
        "App-Controlled Irrigation",
        "Solar Panel Irrigation",
        "Insurance Savings Up to 40%",
        "Smart Valve Installation",
      ],
    },
    {
      video: "/videos/svc-network.mp4",
      title: "Network & Technology",
      description:
        "We install structured network infrastructure for homes and businesses including fiber internet, smart home connectivity, router setup, and control panel installation.",
      bullets: [
        "Structured Network Cabling",
        "Internet & Fiber Installation",
        "Smart Home Connectivity",
        "Router & Panel Setup",
      ],
    },
  ];

  return (
    <Layout>
      <SEO
        title="About Us – Trusted HVAC & Solar Contractors in Los Angeles"
        description={`${COMPANY_FULL} — Licensed, bonded & insured HVAC and solar contractors serving Los Angeles. Learn why homeowners trust us for heating, cooling, solar & plumbing services.`}
      />

      {/* ── Section 1: Hero ── */}
      <section className="relative min-h-[520px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700">
        <div className="absolute inset-0 bg-blue-950/40" />
        <div className="relative z-10 text-center px-4 py-20 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-3">
            {COMPANY_NAME}
          </h1>
          <p className="text-xl md:text-2xl text-blue-200 font-medium mb-4">
            Heating • Air Conditioning • Solar
          </p>
          <p className="text-lg text-blue-100 mb-10">
            Los Angeles' trusted home services contractor since day one
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking">
              <Button size="lg" className="bg-white text-blue-800 hover:bg-blue-50 font-bold px-8">
                Book a Service
              </Button>
            </Link>
            <Link href="/quote">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-bold px-8">
                Get a Free Quote
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Section 2: Company Story ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-5">
              <h2 className="text-3xl font-bold text-slate-900">Who We Are</h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                BERNARDINO MARTIN is a family-owned home services company proudly serving the greater Los Angeles
                area. We started with a passion for keeping homes comfortable, safe, and energy-efficient. Over the years
                we have grown into a full-service contractor offering HVAC, solar, plumbing, electrical, landscaping,
                irrigation, and smart technology services — all under one roof. We believe every homeowner deserves
                reliable, honest, and professional service at a fair price.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/images/happy-family-tech.webp"
                alt="Happy family with BERNARDINO MARTIN technician"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 3: Meet the Owner ── */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="rounded-2xl overflow-hidden shadow-xl order-2 md:order-1">
              <img
                src="/images/technician.webp"
                alt="Bernardino Martin, founder and lead technician"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-5 order-1 md:order-2">
              <h2 className="text-3xl font-bold text-slate-900">Meet Bernardino Martin</h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                Bernardino Martin is the founder and lead technician of the company. With decades of hands-on experience
                in HVAC, solar installation, and home services across Los Angeles, Bernardino built this company on the
                values of integrity, quality workmanship, and customer satisfaction. He personally oversees every project
                to make sure it meets the highest standards. When you call BERNARDINO MARTIN, you are getting the
                owner's commitment on every job.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <TrustBadge label="Licensed & Insured" />
                <TrustBadge label="Family Owned" />
                <TrustBadge label="Serving LA Since Day One" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 4: Services with Videos ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">What We Do</h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto">
              From heating and cooling to solar and smart home technology — we handle it all.
            </p>
          </div>
          {services.map((svc, i) => (
            <ServiceRow
              key={svc.title}
              video={svc.video}
              title={svc.title}
              description={svc.description}
              bullets={svc.bullets}
              reverse={i % 2 !== 0}
            />
          ))}
        </div>
      </section>

      {/* ── Section 5: Why Choose Us ── */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Why Choose Us</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <TrustCard
              icon={<ShieldCheck size={24} />}
              title="Licensed & Insured"
              description="Full licensing verified at every booking"
            />
            <TrustCard
              icon={<Home size={24} />}
              title="Family Owned"
              description="Bernardino personally oversees every job"
            />
            <TrustCard
              icon={<CheckCircle size={24} />}
              title="All-In-One Contractor"
              description="23 services across 6 categories"
            />
            <TrustCard
              icon={<MapPin size={24} />}
              title="Serving All of LA"
              description="We cover the entire greater Los Angeles area"
            />
          </div>
        </div>
      </section>

      {/* ── Section 6: Service Areas ── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Proudly Serving Los Angeles</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            <div>
              <ul className="grid grid-cols-2 gap-2">
                {cities.map((city) => (
                  <li key={city} className="flex items-center gap-2 text-slate-700">
                    <MapPin className="text-blue-500 shrink-0" size={16} />
                    <span>{city}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-blue-700 text-white rounded-2xl p-8 space-y-4">
              <h3 className="text-xl font-bold">Your Neighborhood, Our Priority</h3>
              <p className="text-blue-100 leading-relaxed">
                We serve homeowners and businesses across the greater Los Angeles area. From the San Fernando Valley to
                downtown LA, our team is ready to come to you. Call us at{" "}
                <a href="tel:+18184000227" className="underline font-semibold text-white">
                  {COMPANY_PHONE}
                </a>{" "}
                or book online.
              </p>
              <Link href="/booking">
                <Button className="bg-white text-blue-800 hover:bg-blue-50 font-bold mt-2">
                  Book Online
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 7: CTA Footer Banner ── */}
      <section className="bg-blue-700 py-16">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-blue-100 text-lg mb-8">
            Call us at {COMPANY_PHONE} or book your service online today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+18184000227">
              <Button size="lg" className="bg-white text-blue-800 hover:bg-blue-50 font-bold px-8">
                Call Now
              </Button>
            </a>
            <Link href="/booking">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-bold px-8">
                Book Online
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
