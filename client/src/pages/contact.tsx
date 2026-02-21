import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { COMPANY_PHONE, getWhatsAppLink } from "@/lib/constants";
import { Phone, Mail, MapPin, Clock, MessageCircle, CheckCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const contactMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest("POST", "/api/contact", data);
      return res.json();
    },
    onSuccess: () => {
      setSubmitted(true);
      toast({
        title: "Message Sent!",
        description: "We'll get back to you within 24 hours.",
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
    contactMutation.mutate({ name, phone: phone || null, email, message });
  };

  return (
    <Layout>
      <SEO title="Contact Us" description="Contact BERNARDINO MARTIN'S Heating Air Conditioning, Solar for all your heating, cooling, solar, and plumbing needs." />
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-heading font-bold mb-6 text-center" data-testid="text-contact-title">Contact Us</h1>
        <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
          Ready to schedule service or have a question? We're here to help. Reach out to us today.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
                <CardDescription>We're available 24/7 for emergency services.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-slate-900">Phone</h3>
                    <p className="text-slate-600">
                      <a href={`tel:${COMPANY_PHONE.replace(/\D/g, '')}`} className="hover:text-primary transition-colors">
                        {COMPANY_PHONE}
                      </a>
                    </p>
                    <p className="text-sm text-slate-500 mt-1">Available 24/7</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MessageCircle className="h-6 w-6 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-slate-900">WhatsApp</h3>
                    <p className="text-slate-600 mb-2">Chat with us instantly</p>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white border-0" asChild>
                      <a href={getWhatsAppLink("Hello! I have a question about your services.")} target="_blank" rel="noopener noreferrer">
                        Chat on WhatsApp
                      </a>
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-slate-900">Email</h3>
                    <p className="text-slate-600">service@bernardinomartinhvac.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-slate-900">Service Area</h3>
                    <p className="text-slate-600">Greater Los Angeles Area</p>
                    <p className="text-sm text-slate-500 mt-1">San Fernando Valley, West LA, and surrounding cities</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-slate-900">Business Hours</h3>
                    <p className="text-slate-600">Mon - Fri: 7:00 AM - 7:00 PM</p>
                    <p className="text-slate-600">Sat - Sun: 8:00 AM - 5:00 PM</p>
                    <p className="text-sm text-red-500 mt-1 font-medium">24/7 Emergency Service Available</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Send Us a Message</CardTitle>
              <CardDescription>Fill out the form below and we'll get back to you shortly.</CardDescription>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <div className="text-center py-8">
                  <div className="mx-auto bg-green-100 p-4 rounded-full w-fit mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-slate-600 mb-6">Thank you for reaching out. We'll respond within 24 hours.</p>
                  <Button variant="outline" onClick={() => { setSubmitted(false); setName(""); setPhone(""); setEmail(""); setMessage(""); }}>
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">Name</label>
                      <Input id="name" placeholder="Your Name" value={name} onChange={e => setName(e.target.value)} required data-testid="input-contact-name" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium">Phone</label>
                      <Input id="phone" placeholder="Your Phone Number" value={phone} onChange={e => setPhone(e.target.value)} data-testid="input-contact-phone" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <Input id="email" type="email" placeholder="Your Email Address" value={email} onChange={e => setEmail(e.target.value)} required data-testid="input-contact-email" />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">Message</label>
                    <Textarea id="message" placeholder="How can we help you?" className="min-h-[120px]" value={message} onChange={e => setMessage(e.target.value)} required data-testid="input-contact-message" />
                  </div>
                  
                  <Button type="submit" className="w-full bg-primary hover:bg-blue-600" disabled={contactMutation.isPending} data-testid="button-send-message">
                    {contactMutation.isPending ? (
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
