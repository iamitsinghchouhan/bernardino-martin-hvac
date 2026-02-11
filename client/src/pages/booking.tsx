import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { SERVICES } from "@/lib/constants";

export default function Booking() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Layout>
      <SEO title="Book Online" description="Schedule your HVAC, Solar, or Plumbing service online. Fast, easy, and secure booking." noindex={true} />
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-heading font-bold mb-6 text-center">Book an Appointment</h1>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Service Type</label>
                    <Select>
                      <SelectTrigger>
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
                    <Input placeholder="Full Name" className="mb-2" />
                    <Input placeholder="Phone Number" className="mb-2" />
                    <Input placeholder="Email Address" className="mb-2" />
                    <Input placeholder="Street Address" />
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
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t">
                <Button className="w-full md:w-auto md:ml-auto block bg-primary hover:bg-blue-600">
                  Request Appointment
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
