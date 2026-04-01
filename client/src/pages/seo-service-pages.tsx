import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

type PageDescriptor = {
  route: string;
  title: string;
  serviceName: string;
  keyword: string;
  shortDescription: string;
  features: string[];
};

const SERVICE_PAGES: PageDescriptor[] = [
  {
    route: "/hvac-los-angeles",
    title: "HVAC Services Los Angeles",
    serviceName: "HVAC",
    keyword: "HVAC Los Angeles",
    shortDescription:
      "Expert HVAC repair, installation, and maintenance for Los Angeles homes and businesses.",
    features: [
      "AC repair",
      "Heating system service",
      "Duct cleaning",
      "Thermostat upgrades",
      "Emergency HVAC response",
    ],
  },
  {
    route: "/solar-installation-los-angeles",
    title: "Solar Installation Los Angeles",
    serviceName: "Solar installation",
    keyword: "Solar Installation Los Angeles",
    shortDescription:
      "Full solar panel design, install, and maintenance for Los Angeles properties.",
    features: [
      "Solar design",
      "PV panel install",
      "Battery backup",
      "Solar maintenance",
      "Net metering support",
    ],
  },
  {
    route: "/plumbing-los-angeles",
    title: "Plumbing Services Los Angeles",
    serviceName: "Plumbing",
    keyword: "Plumbing Los Angeles",
    shortDescription:
      "Trusted plumbing repair, drain cleaning, and leak detection in Los Angeles.",
    features: [
      "Leak repair",
      "Pipe replacement",
      "Drain cleaning",
      "Water heater service",
      "Emergency plumbing",
    ],
  },
  {
    route: "/electrical-services-los-angeles",
    title: "Electrical Services Los Angeles",
    serviceName: "Electrical",
    keyword: "Electrical Services Los Angeles",
    shortDescription:
      "Licensed electrical upgrades, panel service, and outlet repair across Los Angeles.",
    features: [
      "Panel upgrades",
      "Rewiring",
      "Lighting upgrades",
      "Outlet installation",
      "Code compliance",
    ],
  },
  {
    route: "/landscaping-los-angeles",
    title: "Landscaping Services Los Angeles",
    serviceName: "Landscaping",
    keyword: "Landscaping Los Angeles",
    shortDescription:
      "Full property landscaping and maintenance services for Los Angeles homeowners.",
    features: [
      "Design and installation",
      "Maintenance",
      "Irrigation",
      "Sod and planting",
      "Hardscape support",
    ],
  },
  {
    route: "/irrigation-los-angeles",
    title: "Irrigation Services Los Angeles",
    serviceName: "Irrigation",
    keyword: "Irrigation Los Angeles",
    shortDescription:
      "Automated irrigation, drip systems, and repair in Los Angeles.",
    features: [
      "System design",
      "Repair",
      "Winterization",
      "Smart controllers",
      "Water conservation",
    ],
  },
  {
    route: "/network-installation-los-angeles",
    title: "Network Installation Los Angeles",
    serviceName: "Network installation",
    keyword: "Network Installation Los Angeles",
    shortDescription:
      "Structured cabling, WiFi optimization, and network security for Los Angeles homes and shops.",
    features: [
      "Ethernet wiring",
      "WiFi design",
      "Network switching",
      "Smart home integration",
      "Security camera wiring",
    ],
  },
];

function ServicePage({ page }: { page: PageDescriptor }) {
  const { title, serviceName, keyword, shortDescription, features } = page;

  const contentParagraphs = [
    `Bernardino Martin delivers trusted ${serviceName.toLowerCase()} service in Los Angeles for homeowners and businesses. Our team of licensed technicians works across Beverly Hills, Burbank, Glendale, Pasadena, and all San Fernando Valley neighborhoods. When reliability, safety, and quick response matter most, local customers choose us for same-day resolution and transparent pricing. This page is built for ${keyword} keywords while providing value-rich content to site visitors and search engines, so you get better visibility and relevance for local search queries.`,
    `Our ${serviceName.toLowerCase()} technicians are trained to address every common and complex issue. We start each job with a comprehensive inspection, verifying equipment condition, safety, and efficiency. Work includes system performance testing, component diagnosis, and tailored recommendations. This proactive care avoids breakdowns, improves comfort, and saves money on utility bills. With clear communication and preventive advice, our Los Angeles ${serviceName} customers gain long-term peace of mind.`,
    `Across 2025, we continue to expand our Los Angeles service capacity with modern tools, diagnostic software, and industry best practices. That means fast appointments on urgent calls without sacrificing quality. We offer flexible scheduling, evening/weekend hours, and 24/7 emergency availability. Whether it’s a Leaky faucet or a design/build solar project, our team handles the entire process end-to-end, including permits and inspection support.`,
    `Customer satisfaction is central to how we operate. Every completed ${serviceName.toLowerCase()} project includes a photo report, before-and-after summary, and easy online invoice. Our Los Angeles clients leave high ratings for responsiveness and professionalism. We also keep you informed on available rebates, incentives, and energy efficiency upgrades now benefiting your home or business in the local climate.`,
    `Our service list for ${serviceName.toLowerCase()} in Los Angeles includes the following core offerings: ${features.join(", ")}. These key capabilities are paired with clear communications and competitive quotes so you know both timeline and cost before work starts. Click the Request a Service button below for a free estimate, or call us directly for emergency dispatch.`,
    `Continuity of care is important. After initial service, we provide follow-up checks and maintenance reminders. Signing up for our service plan ensures preferred scheduling, priority response, and reduced seasonal costs. Homeowners and small business property managers throughout Los Angeles trust Bernardino Martin for smart, sustainable ${serviceName.toLowerCase()} solutions that protect property value and reduce downtime.`,
    `If you're researching ${serviceName.toLowerCase()} contractors in Los Angeles, compare our transparent warranties, licensed status, and local footprint. We maintain all necessary insurance and adhere to California code updates. Our installations are wired to last, and our repairs are backed by customer-first service so you can proceed with confidence.`,
    `Ready to move forward? Contact us through our online contact form, call (818) 400-0227, or schedule your appointment now. All service pages link internally to our main services, about us, and service area map pages so you can discover expanded offerings swiftly.`,
  ];

  return (
    <Layout>
      <SEO
        title={`${serviceName} Services in Los Angeles`}
        description={`${shortDescription} Call (818) 400-0227 for emergency service.`}
      />

      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">{keyword}</h1>
        <p className="mb-6 text-lg text-slate-600">{shortDescription}</p>

        {contentParagraphs.map((paragraph, index) => (
          <p key={index} className="mb-5 text-slate-700 leading-relaxed">
            {paragraph}
          </p>
        ))}

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our {serviceName} Services in Los Angeles</h2>
          <ul className="list-disc list-inside space-y-2 text-slate-700">
            {features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </section>

        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Link className="text-primary underline" href="/services">Full Service Catalog</Link>
          <Link className="text-primary underline" href="/service-areas">Service Areas Map</Link>
          <Link className="text-primary underline" href="/contact">Contact and Support</Link>
        </div>

        <div className="flex gap-3 flex-wrap">
          <Button asChild className="bg-primary hover:bg-primary/90" size="lg">
            <Link href="/booking">Request Service Now</Link>
          </Button>
          <Button asChild variant="outline" className="border-secondary text-secondary" size="lg">
            <Link href="/contact">Talk to an Expert</Link>
          </Button>
        </div>
      </main>
    </Layout>
  );
}

export function HVACLosAngeles() {
  return <ServicePage page={SERVICE_PAGES[0]} />;
}

export function SolarInstallationLosAngeles() {
  return <ServicePage page={SERVICE_PAGES[1]} />;
}

export function PlumbingLosAngeles() {
  return <ServicePage page={SERVICE_PAGES[2]} />;
}

export function ElectricalServicesLosAngeles() {
  return <ServicePage page={SERVICE_PAGES[3]} />;
}

export function LandscapingLosAngeles() {
  return <ServicePage page={SERVICE_PAGES[4]} />;
}

export function IrrigationLosAngeles() {
  return <ServicePage page={SERVICE_PAGES[5]} />;
}

export function NetworkInstallationLosAngeles() {
  return <ServicePage page={SERVICE_PAGES[6]} />;
}
