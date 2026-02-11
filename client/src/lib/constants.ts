import { Wrench, Sun, Thermometer, Wind, CheckCircle, ShieldCheck, Zap, MessageCircle, Droplets } from "lucide-react";

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
    id: "ac-repair",
    title: "AC Repair",
    description: "Fast, reliable air conditioning repair. We fix all major brands and models.",
    price: "$89 Service Call",
    duration: "1-2 Hours",
    image: "/images/real-diagnostics.png",
    icon: Wind
  },
  {
    id: "heating-repair",
    title: "Heating Repair",
    description: "Furnace and heater repair services to keep your home warm and comfortable.",
    price: "$89 Service Call",
    duration: "1-2 Hours",
    image: "/images/real-ductwork.png",
    icon: Thermometer
  },
  {
    id: "hvac-maintenance",
    title: "HVAC Maintenance",
    description: "Comprehensive tune-ups to extend the life of your system and prevent breakdowns.",
    price: "$69 Special",
    duration: "1 Hour",
    image: "/images/real-ac-service.png",
    icon: Wrench
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
