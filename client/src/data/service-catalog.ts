import type { ElementType } from "react";
import {
  Wind, Flame, Sun, Droplets, Zap, TreePine, Wifi,
  Fan, Wrench, Settings, Thermometer, Shield, Home,
  ShieldCheck, Smartphone, Sprout, Flower2, Plug,
  Battery, ArrowDown,
} from "lucide-react";

export interface ServiceCatalogItem {
  name: string;
  slug: string;
  icon: ElementType;
  desc: string;
  duration: string;
  price: string;
  image: string;
}

export interface CategoryMeta {
  id: string;
  anchor: string;
  name: string;
  num: string;
  description: string;
  video: string;
  icon: ElementType;
  dotColor: string;
  bgClass: string;
  gradientFrom: string;
  gradientTo: string;
  services: ServiceCatalogItem[];
}

/** The exact photo/video catalog used by the main /services page. Reused verbatim (not
    re-implemented) anywhere else on the site that needs to show "all our services" so the
    imagery always stays in sync with a single source of truth. */
export const CATEGORY_DATA: CategoryMeta[] = [
  {
    id: "hvac", anchor: "hvac", name: "HVAC & Heating", num: "01",
    description: "Complete heating and cooling solutions for every home",
    video: "/videos/hvac-repair-outdoor.mp4", icon: Wind,
    dotColor: "#3B82F6", bgClass: "bg-blue-50",
    gradientFrom: "from-blue-600", gradientTo: "to-blue-800",
    services: [
      { name: "AC Repair & Diagnostics", slug: "hvac-repair", icon: Wrench, desc: "Fast diagnosis and repair of all AC brands", duration: "1-3 hrs", price: "From $89", image: "/images/hvac-tech-tablet.png" },
      { name: "AC Installation", slug: "hvac-install-ac", icon: Wind, desc: "Central air, mini-splits, and window units", duration: "4-8 hrs", price: "Free estimate", image: "/images/hvac-tech-install-outdoor.png" },
      { name: "HVAC Maintenance", slug: "hvac-maintenance", icon: Settings, desc: "Seasonal tune-ups for peak efficiency", duration: "1-2 hrs", price: "From $79", image: "/images/hvac-tech-homeowner.png" },
      { name: "Ductless Mini-Split", slug: "hvac-ductless", icon: Thermometer, desc: "Zone cooling without ductwork — even in nurseries", duration: "4-6 hrs", price: "From $1,200", image: "/images/hvac-tech-minisplit.png" },
      { name: "Electrostatic Air Filtration", slug: "hvac-air-filtration", icon: Shield, desc: "Reduces odors and airborne particles", duration: "2-4 hrs", price: "From $299", image: "/images/hvac-tech-filter.png" },
      { name: "Attic Heat Reduction", slug: "hvac-attic-heat", icon: Home, desc: "Reduce attic heat to make AC more efficient", duration: "3-5 hrs", price: "From $199", image: "/images/hvac-tech-attic-insulation.png" },
      { name: "Duct Cleaning & Installation", slug: "hvac-ducts", icon: Fan, desc: "Clean air starts with clean ducts", duration: "3-6 hrs", price: "From $299", image: "/images/hvac-duct-cleaning.png" },
    ],
  },
  {
    id: "heating", anchor: "heating", name: "Heating Specialties", num: "02",
    description: "Expert furnace and heating specialists across Los Angeles",
    video: "/videos/hvac-family-comfort.mp4", icon: Flame,
    dotColor: "#EA580C", bgClass: "bg-orange-50",
    gradientFrom: "from-orange-600", gradientTo: "to-orange-800",
    services: [
      { name: "Gas Furnace Repair", slug: "heating-gas-furnace", icon: Flame, desc: "All gas furnace makes and models", duration: "2-4 hrs", price: "From $99", image: "/images/heating-furnace-inspection.png" },
      { name: "Electric Furnace Repair", slug: "heating-electric-furnace", icon: Zap, desc: "Fast diagnostics and repair", duration: "1-3 hrs", price: "From $89", image: "/images/heating-furnace-multimeter.png" },
      { name: "Floor Furnace Services", slug: "heating-floor-furnace", icon: Home, desc: "Installation, repair and cleaning", duration: "2-4 hrs", price: "From $149", image: "/images/heating-register-cleaning.png" },
      { name: "Wall Furnace Services", slug: "heating-wall-furnace", icon: Thermometer, desc: "Safe and efficient wall units", duration: "2-3 hrs", price: "From $129", image: "/images/heating-wall-heater.png" },
      { name: "Furnace Replacement", slug: "heating-furnace-replacement", icon: Wrench, desc: "Energy-efficient upgrade installation", duration: "4-8 hrs", price: "Free estimate", image: "/images/heating-furnace-install.png" },
      { name: "Thermostat Installation", slug: "hvac-thermostat", icon: Settings, desc: "Smart and programmable upgrades", duration: "1-2 hrs", price: "From $49", image: "/images/thermostat-nest-install.png" },
      { name: "Google Nest Thermostat", slug: "heating-nest-thermostat", icon: Smartphone, desc: "Integrates with Google Home seamlessly", duration: "1-2 hrs", price: "From $149", image: "/images/thermostat-nest-app.png" },
    ],
  },
  {
    id: "solar", anchor: "solar", name: "Solar & Energy", num: "03",
    description: "Harness Los Angeles sunshine — 284 sunny days per year",
    video: "/videos/solar-panel-install.mp4", icon: Sun,
    dotColor: "#D97706", bgClass: "bg-amber-50",
    gradientFrom: "from-amber-500", gradientTo: "to-amber-700",
    services: [
      { name: "Solar Panel Installation", slug: "solar-install", icon: Sun, desc: "Custom residential solar systems", duration: "1-2 days", price: "Free estimate", image: "/images/hero-bm-solar-roof.png" },
      { name: "Solar System Maintenance", slug: "solar-maintenance", icon: Settings, desc: "Keep panels at peak performance", duration: "2-4 hrs", price: "From $149", image: "/images/solar-panel-cleaning.png" },
      { name: "Solar Inverter Installation", slug: "solar-inverter", icon: Zap, desc: "Grid-connected inverter installation", duration: "4-6 hrs", price: "From $499", image: "/images/solar-inverter-install.png" },
      { name: "Solar-Powered Irrigation", slug: "solar-irrigation", icon: Droplets, desc: "Eco-friendly solar watering systems", duration: "3-5 hrs", price: "From $399", image: "/images/solar-aerial-sprinkler.png" },
    ],
  },
  {
    id: "plumbing", anchor: "plumbing", name: "Plumbing", num: "04",
    description: "Complete residential plumbing — from street to sink",
    video: "/videos/plumbing-la.mp4", icon: Droplets,
    dotColor: "#0891B2", bgClass: "bg-cyan-50",
    gradientFrom: "from-cyan-600", gradientTo: "to-cyan-800",
    services: [
      { name: "General Plumbing Services", slug: "plumbing-general", icon: Droplets, desc: "Full residential plumbing for every need", duration: "1-4 hrs", price: "From $89", image: "/images/plumbing/plumbing-tech-portrait.png" },
      { name: "Mainline Installation", slug: "plumbing-mainline", icon: Wrench, desc: "Water meter to house copper pipe installation", duration: "1-2 days", price: "Free estimate", image: "/images/plumbing/plumbing-mainline-install.png" },
      { name: "Natural Gas Line Replacement", slug: "plumbing-gas-line", icon: Flame, desc: "Gas meter to house line replacement", duration: "4-8 hrs", price: "Free estimate", image: "/images/plumbing/plumbing-gas-line.png" },
      { name: "Sewer Line Replacement", slug: "plumbing-sewer", icon: ArrowDown, desc: "4-inch ABS pipe replacing clay sewer lines", duration: "1-2 days", price: "Free estimate", image: "/images/plumbing/plumbing-sewer-line.png" },
      { name: "Reverse Osmosis Filtration", slug: "plumbing-water-filter", icon: Shield, desc: "Kitchen sink RO system installation", duration: "2-3 hrs", price: "From $299", image: "/images/plumbing/plumbing-water-filter-ro.png" },
      { name: "SMART SHUTOFF VALVE", slug: "plumbing-shutoff", icon: ShieldCheck, desc: "Automatic leak protection for your home", duration: "2-3 hrs", price: "From $299", image: "/images/plumbing/plumbing-smart-shutoff.png" },
      { name: "SMART JET CLEANUP", slug: "plumbing-jet-cleanup", icon: Wrench, desc: "Smartphone-controlled drain cleaning", duration: "2-4 hrs", price: "From $199", image: "/images/plumbing/plumbing-jet-cleanup.png" },
      { name: "Toilet Replacement", slug: "plumbing-toilet", icon: Home, desc: "High-efficiency water-saving models", duration: "2-3 hrs", price: "From $149", image: "/images/plumbing/plumbing-toilet-install.png" },
      { name: "Garbage Disposal Installation", slug: "plumbing-disposal", icon: Settings, desc: "Motorized garbage disposal installation", duration: "1-2 hrs", price: "From $99", image: "/images/plumbing/plumbing-garbage-disposal.png" },
      { name: "Water Heater Installation", slug: "plumbing-water-heater", icon: Thermometer, desc: "Tank and tankless water heater service", duration: "2-4 hrs", price: "From $149", image: "/images/plumbing/plumbing-water-heater-tank.png" },
      { name: "Sink & Faucet Replacement", slug: "plumbing-sink", icon: Droplets, desc: "Modern sink and faucet upgrades", duration: "1-3 hrs", price: "From $89", image: "/images/plumbing/plumbing-faucet-repair.png" },
    ],
  },
  {
    id: "electrical", anchor: "electrical", name: "Electrical", num: "05",
    description: "Licensed electrical services for modern Los Angeles homes",
    video: "/videos/electrical-la.mp4", icon: Zap,
    dotColor: "#CA8A04", bgClass: "bg-yellow-50",
    gradientFrom: "from-yellow-500", gradientTo: "to-yellow-700",
    services: [
      { name: "Electrical Panel Services", slug: "electrical-panel", icon: Plug, desc: "Panel upgrades and replacements", duration: "4-8 hrs", price: "From $199", image: "/images/services/electrical-hero.png" },
      { name: "General Electrical Services", slug: "electrical-general", icon: Zap, desc: "Outlets, switches, lighting, rewiring", duration: "1-6 hrs", price: "From $99", image: "/images/svc-electrical.png" },
      { name: "EV Charger Installation", slug: "electrical-ev-charger", icon: Battery, desc: "Level 2 home EV charging station", duration: "2-4 hrs", price: "From $399", image: "/images/services/electrical-ev-charger.png" },
    ],
  },
  {
    id: "outdoor", anchor: "outdoor", name: "Outdoor & Property", num: "06",
    description: "Beautiful outdoor spaces for Los Angeles living",
    video: "/videos/landscaping-la.mp4", icon: TreePine,
    dotColor: "#16A34A", bgClass: "bg-green-50",
    gradientFrom: "from-green-600", gradientTo: "to-green-800",
    services: [
      { name: "Landscaping Design & Installation", slug: "outdoor-landscaping", icon: TreePine, desc: "Custom landscape design for LA climate", duration: "1-5 days", price: "Free estimate", image: "/images/landscape-feature.jpg" },
      { name: "Sod Installation", slug: "outdoor-sod", icon: Sprout, desc: "San Augustine and RTF sod installation", duration: "1-2 days", price: "From $1.50/sq ft", image: "/images/svc-sod-installation.png" },
      { name: "Planting & Garden Care", slug: "outdoor-planting", icon: Flower2, desc: "Seasonal plants, shrubs, and garden beds", duration: "2-6 hrs", price: "From $149", image: "/images/svc-planting.png" },
      { name: "Smart Irrigation Systems", slug: "outdoor-irrigation", icon: Droplets, desc: "App-controlled irrigation with insurance savings", duration: "3-6 hrs", price: "From $499", image: "/images/hero-bm-irrigation.png" },
      { name: "Hardscape — Driveways & Patios", slug: "outdoor-hardscape", icon: Home, desc: "Stamped concrete driveways, patios, coping", duration: "2-5 days", price: "Free estimate", image: "/images/hardscape/hardscape-hero-mahogany-driveway.webp" },
    ],
  },
  {
    id: "technology", anchor: "technology", name: "Technology", num: "07",
    description: "Smart home and network infrastructure for modern living",
    video: "/videos/network-la.mp4", icon: Wifi,
    dotColor: "#9333EA", bgClass: "bg-purple-50",
    gradientFrom: "from-purple-600", gradientTo: "to-purple-800",
    services: [
      { name: "Network & Structured Cabling", slug: "tech-network", icon: Wifi, desc: "Professional network infrastructure", duration: "2-6 hrs", price: "From $199", image: "/images/services/network-smarthome.png" },
      { name: "Smart Home Connectivity", slug: "tech-smarthome", icon: Smartphone, desc: "Connect and automate all your systems", duration: "2-4 hrs", price: "From $149", image: "/images/hero-bm-smart-home.png" },
      { name: "Google Nest Integration", slug: "tech-nest", icon: Home, desc: "Full Google Home ecosystem setup", duration: "2-3 hrs", price: "From $149", image: "/images/thermostat-nest-app.png" },
    ],
  },
];
