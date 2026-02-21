import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { SERVICES } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { CheckCircle, Loader2 } from "lucide-react";

export default function Booking() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedService, setSelectedService] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

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
    const service = SERVICES.find(s => s.id === selectedService);
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
              <div className="mx-auto bg-green-100 p-4 rounded-full w-fit mb-6">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-heading font-bold mb-3">Request Received!</h2>
              <p className="text-slate-600 mb-6">
                Thank you, <span className="font-semibold">{fullName}</span>. We've received your appointment request and will confirm via email within 24 hours.
              </p>
              <Button onClick={() => { setSubmitted(false); setFullName(""); setPhone(""); setEmail(""); setAddress(""); setNotes(""); setSelectedService(""); }} variant="outline">
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
        <h1 className="text-4xl font-heading font-bold mb-6 text-center" data-testid="text-booking-title">Book an Appointment</h1>
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
                          {SERVICES.map(s => (
                            <SelectItem key={s.id} value={s.id}>{s.title}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Contact Details</label>
                      <Input placeholder="Full Name" value={fullName} onChange={e => setFullName(e.target.value)} required data-testid="input-fullname" className="mb-2" />
                      <Input placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} required data-testid="input-phone" className="mb-2" />
                      <Input placeholder="Email Address" type="email" value={email} onChange={e => setEmail(e.target.value)} required data-testid="input-email" className="mb-2" />
                      <Input placeholder="Street Address" value={address} onChange={e => setAddress(e.target.value)} required data-testid="input-address" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Additional Notes (optional)</label>
                      <Textarea placeholder="Describe the issue or any special requests..." value={notes} onChange={e => setNotes(e.target.value)} data-testid="input-notes" />
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
                        disabled={(d) => d < new Date(new Date().setHours(0,0,0,0))}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t">
                  <Button
                    type="submit"
                    className="w-full md:w-auto md:ml-auto block bg-primary hover:bg-blue-600"
                    disabled={bookingMutation.isPending || !selectedService || !fullName || !phone || !email || !address}
                    data-testid="button-submit-booking"
                  >
                    {bookingMutation.isPending ? (
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</>
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
