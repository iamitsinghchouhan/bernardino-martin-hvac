import type { LucideIcon } from "lucide-react";
import {
  Droplets,
  Fan,
  Flame,
  Flower2,
  Plug,
  Settings,
  ShieldCheck,
  Sprout,
  Sun,
  Thermometer,
  TreePine,
  Wifi,
  Wind,
  Wrench,
  Zap,
} from "lucide-react";

export const COMPANY_PHONE = "(818) 400-0227";
export const COMPANY_NAME = "BERNARDINO MARTIN";
export const COMPANY_TAGLINE = "Heating, Air Conditioning & Solar";
export const COMPANY_FULL = "BERNARDINO MARTIN - Heating, Air Conditioning & Solar";

export const WHATSAPP_NUMBER = "18184000227";

export function getWhatsAppLink(message = "Hello, I would like to inquire about your services.") {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const PROMOS = [
  {
    title: "Easter Special",
    sub: "Hop into spring savings",
    description: "Free service call with any HVAC or plumbing repair this Easter.",
    code: "EASTER24",
  },
  {
    title: "$89 OFF",
    description: "Free Service Call with Any AC & Heating Repair",
    sub: "Save $89!",
    code: "FREECALL",
  },
  {
    title: "$69 TUNE-UP",
    description: "Mini-Split Tune-Up - Only $69!",
    code: "MINI69",
  },
];

export type ServiceCategory =
  | "HVAC & Heating"
  | "Solar & Energy"
  | "Plumbing"
  | "Electrical"
  | "Outdoor & Property"
  | "Technology";

export type ServiceCategoryId =
  | "hvac"
  | "solar"
  | "plumbing"
  | "electrical"
  | "outdoor"
  | "technology";

export type Service = {
  id: string;
  title: string;
  description: string;
  overview: string;
  bullets: string[];
  price: string;
  duration: string;
  image: string;
  icon: LucideIcon;
  category: ServiceCategory;
  categoryId: ServiceCategoryId;
};

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  "HVAC & Heating",
  "Solar & Energy",
  "Plumbing",
  "Electrical",
  "Outdoor & Property",
  "Technology",
];

export const SERVICES: Service[] = [
  {
    id: "hvac-repair",
    title: "AC Repair & Diagnostics",
    description: "Fast, accurate diagnosis and repair of all AC systems",
    overview:
      "Our certified technicians diagnose and repair all makes and models of air conditioning systems. We use industry-leading diagnostic tools to identify issues quickly and provide lasting repairs backed by our workmanship guarantee.",
    bullets: [
      "All AC brands serviced",
      "Same-day service available",
      "Refrigerant leak detection",
      "Electrical fault diagnosis",
      "Thermostat calibration",
      "Workmanship guaranteed",
    ],
    price: "Starting at $89",
    duration: "1-3 hours",
    image: "/images/svc-hvac-repair-new.png",
    icon: Wrench,
    category: "HVAC & Heating",
    categoryId: "hvac",
  },
  {
    id: "hvac-install-ac",
    title: "AC Installation",
    description: "Professional AC installation for new and replacement units",
    overview:
      "We install all types of central air conditioning systems, ductless mini-splits, and window units. Our team handles everything from load calculations and equipment selection to installation and commissioning.",
    bullets: [
      "Free in-home estimate",
      "All major brands",
      "Duct inspection included",
      "New & replacement installs",
      "Energy-efficient models",
      "Manufacturer warranty honored",
    ],
    price: "Free estimate",
    duration: "4-8 hours",
    image: "/images/svc-hvac-install-new.png",
    icon: Wind,
    category: "HVAC & Heating",
    categoryId: "hvac",
  },
  {
    id: "hvac-maintenance",
    title: "HVAC Maintenance",
    description: "Seasonal tune-ups to keep your system running efficiently",
    overview:
      "Regular HVAC maintenance extends equipment life, improves efficiency, and prevents costly breakdowns. Our comprehensive tune-up covers all mechanical and electrical components.",
    bullets: [
      "Filter replacement",
      "Coil cleaning",
      "Refrigerant level check",
      "Electrical connections tightened",
      "Thermostat calibration",
      "Full system performance report",
    ],
    price: "Starting at $79",
    duration: "1-2 hours",
    image: "/images/svc-hvac-maintenance-new.png",
    icon: Settings,
    category: "HVAC & Heating",
    categoryId: "hvac",
  },
  {
    id: "hvac-ductless",
    title: "Ductless Mini-Split Systems",
    description: "Energy-efficient heating and cooling without ductwork",
    overview:
      "Ductless mini-split systems provide targeted comfort for individual rooms or additions. We install, service, and repair all leading brands including Mitsubishi, Daikin, and LG.",
    bullets: [
      "No ductwork required",
      "Zone control per room",
      "Heating and cooling combined",
      "Inverter technology",
      "Whisper-quiet operation",
      "Rebates may apply",
    ],
    price: "Starting at $1,200",
    duration: "4-6 hours",
    image: "/images/svc-ductless-new.png",
    icon: Thermometer,
    category: "HVAC & Heating",
    categoryId: "hvac",
  },
  {
    id: "hvac-ducts",
    title: "Duct Cleaning & Installation",
    description: "Clean air starts with clean ducts",
    overview:
      "Dirty ducts reduce air quality and system efficiency. We provide professional duct cleaning, sealing, and full duct system replacement for homes and light commercial properties.",
    bullets: [
      "HEPA-grade equipment",
      "Mold and allergen removal",
      "Duct sealing and insulation",
      "New duct design and installation",
      "Before and after photos",
      "Improves air quality",
    ],
    price: "Starting at $299",
    duration: "3-6 hours",
    image: "/images/svc-ducts-new.png",
    icon: Fan,
    category: "HVAC & Heating",
    categoryId: "hvac",
  },
  {
    id: "hvac-heating",
    title: "Heating System Services",
    description: "Full range of heating installation, repair, and maintenance",
    overview:
      "We service all types of residential heating systems including gas furnaces, electric furnaces, heat pumps, wall furnaces, and floor furnaces. Our heating specialists cover the full San Fernando Valley area.",
    bullets: [
      "Gas Furnace Repair & Replacement",
      "Electric Furnace Repair",
      "Floor Furnace Services",
      "Wall Furnace Services",
      "Heat Pump Installation",
      "Emergency heating service",
    ],
    price: "Starting at $99",
    duration: "2-6 hours",
    image: "/images/svc-heating-new.png",
    icon: Flame,
    category: "HVAC & Heating",
    categoryId: "hvac",
  },
  {
    id: "hvac-thermostat",
    title: "Thermostat Installation & Repair",
    description: "Smart and programmable thermostat upgrades",
    overview:
      "Upgrade to a smart thermostat and start saving on energy bills immediately. We install, program, and repair all thermostat brands including Nest, Ecobee, Honeywell, and more.",
    bullets: [
      "Smart thermostat installation",
      "WiFi and app control setup",
      "Programmable scheduling",
      "Compatibility check",
      "Old thermostat removal",
      "Energy savings guidance",
    ],
    price: "Starting at $49",
    duration: "1-2 hours",
    image: "/images/svc-thermostat-new.png",
    icon: Settings,
    category: "HVAC & Heating",
    categoryId: "hvac",
  },
  {
    id: "solar-install",
    title: "Solar Panel Installation",
    description: "Residential solar systems designed and installed for LA homes",
    overview:
      "We design and install complete grid-tied solar energy systems for Los Angeles homeowners. Our team handles permitting, installation, and utility interconnection so you can start generating clean energy fast.",
    bullets: [
      "Free energy audit",
      "Custom system design",
      "Permit handling included",
      "Utility interconnection",
      "Panel and inverter warranty",
      "Financing options available",
    ],
    price: "Free estimate",
    duration: "1-2 days",
    image: "/images/svc-solar-install-new.png",
    icon: Sun,
    category: "Solar & Energy",
    categoryId: "solar",
  },
  {
    id: "solar-maintenance",
    title: "Solar System Maintenance",
    description: "Keep your panels producing at peak performance",
    overview:
      "We provide cleaning, inspection, and performance testing for all solar panel brands. Dirty or damaged panels can reduce output by up to 30% - our maintenance visits keep your system at peak efficiency.",
    bullets: [
      "Panel cleaning",
      "Inverter diagnostics",
      "Wiring inspection",
      "Output performance report",
      "Microinverter check",
      "Annual service plans available",
    ],
    price: "Starting at $149",
    duration: "2-4 hours",
    image: "/images/svc-solar-maintenance-new.png",
    icon: Zap,
    category: "Solar & Energy",
    categoryId: "solar",
  },
  {
    id: "solar-irrigation",
    title: "Solar-Powered Irrigation",
    description: "Eco-friendly irrigation powered by your solar system",
    overview:
      "Combine your solar investment with a smart irrigation system. We install solar-powered drip and sprinkler systems for gardens, lawns, and planters - fully controllable from your smartphone.",
    bullets: [
      "App-controlled scheduling",
      "Solar powered operation",
      "Drip and sprinkler options",
      "Water usage monitoring",
      "Reduces utility bills",
      "Eco-friendly design",
    ],
    price: "Starting at $399",
    duration: "3-5 hours",
    image: "/images/svc-solar-irrigation-new.png",
    icon: Sprout,
    category: "Solar & Energy",
    categoryId: "solar",
  },
  {
    id: "plumbing-general",
    title: "General Plumbing Services",
    description: "Full-service residential plumbing for every need",
    overview:
      "We provide a full range of residential plumbing services including pipe installations, fixture upgrades, leak repairs, water filtration, reverse osmosis systems, and soft water installations. We also replace under-sink motors to keep everything running smoothly.",
    bullets: [
      "Pipe installation and repair",
      "Sink and toilet upgrades",
      "Water heater service",
      "Reverse osmosis systems",
      "Soft water installation",
      "Under-sink motor replacement",
    ],
    price: "Starting at $89",
    duration: "1-4 hours",
    image: "/images/svc-plumbing.webp",
    icon: Droplets,
    category: "Plumbing",
    categoryId: "plumbing",
  },
  {
    id: "plumbing-jet-cleanup",
    title: "SMART JET CLEANUP System",
    description: "Smartphone-controlled drain cleaning from home to street mainline",
    overview:
      "Our SMART AUTOMATIC JET CLEANUP system uses high-pressure water jetting to clear blockages from inside your home all the way to the street mainline. The system is fully controllable from your smartphone and includes a check valve to prevent sewer gases from re-entering - keeping air up to 95% odor-free.",
    bullets: [
      "Clears mainline blockages",
      "Smartphone app control",
      "Check valve installation",
      "Up to 95% odor reduction",
      "Prevents sewer gas backup",
      "Commercial-grade equipment",
    ],
    price: "Starting at $199",
    duration: "2-4 hours",
    image: "/images/real-pipe-repair.webp",
    icon: Wrench,
    category: "Plumbing",
    categoryId: "plumbing",
  },
  {
    id: "plumbing-shutoff",
    title: "SMART SHUTOFF VALVE",
    description: "Automatic leak protection for your entire home",
    overview:
      "The SMART SHUTOFF VALVE monitors your home's water usage and automatically shuts off the water supply if a leak is detected - before damage occurs. Protect your furniture, flooring, and belongings from costly water damage with this intelligent device.",
    bullets: [
      "Automatic leak detection",
      "Instant water shutoff",
      "Smartphone alerts",
      "Protects entire home",
      "Easy professional installation",
      "Insurance discount may apply",
    ],
    price: "Starting at $299",
    duration: "2-3 hours",
    image: "/images/moen-smart-water-shutoff.webp",
    icon: ShieldCheck,
    category: "Plumbing",
    categoryId: "plumbing",
  },
  {
    id: "electrical-panel",
    title: "Electrical Panel Services",
    description: "Panel upgrades, replacements, and repairs by licensed electricians",
    overview:
      "Our licensed electricians handle all types of electrical panel work including upgrades, replacements, circuit additions, and safety inspections. We ensure your home's electrical system is safe, up to code, and ready for modern power demands.",
    bullets: [
      "Panel upgrades and replacements",
      "Circuit breaker service",
      "New circuit installation",
      "Safety inspection and report",
      "Code compliance",
      "EV charger circuit prep",
    ],
    price: "Starting at $199",
    duration: "4-8 hours",
    image: "/images/svc-electrical.png",
    icon: Plug,
    category: "Electrical",
    categoryId: "electrical",
  },
  {
    id: "electrical-general",
    title: "General Electrical Services",
    description: "Outlets, switches, lighting, and full home wiring",
    overview:
      "From adding an outlet to rewiring an entire room, our electricians handle all residential electrical needs. We work safely, cleanly, and to California electrical code on every job.",
    bullets: [
      "Outlet and switch installation",
      "Ceiling fan installation",
      "Recessed lighting",
      "GFCI and AFCI protection",
      "Dedicated circuits",
      "Smart home wiring",
    ],
    price: "Starting at $99",
    duration: "1-6 hours",
    image: "/images/svc-electrical.png",
    icon: Zap,
    category: "Electrical",
    categoryId: "electrical",
  },
  {
    id: "outdoor-landscaping",
    title: "Landscaping Design & Installation",
    description: "Beautiful outdoor spaces designed for Los Angeles living",
    overview:
      "We design and install custom landscaping for residential properties across Los Angeles. From new lawn installation to complete yard makeovers, our team creates beautiful, low-maintenance outdoor spaces tailored to Southern California's climate.",
    bullets: [
      "Custom landscape design",
      "Plant and tree selection",
      "Drainage solutions",
      "Mulch and ground cover",
      "Retaining walls",
      "Drought-tolerant designs",
    ],
    price: "Free estimate",
    duration: "1-5 days",
    image: "/images/svc-landscaping.png",
    icon: TreePine,
    category: "Outdoor & Property",
    categoryId: "outdoor",
  },
  {
    id: "outdoor-sod",
    title: "Sod Installation",
    description: "San Augustine and RTF sod professionally installed",
    overview:
      "We supply and install premium sod varieties suited for Los Angeles's climate. Our team prepares the soil, installs the sod, and provides aftercare instructions to ensure a healthy, lush lawn from day one.",
    bullets: [
      "San Augustine sod available",
      "RTF tall fescue available",
      "Soil preparation included",
      "Proper grading and leveling",
      "Same-day installation",
      "Watering guidance provided",
    ],
    price: "Starting at $1.50/sq ft",
    duration: "1-2 days",
    image: "/images/svc-sod-installation.png",
    icon: Sprout,
    category: "Outdoor & Property",
    categoryId: "outdoor",
  },
  {
    id: "outdoor-planting",
    title: "Planting & Garden Care",
    description: "Professional planting for gardens, beds, and containers",
    overview:
      "Whether you need a new garden bed, container plantings, or a full landscape refresh, our team selects and installs the right plants for your space, soil, and sun exposure.",
    bullets: [
      "Seasonal flower installation",
      "Shrub and tree planting",
      "Container garden setup",
      "Mulching and edging",
      "Fertilization",
      "Drought-tolerant plant options",
    ],
    price: "Starting at $149",
    duration: "2-6 hours",
    image: "/images/svc-planting.png",
    icon: Flower2,
    category: "Outdoor & Property",
    categoryId: "outdoor",
  },
  {
    id: "outdoor-irrigation",
    title: "Smart Irrigation Systems",
    description: "App-controlled irrigation for lawns, gardens, and solar panels",
    overview:
      "Our electronic irrigation systems are fully controllable via smartphone. The smart valve reduces water damage risk and can reduce your home insurance by up to 40%. We install systems for lawns, gardens, planters, and solar panel cleaning lines.",
    bullets: [
      "Smartphone app control",
      "Smart shutoff valve",
      "Insurance savings up to 40%",
      "Drip and sprinkler zones",
      "Solar panel rinse line",
      "Water usage reporting",
    ],
    price: "Starting at $499",
    duration: "3-6 hours",
    image: "/images/svc-outdoor-irrigation-new.jpg",
    icon: Sprout,
    category: "Outdoor & Property",
    categoryId: "outdoor",
  },
  {
    id: "tech-network",
    title: "Network & Structured Cabling",
    description: "Professional network infrastructure for homes and businesses",
    overview:
      "We install structured network cabling, fiber internet, home routers, network switches, and full control panel setups for residential and light commercial properties across Los Angeles.",
    bullets: [
      "Cat6 and fiber cabling",
      "Router and switch configuration",
      "Whole-home WiFi setup",
      "Network panel installation",
      "Internet speed optimization",
      "Clean cable management",
    ],
    price: "Starting at $199",
    duration: "2-6 hours",
    image: "/images/svc-network.png",
    icon: Wifi,
    category: "Technology",
    categoryId: "technology",
  },
  {
    id: "tech-smarthome",
    title: "Smart Home Connectivity",
    description: "Connect and automate your home's systems",
    overview:
      "We integrate smart home devices including lighting, thermostats, security cameras, and entertainment systems into a single easy-to-use network. Control everything from your smartphone or voice assistant.",
    bullets: [
      "Smart thermostat integration",
      "Smart lighting setup",
      "Security camera wiring",
      "Voice assistant setup",
      "App control configuration",
      "Device compatibility check",
    ],
    price: "Starting at $149",
    duration: "2-4 hours",
    image: "/images/svc-network.png",
    icon: Wifi,
    category: "Technology",
    categoryId: "technology",
  },
];

export const CITIES = [
  "Malibu",
  "Burbank",
  "Gardena",
  "Glendale",
  "Torrance",
  "Hawthorne",
  "Inglewood",
  "El Segundo",
  "Long Beach",
  "Culver City",
  "Los Angeles",
  "Santa Monica",
  "Hermosa Beach",
  "Redondo Beach",
  "West Hollywood",
  "Manhattan Beach",
  "San Fernando Valley",
  "Playa Del Rey",
];
