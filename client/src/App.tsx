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
