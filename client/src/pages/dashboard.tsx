import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Download, User, CreditCard, Plus, Shield, Search, CalendarDays, Loader2, Bell, Clock, Mail, MessageSquare } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";

export default function Dashboard() {
  const [email, setEmail] = useState("");
  const [searchEmail, setSearchEmail] = useState("");

  const { data: invoices, isLoading: invoicesLoading } = useQuery({
    queryKey: ["/api/invoices/lookup", searchEmail],
    queryFn: async () => {
      if (!searchEmail) return [];
      const res = await fetch(`/api/invoices/lookup?email=${encodeURIComponent(searchEmail)}`);
      if (res.status === 404) return [];
      if (!res.ok) throw new Error("Failed to load invoices");
      return res.json();
    },
    enabled: !!searchEmail,
  });

  const { data: reminders, isLoading: remindersLoading } = useQuery({
    queryKey: ["/api/reminders", searchEmail],
    queryFn: async () => {
      if (!searchEmail) return [];
      const res = await fetch(`/api/reminders?email=${encodeURIComponent(searchEmail)}`);
      if (!res.ok) throw new Error("Failed to load reminders");
      return res.json();
    },
    enabled: !!searchEmail,
  });

  const { data: bookings, isLoading: bookingsLoading } = useQuery({
    queryKey: ["/api/bookings", searchEmail],
    queryFn: async () => {
      if (!searchEmail) return [];
      const res = await fetch(`/api/bookings?email=${encodeURIComponent(searchEmail)}`);
      if (!res.ok) throw new Error("Failed to load bookings");
      return res.json();
    },
    enabled: !!searchEmail,
  });

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchEmail(email);
  };

  const formatAmount = (cents: number) => `$${(cents / 100).toFixed(2)}`;

  if (!searchEmail) {
    return (
      <Layout>
        <SEO title="Customer Portal" description="Access your service history and invoices." noindex={true} />
        <div className="container mx-auto px-4 py-20 min-h-[60vh] flex items-center justify-center">
          <Card className="max-w-md w-full shadow-xl border-t-4 border-t-primary">
            <CardHeader className="text-center">
              <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-4">
                <User className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl" data-testid="text-dashboard-title">Customer Portal</CardTitle>
              <CardDescription>Enter your email to view your bookings and invoices.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLookup} className="space-y-4">
                <div className="space-y-2">
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    data-testid="input-dashboard-email"
                  />
                </div>
                <Button type="submit" className="w-full bg-primary" data-testid="button-dashboard-lookup">
                  <Search className="mr-2 h-4 w-4" /> View My Account
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEO title="Customer Portal" description="Access your service history and invoices." noindex={true} />
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center gap-4 mb-8">
           <div className="bg-primary/10 p-4 rounded-full">
             <User className="h-8 w-8 text-primary" />
           </div>
           <div>
             <h1 className="text-3xl font-heading font-bold" data-testid="text-welcome">Welcome back</h1>
             <p className="text-slate-600">{searchEmail}</p>
           </div>
           <Button variant="outline" size="sm" className="ml-auto" onClick={() => { setSearchEmail(""); setEmail(""); }}>
             Switch Account
           </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><CalendarDays className="h-5 w-5" /> Appointments</CardTitle>
                <CardDescription>Your upcoming and past bookings.</CardDescription>
              </CardHeader>
              <CardContent>
                {bookingsLoading ? (
                  <div className="flex items-center justify-center py-8 text-slate-500">
                    <Loader2 className="h-5 w-5 animate-spin mr-2" /> Loading...
                  </div>
                ) : !bookings || bookings.length === 0 ? (
                  <div className="text-center py-8 text-slate-500">
                    <CalendarDays className="h-10 w-10 mx-auto mb-3 text-slate-300" />
                    <p>No appointments found.</p>
                    <Button className="mt-4" asChild><Link href="/booking">Book Your First Appointment</Link></Button>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Service</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bookings.map((b: any) => (
                        <TableRow key={b.id} data-testid={`row-booking-${b.id}`}>
                          <TableCell className="font-medium">{b.serviceTitle}</TableCell>
                          <TableCell>{b.preferredDate}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={
                              b.status === 'confirmed' ? 'bg-green-50 text-green-700 border-green-200' :
                              b.status === 'pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                              'bg-slate-50 text-slate-700 border-slate-200'
                            }>
                              {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Bell className="h-5 w-5" /> Appointment Reminders</CardTitle>
                <CardDescription>Automated reminders for your upcoming appointments.</CardDescription>
              </CardHeader>
              <CardContent>
                {remindersLoading ? (
                  <div className="flex items-center justify-center py-8 text-slate-500">
                    <Loader2 className="h-5 w-5 animate-spin mr-2" /> Loading...
                  </div>
                ) : !reminders || reminders.length === 0 ? (
                  <div className="text-center py-8 text-slate-500">
                    <Bell className="h-10 w-10 mx-auto mb-3 text-slate-300" />
                    <p>No reminders scheduled yet.</p>
                    <p className="text-xs text-slate-400 mt-1">Reminders are automatically created when you book an appointment.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {reminders.map((r: any) => (
                      <div key={r.id} className="flex items-start gap-3 p-3 rounded-lg border bg-slate-50" data-testid={`reminder-${r.id}`}>
                        <div className={`p-2 rounded-full shrink-0 ${r.status === 'sent' ? 'bg-secondary/10 text-secondary' : 'bg-yellow-50 text-yellow-600'}`}>
                          {r.channel === 'email' ? <Mail className="h-4 w-4" /> : <MessageSquare className="h-4 w-4" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">{r.reminderType === '24h_before' ? '24-hour reminder' : '1-hour reminder'}</span>
                            <Badge variant="outline" className={`text-xs ${r.status === 'sent' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'}`}>
                              {r.status === 'sent' ? 'Sent' : 'Scheduled'}
                            </Badge>
                          </div>
                          <p className="text-xs text-slate-500 mt-1">{r.serviceTitle} — {r.appointmentDate}</p>
                          <div className="flex items-center gap-1 text-xs text-slate-400 mt-1">
                            <Clock className="h-3 w-3" />
                            <span>via {r.channel === 'email' ? 'Email' : 'SMS'}</span>
                            {r.sentAt && <span> · Sent {new Date(r.sentAt).toLocaleString()}</span>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><CreditCard className="h-5 w-5" /> Invoices</CardTitle>
                <CardDescription>View and pay your invoices.</CardDescription>
              </CardHeader>
              <CardContent>
                {invoicesLoading ? (
                  <div className="flex items-center justify-center py-8 text-slate-500">
                    <Loader2 className="h-5 w-5 animate-spin mr-2" /> Loading...
                  </div>
                ) : !invoices || invoices.length === 0 ? (
                  <div className="text-center py-8 text-slate-500">
                    <CreditCard className="h-10 w-10 mx-auto mb-3 text-slate-300" />
                    <p>No invoices found for this email.</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Invoice</TableHead>
                        <TableHead>Service</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {invoices.map((inv: any) => (
                        <TableRow key={inv.invoiceNumber} data-testid={`row-invoice-${inv.invoiceNumber}`}>
                          <TableCell className="font-medium font-mono">#{inv.invoiceNumber}</TableCell>
                          <TableCell>{inv.serviceTitle}</TableCell>
                          <TableCell>{formatAmount(inv.amount)}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={inv.status === 'paid' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'}>
                              {inv.status === 'paid' ? 'Paid' : 'Unpaid'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            {inv.status !== 'paid' && (
                              <Button size="sm" variant="outline" asChild>
                                <Link href="/payment">Pay Now</Link>
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-primary text-white border-none">
              <CardHeader>
                <CardTitle>Need Service?</CardTitle>
                <CardDescription className="text-slate-300">Schedule your next maintenance visit easily.</CardDescription>
              </CardHeader>
              <CardContent>
                 <Button className="w-full bg-white text-primary hover:bg-slate-100 font-bold" asChild>
                   <Link href="/booking">Book Appointment</Link>
                 </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="flex items-center gap-3 p-3 border rounded-lg bg-slate-50">
                    <CreditCard className="h-8 w-8 text-slate-700" />
                    <div>
                        <div className="font-semibold text-sm">Visa ending in 4242</div>
                        <div className="text-xs text-slate-500">Expires 12/26</div>
                    </div>
                    <Badge variant="secondary" className="ml-auto text-xs">Default</Badge>
                 </div>
                 <Button variant="outline" className="w-full text-slate-600 border-dashed">
                    <Plus className="mr-2 h-4 w-4" /> Add Payment Method
                 </Button>
                 <div className="flex items-center justify-center gap-1 text-xs text-slate-400 mt-2">
                    <Shield className="h-3 w-3" /> Processed securely by Stripe
                 </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
