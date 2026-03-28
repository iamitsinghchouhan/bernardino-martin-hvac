import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";
import { SERVICES } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { CheckCircle, Loader2 } from "lucide-react";
import { validateEmail } from "@/lib/email-validation";
import { useLocation } from "wouter";

export default function Booking() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedService, setSelectedService] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [emailError, setEmailError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  const [location] = useLocation();
  const preselectedServiceId = new URLSearchParams(window.location.search).get("service");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const serviceFromQuery = params.get("service");
    if (!serviceFromQuery) return;

    const matchedService = SERVICES.find((service) => service.id === serviceFromQuery);
    if (matchedService) {
      setSelectedService(matchedService.id);
    }
  }, [location]);

  const preselectedService = SERVICES.find((service) => service.id === selectedService);

  const bookingMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest("POST", "/api/bookings", data);
      return res.json();
    },
    onSuccess: () => {
      setSubmitted(true);
      toast({
        title: "Appointment Requested!",
        description: "We'll confirm your appointment within 24 hours.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Something went wrong",
        description: error.message || "Please try again or call us directly.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailCheck = validateEmail(email);
    if (!emailCheck.valid) {
      setEmailError(emailCheck.error || "Invalid email");
      return;
    }

    setEmailError("");
    const service = SERVICES.find((s) => s.id === selectedService);
    if (!service || !date) return;

    bookingMutation.mutate({
      serviceId: selectedService,
      serviceTitle: service.title,
      fullName,
      phone,
      email,
      address,
      preferredDate: date.toISOString().split("T")[0],
      notes: notes || null,
    });
  };

  if (submitted) {
    return (
      <Layout>
        <SEO title="Booking Confirmed" description="Your appointment has been requested." noindex={true} />
        <div className="container mx-auto px-4 py-20 min-h-[60vh] flex items-center justify-center">
          <Card className="max-w-md w-full text-center shadow-xl border-t-4 border-t-green-500">
            <CardContent className="p-10">
              <div className="mx-auto bg-secondary/10 p-4 rounded-full w-fit mb-6">
                <CheckCircle className="h-10 w-10 text-secondary" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-heading font-bold mb-3">Request Received!</h2>
              <p className="text-slate-600 mb-6">
                Thank you, <span className="font-semibold">{fullName}</span>. We've received your appointment request and will confirm via email within 24 hours.
              </p>
              <Button
                onClick={() => {
                  setSubmitted(false);
                  setFullName("");
                  setPhone("");
                  setEmail("");
                  setAddress("");
                  setNotes("");
                  setSelectedService("");
                }}
                variant="outline"
              >
                Book Another Service
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO title="Book Online" description="Schedule your HVAC, Solar, or Plumbing service online. Fast, easy, and secure booking." noindex={true} />
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-heading font-bold mb-6 text-center" data-testid="text-booking-title">
          Book an Appointment
        </h1>
        <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
          Choose a date and time that works for you. We'll confirm your appointment shortly.
        </p>

        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Schedule Service</CardTitle>
              <CardDescription>Select your service and preferred availability.</CardDescription>
            </CardHeader>
            <CardContent>
              {preselectedServiceId && preselectedService?.id === preselectedServiceId && (
                <div className="mb-6 rounded-2xl border border-blue-200 bg-blue-50 px-4 py-4 text-blue-900">
                  <p className="text-sm font-semibold md:text-base">
                    You selected: {preselectedService.title} - fill in your details below to confirm your booking.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Service Type</label>
                      <Select value={selectedService} onValueChange={setSelectedService} required>
                        <SelectTrigger data-testid="select-service">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          {SERVICES.map((s) => (
                            <SelectItem key={s.id} value={s.id}>
                              {s.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <fieldset className="space-y-2">
                      <legend className="text-sm font-medium">Contact Details</legend>
                      <div className="space-y-2">
                        <label htmlFor="booking-fullname" className="text-sm font-medium">
                          Full Name
                        </label>
                        <Input
                          id="booking-fullname"
                          placeholder="Full Name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          required
                          data-testid="input-fullname"
                          className="mb-2"
                          aria-label="Full Name"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="booking-phone" className="text-sm font-medium">
                          Phone Number
                        </label>
                        <Input
                          id="booking-phone"
                          placeholder="Phone Number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                          data-testid="input-phone"
                          className="mb-2"
                          aria-label="Phone Number"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="booking-email" className="text-sm font-medium">
                          Email Address
                        </label>
                        <Input
                          id="booking-email"
                          placeholder="Email Address"
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setEmailError("");
                          }}
                          required
                          data-testid="input-email"
                          className={`mb-2 ${emailError ? "border-red-500" : ""}`}
                          aria-label="Email Address"
                        />
                        {emailError && <p className="text-xs text-red-500">{emailError}</p>}
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="booking-address" className="text-sm font-medium">
                          Street Address
                        </label>
                        <Input
                          id="booking-address"
                          placeholder="Street Address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          required
                          data-testid="input-address"
                          aria-label="Street Address"
                        />
                      </div>
                    </fieldset>

                    <div className="space-y-2">
                      <label htmlFor="booking-notes" className="text-sm font-medium">
                        Additional Notes (optional)
                      </label>
                      <Textarea
                        id="booking-notes"
                        placeholder="Describe the issue or any special requests..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        data-testid="input-notes"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Preferred Date</label>
                    <div className="border rounded-md p-4 flex justify-center">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border"
                        disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t">
                  <p className="text-sm text-slate-500 mb-4 flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary shrink-0"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    We will verify licensing when you book your appointment.
                  </p>
                  <Button
                    type="submit"
                    className="w-full md:w-auto md:ml-auto block bg-primary hover:bg-primary/90"
                    disabled={
                      bookingMutation.isPending ||
                      !selectedService ||
                      !fullName ||
                      !phone ||
                      !email ||
                      !address
                    }
                    data-testid="button-submit-booking"
                  >
                    {bookingMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                        Submitting...
                      </>
                    ) : (
                      "Request Appointment"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
