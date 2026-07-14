import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { ProtectedRoute } from "@/components/protected-route";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense, useEffect } from "react";
import { usePageTracking } from "@/hooks/use-analytics";
import Home from "@/pages/home";

const About = lazy(() => import("@/pages/about"));
const Services = lazy(() => import("@/pages/services"));
const ServiceAreas = lazy(() => import("@/pages/service-areas"));
const Contact = lazy(() => import("@/pages/contact"));
const Booking = lazy(() => import("@/pages/booking"));
const Payment = lazy(() => import("@/pages/payment"));
const Dashboard = lazy(() => import("@/pages/dashboard"));
const Quote = lazy(() => import("@/pages/quote"));
const AdminLogin = lazy(() => import("@/pages/admin-login"));
const Admin = lazy(() => import("@/pages/admin"));
const AdminCMSDashboard = lazy(() => import("@/pages/admin-cms/index"));
const AdminCMSAnalytics = lazy(() => import("@/pages/admin-cms/analytics"));
const AdminCMSSettings = lazy(() => import("@/pages/admin-cms/settings"));
const AdminCMSReviews = lazy(() => import("@/pages/admin-cms/reviews"));
const AdminCMSSeo = lazy(() => import("@/pages/admin-cms/seo"));
const AdminCMSMedia = lazy(() => import("@/pages/admin-cms/media"));
const AdminCMSPages = lazy(() => import("@/pages/admin-cms/pages"));
const DynamicPage = lazy(() => import("@/pages/dynamic-page"));
const NotFound = lazy(() => import("@/pages/not-found"));

const HvacLosAngeles = lazy(() => import("@/pages/seo/hvac-los-angeles"));
const SolarLosAngeles = lazy(() => import("@/pages/seo/solar-los-angeles"));
const PlumbingLosAngeles = lazy(() => import("@/pages/seo/plumbing-los-angeles"));
const ElectricalLosAngeles = lazy(() => import("@/pages/seo/electrical-los-angeles"));
const LandscapingLosAngeles = lazy(() => import("@/pages/seo/landscaping-los-angeles"));
const IrrigationLosAngeles = lazy(() => import("@/pages/seo/irrigation-los-angeles"));
const NetworkLosAngeles = lazy(() => import("@/pages/seo/network-los-angeles"));
const HvacBurbank = lazy(() => import("@/pages/seo/hvac-burbank"));
const HvacGlendale = lazy(() => import("@/pages/seo/hvac-glendale"));
const HvacSanFernandoValley = lazy(() => import("@/pages/seo/hvac-san-fernando-valley"));
const HvacSantaMonica = lazy(() => import("@/pages/seo/hvac-santa-monica"));
const HvacHollywood = lazy(() => import("@/pages/seo/hvac-hollywood"));
const HvacNorthHollywood = lazy(() => import("@/pages/seo/hvac-north-hollywood"));
const HvacVanNuys = lazy(() => import("@/pages/seo/hvac-van-nuys"));
const HvacChatsworth = lazy(() => import("@/pages/seo/hvac-chatsworth"));
const HvacNorthridge = lazy(() => import("@/pages/seo/hvac-northridge"));
const HvacReseda = lazy(() => import("@/pages/seo/hvac-reseda"));
const HvacCanogaPark = lazy(() => import("@/pages/seo/hvac-canoga-park"));
const HvacWoodlandHills = lazy(() => import("@/pages/seo/hvac-woodland-hills"));
const HvacCalabasas = lazy(() => import("@/pages/seo/hvac-calabasas"));
const HvacShermanOaks = lazy(() => import("@/pages/seo/hvac-sherman-oaks"));
const HvacStudioCity = lazy(() => import("@/pages/seo/hvac-studio-city"));
const HvacEncino = lazy(() => import("@/pages/seo/hvac-encino"));
const HvacTarzana = lazy(() => import("@/pages/seo/hvac-tarzana"));
const HvacWestHills = lazy(() => import("@/pages/seo/hvac-west-hills"));
const HvacPasadena = lazy(() => import("@/pages/seo/hvac-pasadena"));
const AirConditioningServiceLosAngeles = lazy(() => import("@/pages/seo/air-conditioning-service-los-angeles"));
const AcRepairLosAngeles = lazy(() => import("@/pages/seo/ac-repair-los-angeles"));
const MiniSplitServiceLosAngeles = lazy(() => import("@/pages/seo/mini-split-service-los-angeles"));
const FurnaceServiceLosAngeles = lazy(() => import("@/pages/seo/furnace-service-los-angeles"));
const HeatPumpLosAngeles = lazy(() => import("@/pages/seo/heat-pump-los-angeles"));
const SolarOptimizationLosAngeles = lazy(() => import("@/pages/seo/solar-optimization-los-angeles"));
const PlumbingServiceLosAngeles = lazy(() => import("@/pages/seo/plumbing-service-los-angeles"));
const LandscapingServicesLosAngeles = lazy(() => import("@/pages/seo/landscaping-services-los-angeles"));
const SodInstallationLosAngeles = lazy(() => import("@/pages/seo/sod-installation-los-angeles"));
const PlantersLandscapingLosAngeles = lazy(() => import("@/pages/seo/planters-landscaping-los-angeles"));
const NetworkRepairLosAngeles = lazy(() => import("@/pages/seo/network-repair-los-angeles"));
const NewInstallationLosAngeles = lazy(() => import("@/pages/seo/new-installation-los-angeles"));

const HvacRedondoBeach = lazy(() => import("@/pages/seo/hvac-redondo-beach"));
const HvacHermosaBeach = lazy(() => import("@/pages/seo/hvac-hermosa-beach"));
const HvacPlayaDelRey = lazy(() => import("@/pages/seo/hvac-playa-del-rey"));
const HvacInglewood = lazy(() => import("@/pages/seo/hvac-inglewood"));
const HvacCulverCity = lazy(() => import("@/pages/seo/hvac-culver-city"));
const HvacTorrance = lazy(() => import("@/pages/seo/hvac-torrance"));
const HvacMalibu = lazy(() => import("@/pages/seo/hvac-malibu"));
const HvacLongBeach = lazy(() => import("@/pages/seo/hvac-long-beach"));
const HvacGardena = lazy(() => import("@/pages/seo/hvac-gardena"));
const HvacHawthorne = lazy(() => import("@/pages/seo/hvac-hawthorne"));
const HvacManhattanBeach = lazy(() => import("@/pages/seo/hvac-manhattan-beach"));
const HvacElSegundo = lazy(() => import("@/pages/seo/hvac-el-segundo"));
const HvacWestHollywood = lazy(() => import("@/pages/seo/hvac-west-hollywood"));

// ── Service detail pages ──────────────────────────────────────────────────
const SvcHvacRepair = lazy(() => import("@/pages/service-detail/hvac-repair"));
const SvcHvacInstallAc = lazy(() => import("@/pages/service-detail/hvac-install-ac"));
const SvcHvacMaintenance = lazy(() => import("@/pages/service-detail/hvac-maintenance"));
const SvcHvacDuctless = lazy(() => import("@/pages/service-detail/hvac-ductless"));
const SvcHvacAirFiltration = lazy(() => import("@/pages/service-detail/hvac-air-filtration"));
const SvcHvacAtticHeat = lazy(() => import("@/pages/service-detail/hvac-attic-heat"));
const SvcHvacDucts = lazy(() => import("@/pages/service-detail/hvac-ducts"));
const SvcHeatingGasFurnace = lazy(() => import("@/pages/service-detail/heating-gas-furnace"));
const SvcHeatingElectricFurnace = lazy(() => import("@/pages/service-detail/heating-electric-furnace"));
const SvcHeatingFloorFurnace = lazy(() => import("@/pages/service-detail/heating-floor-furnace"));
const SvcHeatingWallFurnace = lazy(() => import("@/pages/service-detail/heating-wall-furnace"));
const SvcHeatingFurnaceReplacement = lazy(() => import("@/pages/service-detail/heating-furnace-replacement"));
const SvcHvacThermostat = lazy(() => import("@/pages/service-detail/hvac-thermostat"));
const SvcHeatingNestThermostat = lazy(() => import("@/pages/service-detail/heating-nest-thermostat"));
const SvcSolarInstall = lazy(() => import("@/pages/service-detail/solar-install"));
const SvcSolarMaintenance = lazy(() => import("@/pages/service-detail/solar-maintenance"));
const SvcSolarInverter = lazy(() => import("@/pages/service-detail/solar-inverter"));
const SvcSolarIrrigation = lazy(() => import("@/pages/service-detail/solar-irrigation"));
const SvcPlumbingGeneral = lazy(() => import("@/pages/service-detail/plumbing-general"));
const SvcPlumbingMainline = lazy(() => import("@/pages/service-detail/plumbing-mainline"));
const SvcPlumbingGasLine = lazy(() => import("@/pages/service-detail/plumbing-gas-line"));
const SvcPlumbingSewer = lazy(() => import("@/pages/service-detail/plumbing-sewer"));
const SvcPlumbingWaterFilter = lazy(() => import("@/pages/service-detail/plumbing-water-filter"));
const SvcPlumbingShutoff = lazy(() => import("@/pages/service-detail/plumbing-shutoff"));
const SvcPlumbingJetCleanup = lazy(() => import("@/pages/service-detail/plumbing-jet-cleanup"));
const SvcPlumbingToilet = lazy(() => import("@/pages/service-detail/plumbing-toilet"));
const SvcPlumbingDisposal = lazy(() => import("@/pages/service-detail/plumbing-disposal"));
const SvcPlumbingWaterHeater = lazy(() => import("@/pages/service-detail/plumbing-water-heater"));
const SvcPlumbingSink = lazy(() => import("@/pages/service-detail/plumbing-sink"));
const SvcElectricalPanel = lazy(() => import("@/pages/service-detail/electrical-panel"));
const SvcElectricalGeneral = lazy(() => import("@/pages/service-detail/electrical-general"));
const SvcElectricalEvCharger = lazy(() => import("@/pages/service-detail/electrical-ev-charger"));
const SvcOutdoorLandscaping = lazy(() => import("@/pages/service-detail/outdoor-landscaping"));
const SvcOutdoorSod = lazy(() => import("@/pages/service-detail/outdoor-sod"));
const SvcOutdoorPlanting = lazy(() => import("@/pages/service-detail/outdoor-planting"));
const SvcOutdoorIrrigation = lazy(() => import("@/pages/service-detail/outdoor-irrigation"));
const SvcOutdoorHardscape = lazy(() => import("@/pages/service-detail/outdoor-hardscape"));
const SvcTechNetwork = lazy(() => import("@/pages/service-detail/tech-network"));
const SvcTechSmarthome = lazy(() => import("@/pages/service-detail/tech-smarthome"));
const SvcTechNest = lazy(() => import("@/pages/service-detail/tech-nest"));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function Router() {
  usePageTracking();
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/services" component={Services} />
        <Route path="/service-areas" component={ServiceAreas} />
        <Route path="/contact" component={Contact} />
        <Route path="/booking" component={Booking} />
        <Route path="/payment" component={Payment} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/quote" component={Quote} />
        <Route path="/admin/login" component={AdminLogin} />
        <Route path="/admin" component={Admin} />
        <Route path="/admin/cms">
          {() => <ProtectedRoute component={AdminCMSDashboard} />}
        </Route>
        <Route path="/admin/cms/bookings">
          {() => <ProtectedRoute component={AdminCMSDashboard} />}
        </Route>
        <Route path="/admin/cms/quotes">
          {() => <ProtectedRoute component={AdminCMSDashboard} />}
        </Route>
        <Route path="/admin/cms/contacts">
          {() => <ProtectedRoute component={AdminCMSDashboard} />}
        </Route>
        <Route path="/admin/cms/invoices">
          {() => <ProtectedRoute component={AdminCMSDashboard} />}
        </Route>
        <Route path="/admin/cms/analytics">
          {() => <ProtectedRoute component={AdminCMSAnalytics} />}
        </Route>
        <Route path="/admin/cms/settings">
          {() => <ProtectedRoute component={AdminCMSSettings} />}
        </Route>
        <Route path="/admin/cms/reviews">
          {() => <ProtectedRoute component={AdminCMSReviews} />}
        </Route>
        <Route path="/admin/cms/seo">
          {() => <ProtectedRoute component={AdminCMSSeo} />}
        </Route>
        <Route path="/admin/cms/media">
          {() => <ProtectedRoute component={AdminCMSMedia} />}
        </Route>
        <Route path="/admin/cms/pages">
          {() => <ProtectedRoute component={AdminCMSPages} />}
        </Route>

        <Route path="/hvac-los-angeles" component={HvacLosAngeles} />
        <Route path="/solar-installation-los-angeles" component={SolarLosAngeles} />
        <Route path="/plumbing-los-angeles" component={PlumbingLosAngeles} />
        <Route path="/electrical-services-los-angeles" component={ElectricalLosAngeles} />
        <Route path="/landscaping-los-angeles" component={LandscapingLosAngeles} />
        <Route path="/irrigation-los-angeles" component={IrrigationLosAngeles} />
        <Route path="/network-installation-los-angeles" component={NetworkLosAngeles} />
        <Route path="/hvac-burbank" component={HvacBurbank} />
        <Route path="/hvac-glendale" component={HvacGlendale} />
        <Route path="/hvac-san-fernando-valley" component={HvacSanFernandoValley} />
        <Route path="/hvac-santa-monica" component={HvacSantaMonica} />
        <Route path="/hvac-hollywood" component={HvacHollywood} />
        <Route path="/hvac-north-hollywood" component={HvacNorthHollywood} />
        <Route path="/hvac-van-nuys" component={HvacVanNuys} />
        <Route path="/hvac-chatsworth" component={HvacChatsworth} />
        <Route path="/hvac-northridge" component={HvacNorthridge} />
        <Route path="/hvac-reseda" component={HvacReseda} />
        <Route path="/hvac-canoga-park" component={HvacCanogaPark} />
        <Route path="/hvac-woodland-hills" component={HvacWoodlandHills} />
        <Route path="/hvac-calabasas" component={HvacCalabasas} />
        <Route path="/hvac-sherman-oaks" component={HvacShermanOaks} />
        <Route path="/hvac-studio-city" component={HvacStudioCity} />
        <Route path="/hvac-encino" component={HvacEncino} />
        <Route path="/hvac-tarzana" component={HvacTarzana} />
        <Route path="/hvac-west-hills" component={HvacWestHills} />
        <Route path="/hvac-pasadena" component={HvacPasadena} />
        <Route path="/hvac-redondo-beach" component={HvacRedondoBeach} />
        <Route path="/hvac-hermosa-beach" component={HvacHermosaBeach} />
        <Route path="/hvac-playa-del-rey" component={HvacPlayaDelRey} />
        <Route path="/hvac-inglewood" component={HvacInglewood} />
        <Route path="/hvac-culver-city" component={HvacCulverCity} />
        <Route path="/hvac-torrance" component={HvacTorrance} />
        <Route path="/hvac-malibu" component={HvacMalibu} />
        <Route path="/hvac-long-beach" component={HvacLongBeach} />
        <Route path="/hvac-gardena" component={HvacGardena} />
        <Route path="/hvac-hawthorne" component={HvacHawthorne} />
        <Route path="/hvac-manhattan-beach" component={HvacManhattanBeach} />
        <Route path="/hvac-el-segundo" component={HvacElSegundo} />
        <Route path="/hvac-west-hollywood" component={HvacWestHollywood} />
        <Route path="/air-conditioning-service-los-angeles" component={AirConditioningServiceLosAngeles} />
        <Route path="/ac-repair-los-angeles" component={AcRepairLosAngeles} />
        <Route path="/mini-split-service-los-angeles" component={MiniSplitServiceLosAngeles} />
        <Route path="/furnace-service-los-angeles" component={FurnaceServiceLosAngeles} />
        <Route path="/heat-pump-los-angeles" component={HeatPumpLosAngeles} />
        <Route path="/solar-optimization-los-angeles" component={SolarOptimizationLosAngeles} />
        <Route path="/plumbing-service-los-angeles" component={PlumbingServiceLosAngeles} />
        <Route path="/landscaping-services-los-angeles" component={LandscapingServicesLosAngeles} />
        <Route path="/sod-installation-los-angeles" component={SodInstallationLosAngeles} />
        <Route path="/planters-landscaping-los-angeles" component={PlantersLandscapingLosAngeles} />
        <Route path="/network-repair-los-angeles" component={NetworkRepairLosAngeles} />
        <Route path="/new-installation-los-angeles" component={NewInstallationLosAngeles} />

        {/* ── Service detail routes ─────────────────────────────────────── */}
        <Route path="/services/hvac-repair" component={SvcHvacRepair} />
        <Route path="/services/hvac-install-ac" component={SvcHvacInstallAc} />
        <Route path="/services/hvac-maintenance" component={SvcHvacMaintenance} />
        <Route path="/services/hvac-ductless" component={SvcHvacDuctless} />
        <Route path="/services/hvac-air-filtration" component={SvcHvacAirFiltration} />
        <Route path="/services/hvac-attic-heat" component={SvcHvacAtticHeat} />
        <Route path="/services/hvac-ducts" component={SvcHvacDucts} />
        <Route path="/services/heating-gas-furnace" component={SvcHeatingGasFurnace} />
        <Route path="/services/heating-electric-furnace" component={SvcHeatingElectricFurnace} />
        <Route path="/services/heating-floor-furnace" component={SvcHeatingFloorFurnace} />
        <Route path="/services/heating-wall-furnace" component={SvcHeatingWallFurnace} />
        <Route path="/services/heating-furnace-replacement" component={SvcHeatingFurnaceReplacement} />
        <Route path="/services/hvac-thermostat" component={SvcHvacThermostat} />
        <Route path="/services/heating-nest-thermostat" component={SvcHeatingNestThermostat} />
        <Route path="/services/solar-install" component={SvcSolarInstall} />
        <Route path="/services/solar-maintenance" component={SvcSolarMaintenance} />
        <Route path="/services/solar-inverter" component={SvcSolarInverter} />
        <Route path="/services/solar-irrigation" component={SvcSolarIrrigation} />
        <Route path="/services/plumbing-general" component={SvcPlumbingGeneral} />
        <Route path="/services/plumbing-mainline" component={SvcPlumbingMainline} />
        <Route path="/services/plumbing-gas-line" component={SvcPlumbingGasLine} />
        <Route path="/services/plumbing-sewer" component={SvcPlumbingSewer} />
        <Route path="/services/plumbing-water-filter" component={SvcPlumbingWaterFilter} />
        <Route path="/services/plumbing-shutoff" component={SvcPlumbingShutoff} />
        <Route path="/services/plumbing-jet-cleanup" component={SvcPlumbingJetCleanup} />
        <Route path="/services/plumbing-toilet" component={SvcPlumbingToilet} />
        <Route path="/services/plumbing-disposal" component={SvcPlumbingDisposal} />
        <Route path="/services/plumbing-water-heater" component={SvcPlumbingWaterHeater} />
        <Route path="/services/plumbing-sink" component={SvcPlumbingSink} />
        <Route path="/services/electrical-panel" component={SvcElectricalPanel} />
        <Route path="/services/electrical-general" component={SvcElectricalGeneral} />
        <Route path="/services/electrical-ev-charger" component={SvcElectricalEvCharger} />
        <Route path="/services/outdoor-landscaping" component={SvcOutdoorLandscaping} />
        <Route path="/services/outdoor-sod" component={SvcOutdoorSod} />
        <Route path="/services/outdoor-planting" component={SvcOutdoorPlanting} />
        <Route path="/services/outdoor-irrigation" component={SvcOutdoorIrrigation} />
        <Route path="/services/outdoor-hardscape" component={SvcOutdoorHardscape} />
        <Route path="/services/tech-network" component={SvcTechNetwork} />
        <Route path="/services/tech-smarthome" component={SvcTechSmarthome} />
        <Route path="/services/tech-nest" component={SvcTechNest} />

        <Route path="/:slug" component={DynamicPage} />

        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    let attempts = 0;
    const tryInit = () => {
      const AOS = (window as any).AOS;
      if (AOS) {
        AOS.init({ duration: 800, once: true, offset: 100 });
        return;
      }
      attempts += 1;
      if (attempts < 20) {
        setTimeout(tryInit, 100);
      }
    };
    tryInit();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
