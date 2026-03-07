import { 
  Wrench, Sun, Thermometer, Wind, CheckCircle, ShieldCheck, Zap, 
  MessageCircle, Droplets, Fan, Settings, Flame, PenTool,
  Plug, Sprout, TreePine, Flower2, Wifi
} from "lucide-react";

export const COMPANY_PHONE = "(818) 400-0227";
export const COMPANY_NAME = "BERNARDINO MARTIN";
export const COMPANY_TAGLINE = "Heating • Air Conditioning • Solar";
export const COMPANY_FULL = "BERNARDINO MARTIN — Heating • Air Conditioning • Solar";

export const WHATSAPP_NUMBER = "18184000227";

export function getWhatsAppLink(message: string = "Hello, I would like to inquire about your services.") {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const PROMOS = [
  {
    title: "10% OFF",
    description: "Get 10% off this month when you try our services!",
    code: "TRYUS10"
  },
  {
    title: "$89 OFF",
    description: "Free Service Call with Any AC & Heating Repair",
    sub: "Save $89!",
    code: "FREECALL"
  },
  {
    title: "$69 TUNE-UP",
    description: "Mini-Split Tune-Up – Only $69!",
    code: "MINI69"
  }
];

export type ServiceCategory = "HVAC & Heating" | "Solar & Energy" | "Plumbing" | "Electrical" | "Outdoor & Property" | "Technology";

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  "HVAC & Heating",
  "Solar & Energy",
  "Plumbing",
  "Electrical",
  "Outdoor & Property",
  "Technology",
];

export const SERVICES = [
  {
    id: "ac-maintenance",
    title: "AC Maintenance",
    description: "Routine air conditioning tune-ups to maximize efficiency and prevent costly summer breakdowns.",
    price: "From $69",
    duration: "1 Hour",
    image: "/images/real-ac-service.webp",
    icon: Wind,
    category: "HVAC & Heating" as ServiceCategory,
  },
  {
    id: "clean-ducts-vents",
    title: "Clean Ducts & Vents",
    description: "Professional duct cleaning to improve indoor air quality and optimize airflow throughout your home.",
    price: "Custom Quote",
    duration: "2-4 Hours",
    image: "/images/svc-clean-ducts.webp",
    icon: Fan,
    category: "HVAC & Heating" as ServiceCategory,
  },
  {
    id: "ductless-heating-ac",
    title: "Ductless Heating & AC Services",
    description: "Installation, repair, and maintenance for energy-efficient ductless mini-split systems.",
    price: "Custom Quote",
    duration: "Varies",
    image: "/images/svc-ductless.webp",
    icon: Thermometer,
    category: "HVAC & Heating" as ServiceCategory,
  },
  {
    id: "heating-maintenance",
    title: "Heating Maintenance",
    description: "Comprehensive heating system inspections to ensure safe and reliable winter operation.",
    price: "From $69",
    duration: "1 Hour",
    image: "/images/svc-heating-maint.webp",
    icon: Flame,
    category: "HVAC & Heating" as ServiceCategory,
  },
  {
    id: "hvac-maintenance",
    title: "HVAC Maintenance",
    description: "Complete system tune-ups covering both heating and cooling components for year-round comfort.",
    price: "From $89",
    duration: "1.5 Hours",
    image: "/images/svc-hvac-maint.webp",
    icon: Wrench,
    category: "HVAC & Heating" as ServiceCategory,
  },
  {
    id: "install-ac",
    title: "Install AC",
    description: "Expert installation of high-efficiency air conditioning systems tailored to your home's needs.",
    price: "Free Estimate",
    duration: "1-2 Days",
    image: "/images/svc-install-ac.webp",
    icon: Wind,
    category: "HVAC & Heating" as ServiceCategory,
  },
  {
    id: "install-ducts-vents",
    title: "Install Ducts & Vents",
    description: "Custom ductwork design and installation for optimal air distribution and system performance.",
    price: "Free Estimate",
    duration: "1-3 Days",
    image: "/images/svc-install-ducts.webp",
    icon: Fan,
    category: "HVAC & Heating" as ServiceCategory,
  },
  {
    id: "install-heating-system",
    title: "Install Heating System",
    description: "Professional furnace and heating system installation ensuring maximum safety and warmth.",
    price: "Free Estimate",
    duration: "1-2 Days",
    image: "/images/svc-install-heating.webp",
    icon: Flame,
    category: "HVAC & Heating" as ServiceCategory,
  },
  {
    id: "install-thermostat",
    title: "Install Thermostat",
    description: "Smart thermostat installation and programming for better energy management and convenience.",
    price: "From $129",
    duration: "1 Hour",
    image: "/images/svc-install-thermostat.webp",
    icon: Settings,
    category: "HVAC & Heating" as ServiceCategory,
  },
  {
    id: "repair-ac",
    title: "Repair AC",
    description: "Fast, reliable diagnostics and repair for all makes and models of air conditioning systems.",
    price: "$89 Service Call",
    duration: "1-2 Hours",
    image: "/images/svc-repair-ac.webp",
    icon: PenTool,
    category: "HVAC & Heating" as ServiceCategory,
  },
  {
    id: "repair-ducts-vents",
    title: "Repair Ducts & Vents",
    description: "Sealing leaks and repairing damaged ductwork to restore system efficiency and airflow.",
    price: "Custom Quote",
    duration: "2-4 Hours",
    image: "/images/svc-repair-ducts.webp",
    icon: Wrench,
    category: "HVAC & Heating" as ServiceCategory,
  },
  {
    id: "repair-heating-system",
    title: "Repair Heating System",
    description: "Emergency repairs and troubleshooting for furnaces and heating units to restore warmth fast.",
    price: "$89 Service Call",
    duration: "1-2 Hours",
    image: "/images/svc-repair-heating.webp",
    icon: PenTool,
    category: "HVAC & Heating" as ServiceCategory,
  },
  {
    id: "repair-hvac",
    title: "Repair HVAC",
    description: "Comprehensive troubleshooting and repair services for complex heating and cooling issues.",
    price: "$89 Service Call",
    duration: "1-3 Hours",
    image: "/images/svc-repair-hvac.webp",
    icon: Wrench,
    category: "HVAC & Heating" as ServiceCategory,
  },
  {
    id: "repair-thermostat",
    title: "Repair Thermostat",
    description: "Fixing connectivity issues, replacing faulty sensors, and restoring proper thermostat function.",
    price: "From $89",
    duration: "1 Hour",
    image: "/images/svc-repair-thermostat.webp",
    icon: Settings,
    category: "HVAC & Heating" as ServiceCategory,
  },
  {
    id: "solar-installation",
    title: "Solar Installation",
    description: "Expert solar panel installation for Los Angeles homes. Reduce your energy bills today.",
    price: "Custom Quote",
    duration: "1-3 Days",
    image: "/images/real-solar-install.webp",
    icon: Sun,
    category: "Solar & Energy" as ServiceCategory,
  },
  {
    id: "solar-service",
    title: "Solar Service",
    description: "Maintenance, cleaning, and repair for existing solar systems to ensure peak efficiency.",
    price: "From $149",
    duration: "2 Hours",
    image: "/images/svc-solar-service.webp",
    icon: Zap,
    category: "Solar & Energy" as ServiceCategory,
  },
  {
    id: "plumbing-underground",
    title: "Plumbing & Pipe Work",
    description: "Specialized in underground pipe trenching, copper main line welding, and pipe deformation repair.",
    price: "Custom Quote",
    duration: "Varies",
    image: "/images/svc-plumbing.webp",
    icon: Droplets,
    category: "Plumbing" as ServiceCategory,
  },
  {
    id: "electrical-service",
    title: "Electrical Service",
    description: "Professional electrical services for residential and commercial properties including panel upgrades, wiring, outlet installation, lighting, and safety inspections.",
    price: "Custom Quote",
    duration: "Varies",
    image: "/images/svc-electrical.png",
    icon: Plug,
    category: "Electrical" as ServiceCategory,
  },
  {
    id: "smart-irrigation",
    title: "Automatic Smart Irrigation Service",
    description: "Smart irrigation system installation and maintenance with mobile monitoring, automatic leak detection, and water-saving technology. Protect your landscape and reduce water waste.",
    price: "Custom Quote",
    duration: "Varies",
    image: "/images/svc-smart-irrigation.png",
    icon: Sprout,
    category: "Outdoor & Property" as ServiceCategory,
  },
  {
    id: "landscaping",
    title: "Landscaping",
    description: "Professional landscaping design and installation services to transform your outdoor space. From hardscaping to garden design, we create beautiful, functional yards.",
    price: "Custom Quote",
    duration: "Varies",
    image: "/images/svc-landscaping.png",
    icon: TreePine,
    category: "Outdoor & Property" as ServiceCategory,
  },
  {
    id: "sod-installation",
    title: "Sod Installation",
    description: "Expert sod installation for lush, green lawns. We handle soil preparation, grading, and professional sod laying for instant curb appeal and a healthy yard.",
    price: "Custom Quote",
    duration: "1-2 Days",
    image: "/images/svc-sod-installation.png",
    icon: Sprout,
    category: "Outdoor & Property" as ServiceCategory,
  },
  {
    id: "planting",
    title: "Planting",
    description: "Professional planting services including trees, shrubs, flowers, and garden beds. We select the right plants for your climate and soil for lasting beauty.",
    price: "Custom Quote",
    duration: "Varies",
    image: "/images/svc-planting.png",
    icon: Flower2,
    category: "Outdoor & Property" as ServiceCategory,
  },
  {
    id: "network-service",
    title: "Network Service",
    description: "Reliable network infrastructure setup and maintenance for homes and businesses. Wi-Fi optimization, structured cabling, smart home integration, and network security.",
    price: "Custom Quote",
    duration: "Varies",
    image: "/images/svc-network.png",
    icon: Wifi,
    category: "Technology" as ServiceCategory,
  },
];

export const CITIES = [
  "Malibu", "Burbank", "Gardena", "Glendale", "Torrance", "Hawthorne", 
  "Inglewood", "El Segundo", "Long Beach", "Culver City", "Los Angeles", 
  "Santa Monica", "Hermosa Beach", "Redondo Beach", "West Hollywood", 
  "Manhattan Beach", "San Fernando Valley", "Playa Del Rey"
];
