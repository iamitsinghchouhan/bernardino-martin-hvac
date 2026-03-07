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

export type ServiceCategory = "Home Services" | "Outdoor & Property Services" | "Technology Services";

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  "Home Services",
  "Outdoor & Property Services",
  "Technology Services",
];

export const SERVICES = [
  {
    id: "hvac-service",
    title: "HVAC Service",
    description: "Complete heating, ventilation, and air conditioning services including installation, repair, maintenance, duct cleaning, and smart thermostat setup for year-round comfort.",
    price: "From $69",
    duration: "Varies",
    image: "/images/svc-hvac-maint.webp",
    icon: Wind,
    category: "Home Services" as ServiceCategory,
  },
  {
    id: "plumbing-service",
    title: "Plumbing Service",
    description: "Full-service plumbing solutions including underground pipe trenching, copper main line welding, pipe deformation repair, smart water shutoff installation, and leak detection.",
    price: "Custom Quote",
    duration: "Varies",
    image: "/images/svc-plumbing.webp",
    icon: Droplets,
    category: "Home Services" as ServiceCategory,
  },
  {
    id: "electrical-service",
    title: "Electrical Service",
    description: "Professional electrical services for residential and commercial properties including panel upgrades, wiring, outlet installation, lighting, and safety inspections.",
    price: "Custom Quote",
    duration: "Varies",
    image: "/images/real-diagnostics.webp",
    icon: Plug,
    category: "Home Services" as ServiceCategory,
  },
  {
    id: "solar-service",
    title: "Solar Service",
    description: "Expert solar panel installation, maintenance, cleaning, and repair for Los Angeles homes and businesses. Reduce your energy bills and go green today.",
    price: "Custom Quote",
    duration: "1-3 Days",
    image: "/images/real-solar-install.webp",
    icon: Sun,
    category: "Outdoor & Property Services" as ServiceCategory,
  },
  {
    id: "smart-irrigation",
    title: "Automatic Smart Irrigation Service",
    description: "Smart irrigation system installation and maintenance with mobile monitoring, automatic leak detection, and water-saving technology. Protect your landscape and reduce water waste.",
    price: "Custom Quote",
    duration: "Varies",
    image: "/images/real-trenching.webp",
    icon: Sprout,
    category: "Outdoor & Property Services" as ServiceCategory,
  },
  {
    id: "landscaping",
    title: "Landscaping",
    description: "Professional landscaping design and installation services to transform your outdoor space. From hardscaping to garden design, we create beautiful, functional yards.",
    price: "Custom Quote",
    duration: "Varies",
    image: "/images/real-trenching.webp",
    icon: TreePine,
    category: "Outdoor & Property Services" as ServiceCategory,
  },
  {
    id: "sod-installation",
    title: "Sod Installation",
    description: "Expert sod installation for lush, green lawns. We handle soil preparation, grading, and professional sod laying for instant curb appeal and a healthy yard.",
    price: "Custom Quote",
    duration: "1-2 Days",
    image: "/images/real-trenching.webp",
    icon: Sprout,
    category: "Outdoor & Property Services" as ServiceCategory,
  },
  {
    id: "planting",
    title: "Planting",
    description: "Professional planting services including trees, shrubs, flowers, and garden beds. We select the right plants for your climate and soil for lasting beauty.",
    price: "Custom Quote",
    duration: "Varies",
    image: "/images/real-trenching.webp",
    icon: Flower2,
    category: "Outdoor & Property Services" as ServiceCategory,
  },
  {
    id: "network-service",
    title: "Network Service",
    description: "Reliable network infrastructure setup and maintenance for homes and businesses. Wi-Fi optimization, structured cabling, smart home integration, and network security.",
    price: "Custom Quote",
    duration: "Varies",
    image: "/images/happy-family-tech.webp",
    icon: Wifi,
    category: "Technology Services" as ServiceCategory,
  },
];

export const CITIES = [
  "Malibu", "Burbank", "Gardena", "Glendale", "Torrance", "Hawthorne", 
  "Inglewood", "El Segundo", "Long Beach", "Culver City", "Los Angeles", 
  "Santa Monica", "Hermosa Beach", "Redondo Beach", "West Hollywood", 
  "Manhattan Beach", "San Fernando Valley", "Playa Del Rey"
];
