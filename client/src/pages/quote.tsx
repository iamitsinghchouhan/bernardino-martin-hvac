import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useState } from "react";
import { SERVICES, COMPANY_PHONE } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { CheckCircle, Loader2, Shield, Clock, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Quote() {
  const [serviceType, setServiceType] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [urgency, setUrgency] = useState("standard");
  const [description, setDescription] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const quoteMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest("POST", "/api/quotes", data);
      return res.json();
    },
    onSuccess: () => {
      setSubmitted(true);
      toast({
        title: "Quote Request Submitted!",
        description: "We'll get back to you within 24 hours with a detailed estimate.",
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
    quoteMutation.mutate({
      serviceType,
      propertyType,
      urgency,
      description,
      fullName,
      phone,
      email,
      address: address || null,
    });
  };

  if (submitted) {
    return (
      <Layout>
        <SEO title="Quote Request Received" description="Your estimate request has been submitted." noindex={true} />
        <div className="container mx-auto px-4 py-20 min-h-[60vh] flex items-center justify-center">
          <Card className="max-w-md w-full text-center shadow-xl border-t-4 border-t-green-500" data-testid="quote-success">
            <CardContent className="p-10">
              <div className="mx-auto bg-secondary/10 p-4 rounded-full w-fit mb-6">
                <CheckCircle className="h-10 w-10 text-secondary" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-heading font-bold mb-3">Quote Request Received!</h2>
              <p className="text-slate-600 mb-6">
                Thank you, <span className="font-semibold">{fullName}</span>. Our team will review your request and send you a detailed estimate within 24 hours.
              </p>
              <p className="text-sm text-slate-500 mb-6">
                For urgent matters, call us directly at <a href={`tel:${COMPANY_PHONE.replace(/\D/g, '')}`} className="font-semibold text-primary">{COMPANY_PHONE}</a>
              </p>
              <Button onClick={() => { setSubmitted(false); setFullName(""); setPhone(""); setEmail(""); setAddress(""); setDescription(""); setServiceType(""); setPropertyType(""); setUrgency("standard"); }} variant="outline">
                Submit Another Request
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO 
        title="Get a Free Quote – HVAC, Solar & Plumbing Estimates in Los Angeles" 
        description="Request a free, no-obligation quote for HVAC repair, solar installation, plumbing, and more. Serving all of Los Angeles. Fast response guaranteed." 
      />

      <div className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-primary/20 text-sky-300 border-primary/40 mb-4">Free Estimates</Badge>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4" data-testid="text-quote-title">
            Request a Free Quote
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Tell us about your project and we'll provide a detailed, no-obligation estimate within 24 hours.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Project Details</CardTitle>
                  <CardDescription>Fill out the form below and our team will prepare your custom estimate.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Service Type</label>
                        <Select value={serviceType} onValueChange={setServiceType} required>
                          <SelectTrigger data-testid="select-quote-service">
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
                        <label className="text-sm font-medium">Property Type</label>
                        <Select value={propertyType} onValueChange={setPropertyType} required>
                          <SelectTrigger data-testid="select-quote-property">
                            <SelectValue placeholder="Residential or Commercial" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="residential">Residential</SelectItem>
                            <SelectItem value="commercial">Commercial</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Urgency Level</label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          data-testid="button-urgency-standard"
                          onClick={() => setUrgency("standard")}
                          className={`p-4 rounded-lg border-2 text-left transition-all ${urgency === "standard" ? "border-primary bg-primary/5" : "border-slate-200 hover:border-slate-300"}`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <Clock className="h-4 w-4 text-primary" />
                            <span className="font-semibold text-sm">Standard</span>
                          </div>
                          <p className="text-xs text-slate-500">Flexible scheduling, best pricing</p>
                        </button>
                        <button
                          type="button"
                          data-testid="button-urgency-priority"
                          onClick={() => setUrgency("priority")}
                          className={`p-4 rounded-lg border-2 text-left transition-all ${urgency === "priority" ? "border-red-500 bg-red-50" : "border-slate-200 hover:border-slate-300"}`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <Clock className="h-4 w-4 text-red-500" />
                            <span className="font-semibold text-sm">Priority</span>
                          </div>
                          <p className="text-xs text-slate-500">Faster response, priority scheduling</p>
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="quote-description" className="text-sm font-medium">Describe Your Project or Issue</label>
                      <Textarea
                        id="quote-description"
                        placeholder="Tell us about the problem, system details, or what you're looking for..."
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                        rows={4}
                        data-testid="input-quote-description"
                      />
                    </div>

                    <fieldset className="border-t pt-6">
                      <legend className="text-sm font-semibold mb-4 text-slate-700">Your Contact Information</legend>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="quote-name" className="sr-only">Full Name</label>
                          <Input id="quote-name" placeholder="Full Name" value={fullName} onChange={e => setFullName(e.target.value)} required data-testid="input-quote-name" aria-label="Full Name" />
                        </div>
                        <div>
                          <label htmlFor="quote-phone" className="sr-only">Phone Number</label>
                          <Input id="quote-phone" placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} required data-testid="input-quote-phone" aria-label="Phone Number" />
                        </div>
                        <div>
                          <label htmlFor="quote-email" className="sr-only">Email Address</label>
                          <Input id="quote-email" placeholder="Email Address" type="email" value={email} onChange={e => setEmail(e.target.value)} required data-testid="input-quote-email" aria-label="Email Address" />
                        </div>
                        <div>
                          <label htmlFor="quote-address" className="sr-only">Property Address</label>
                          <Input id="quote-address" placeholder="Property Address (optional)" value={address} onChange={e => setAddress(e.target.value)} data-testid="input-quote-address" aria-label="Property Address" />
                        </div>
                      </div>
                    </fieldset>

                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90 h-12 text-lg font-bold shadow-lg shadow-primary/20"
                      disabled={quoteMutation.isPending || !serviceType || !propertyType || !description || !fullName || !phone || !email}
                      data-testid="button-submit-quote"
                    >
                      {quoteMutation.isPending ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" /> Submitting...</>
                      ) : (
                        "Get My Free Quote"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="bg-slate-50 border-slate-200">
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-bold text-slate-900">What Happens Next?</h3>
                  <div className="space-y-3">
                    {[
                      { step: "1", text: "We review your request within hours" },
                      { step: "2", text: "A technician may reach out for details" },
                      { step: "3", text: "You receive a detailed, written estimate" },
                    ].map(({ step, text }) => (
                      <div key={step} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shrink-0">{step}</div>
                        <span className="text-sm text-slate-600">{text}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-50 border-slate-200">
                <CardContent className="p-6 space-y-3">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <h3 className="font-bold text-slate-900">Our Promise</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-secondary shrink-0" /> No obligation, 100% free estimate</li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-secondary shrink-0" /> Upfront, transparent pricing</li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-secondary shrink-0" /> Licensed & insured technicians</li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-3.5 w-3.5 text-secondary shrink-0" /> Response within 24 hours</li>
                  </ul>
                </CardContent>
              </Card>

              <div className="text-center p-4">
                <p className="text-sm text-slate-500 mb-2">Prefer to talk?</p>
                <Button variant="outline" className="w-full" asChild>
                  <a href={`tel:${COMPANY_PHONE.replace(/\D/g, '')}`}>
                    <Phone className="mr-2 h-4 w-4" /> {COMPANY_PHONE}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
