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
