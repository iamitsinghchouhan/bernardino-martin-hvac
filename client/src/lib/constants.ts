import { 
  Wrench, Sun, Thermometer, Wind, CheckCircle, ShieldCheck, Zap, 
  MessageCircle, Droplets, Fan, Settings, Flame, PenTool 
} from "lucide-react";

export const COMPANY_PHONE = "(818) 356-3468";
export const COMPANY_NAME = "BERNARDINO MARTIN'S Heating Air Conditioning, Solar";

export const WHATSAPP_NUMBER = "18183563468";

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

export const SERVICES = [
  {
    id: "ac-maintenance",
    title: "AC Maintenance",
    description: "Routine air conditioning tune-ups to maximize efficiency and prevent costly summer breakdowns.",
    price: "From $69",
    duration: "1 Hour",
    image: "/images/real-ac-service.png",
    icon: Wind
  },
  {
    id: "clean-ducts-vents",
    title: "Clean Ducts & Vents",
    description: "Professional duct cleaning to improve indoor air quality and optimize airflow throughout your home.",
    price: "Custom Quote",
    duration: "2-4 Hours",
    image: "/images/real-ductwork.png",
    icon: Fan
  },
  {
    id: "ductless-heating-ac",
    title: "Ductless Heating & AC Services",
    description: "Installation, repair, and maintenance for energy-efficient ductless mini-split systems.",
    price: "Custom Quote",
    duration: "Varies",
    image: "/images/real-ac-service.png",
    icon: Thermometer
  },
  {
    id: "heating-maintenance",
    title: "Heating Maintenance",
    description: "Comprehensive heating system inspections to ensure safe and reliable winter operation.",
    price: "From $69",
    duration: "1 Hour",
    image: "/images/real-diagnostics.png",
    icon: Flame
  },
  {
    id: "hvac-maintenance",
    title: "HVAC Maintenance",
    description: "Complete system tune-ups covering both heating and cooling components for year-round comfort.",
    price: "From $89",
    duration: "1.5 Hours",
    image: "/images/real-ac-service.png",
    icon: Wrench
  },
  {
    id: "install-ac",
    title: "Install AC",
    description: "Expert installation of high-efficiency air conditioning systems tailored to your home's needs.",
    price: "Free Estimate",
    duration: "1-2 Days",
    image: "/images/real-solar-install.png",
    icon: Wind
  },
  {
    id: "install-ducts-vents",
    title: "Install Ducts & Vents",
    description: "Custom ductwork design and installation for optimal air distribution and system performance.",
    price: "Free Estimate",
    duration: "1-3 Days",
    image: "/images/real-ductwork.png",
    icon: Fan
  },
  {
    id: "install-heating-system",
    title: "Install Heating System",
    description: "Professional furnace and heating system installation ensuring maximum safety and warmth.",
    price: "Free Estimate",
    duration: "1-2 Days",
    image: "/images/real-solar-install.png",
    icon: Flame
  },
  {
    id: "install-thermostat",
    title: "Install Thermostat",
    description: "Smart thermostat installation and programming for better energy management and convenience.",
    price: "From $129",
    duration: "1 Hour",
    image: "/images/real-diagnostics.png",
    icon: Settings
  },
  {
    id: "repair-ac",
    title: "Repair AC",
    description: "Fast, reliable diagnostics and repair for all makes and models of air conditioning systems.",
    price: "$89 Service Call",
    duration: "1-2 Hours",
    image: "/images/real-ac-service.png",
    icon: PenTool
  },
  {
    id: "repair-ducts-vents",
    title: "Repair Ducts & Vents",
    description: "Sealing leaks and repairing damaged ductwork to restore system efficiency and airflow.",
    price: "Custom Quote",
    duration: "2-4 Hours",
    image: "/images/real-ductwork.png",
    icon: Wrench
  },
  {
    id: "repair-heating-system",
    title: "Repair Heating System",
    description: "Emergency repairs and troubleshooting for furnaces and heating units to restore warmth fast.",
    price: "$89 Service Call",
    duration: "1-2 Hours",
    image: "/images/real-diagnostics.png",
    icon: PenTool
  },
  {
    id: "repair-hvac",
    title: "Repair HVAC",
    description: "Comprehensive troubleshooting and repair services for complex heating and cooling issues.",
    price: "$89 Service Call",
    duration: "1-3 Hours",
    image: "/images/real-ac-service.png",
    icon: Wrench
  },
  {
    id: "repair-thermostat",
    title: "Repair Thermostat",
    description: "Fixing connectivity issues, replacing faulty sensors, and restoring proper thermostat function.",
    price: "From $89",
    duration: "1 Hour",
    image: "/images/real-diagnostics.png",
    icon: Settings
  },
  {
    id: "solar-installation",
    title: "Solar Installation",
    description: "Expert solar panel installation for Los Angeles homes. Reduce your energy bills today.",
    price: "Custom Quote",
    duration: "1-3 Days",
    image: "/images/real-solar-install.png",
    icon: Sun
  },
  {
    id: "solar-service",
    title: "Solar Service",
    description: "Maintenance, cleaning, and repair for existing solar systems to ensure peak efficiency.",
    price: "From $149",
    duration: "2 Hours",
    image: "/images/real-solar-test.png", 
    icon: Zap
  },
  {
    id: "plumbing-underground",
    title: "Plumbing & Pipe Work",
    description: "Specialized in underground pipe trenching, copper main line welding, and pipe deformation repair.",
    price: "Custom Quote",
    duration: "Varies",
    image: "/images/real-trenching.png",
    icon: Droplets
  }
];

export const CITIES = [
  "Los Angeles", "Santa Monica", "Beverly Hills", "Pasadena", "Glendale", "Burbank", 
  "North Hollywood", "Sherman Oaks", "Encino", "Van Nuys", "Studio City", "Culver City"
];
