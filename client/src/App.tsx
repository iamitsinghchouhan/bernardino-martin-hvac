import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense } from "react";
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

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function Router() {
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

        <Route path="/hvac-los-angeles" component={HvacLosAngeles} />
        <Route path="/solar-installation-los-angeles" component={SolarLosAngeles} />
        <Route path="/plumbing-los-angeles" component={PlumbingLosAngeles} />
        <Route path="/electrical-services-los-angeles" component={ElectricalLosAngeles} />
        <Route path="/landscaping-los-angeles" component={LandscapingLosAngeles} />
        <Route path="/irrigation-los-angeles" component={IrrigationLosAngeles} />
        <Route path="/network-installation-los-angeles" component={NetworkLosAngeles} />
        <Route path="/hvac-burbank" component={HvacBurbank} />
        <Route path="/hvac-glendale" component={HvacGlendale} />
        <Route path="/hvac-pasadena" component={HvacPasadena} />
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

        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
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
