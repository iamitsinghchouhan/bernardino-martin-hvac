import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { CreditCard, Lock, CheckCircle, ShieldCheck, FileText, Eye, Loader2, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { InvoiceTemplate } from "@/components/invoice-template";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export default function Payment() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [foundInvoices, setFoundInvoices] = useState<any[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [lookupError, setLookupError] = useState("");
  const { toast } = useToast();

  const lookupMutation = useMutation({
    mutationFn: async () => {
      const params = new URLSearchParams();
      if (invoiceNumber) params.set("invoiceNumber", invoiceNumber);
      else if (email) params.set("email", email);
      const res = await apiRequest("GET", `/api/invoices/lookup?${params.toString()}`);
      return res.json();
    },
    onSuccess: (data: any[]) => {
      setFoundInvoices(data);
      setLookupError("");
      if (data.length === 1) {
        setSelectedInvoice(data[0]);
        setStep(2);
      } else {
        setStep(2);
      }
    },
    onError: (error: any) => {
      const msg = error.message || "";
      if (msg.includes("404")) {
        setLookupError("No invoices found. Please check your invoice number or email and try again.");
      } else {
        setLookupError("Something went wrong. Please try again or call us directly.");
      }
    },
  });

  const payMutation = useMutation({
    mutationFn: async (invNumber: string) => {
      const res = await apiRequest("POST", `/api/invoices/${invNumber}/pay`);
      return res.json();
    },
    onSuccess: (data: any) => {
      setSelectedInvoice(data);
      setStep(3);
      toast({
        title: "Payment Successful",
        description: `Your receipt has been emailed to ${selectedInvoice?.customerEmail || email || "your email address"}.`,
      });
    },
    onError: () => {
      toast({
        title: "Payment Failed",
        description: "Please try again or call us for assistance.",
        variant: "destructive",
      });
    },
  });

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!invoiceNumber && !email) return;
    setLookupError("");
    lookupMutation.mutate();
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInvoice) return;
    payMutation.mutate(selectedInvoice.invoiceNumber);
  };

  const formatAmount = (cents: number) => {
    return `$${(cents / 100).toFixed(2)}`;
  };

  return (
    <Layout>
      <SEO title="Pay Your HVAC Invoice Online – Secure Payment Portal" description="Pay your Bernardino Martin HVAC service invoice online. Secure, fast & convenient payment for heating, cooling, solar & plumbing services in Los Angeles." noindex={true} />
      <div className="container mx-auto px-4 py-20 min-h-[80vh] flex items-center justify-center bg-slate-50">
        <div className="w-full max-w-lg">
          {step === 1 && (
            <Card className="shadow-xl border-t-4 border-t-primary">
              <CardHeader className="text-center">
                <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-4">
                  <CreditCard className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl" data-testid="text-pay-title">Pay Your Invoice</CardTitle>
                <CardDescription>Enter your invoice number or email to get started.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLookup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="invoice">Invoice Number</Label>
                    <Input id="invoice" placeholder="INV-1336" value={invoiceNumber} onChange={e => setInvoiceNumber(e.target.value)} data-testid="input-invoice-number" />
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">Or</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                        id="email" 
                        type="email" 
                        placeholder="you@example.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        data-testid="input-invoice-email"
                    />
                  </div>
                  {lookupError && (
                    <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      {lookupError}
                    </div>
                  )}
                  <Button type="submit" className="w-full bg-primary" disabled={lookupMutation.isPending || (!invoiceNumber && !email)} data-testid="button-find-invoice">
                    {lookupMutation.isPending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Searching...</> : "Find Invoice"}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="justify-center bg-slate-50 py-4 border-t">
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <Lock className="h-3 w-3" />
                  <span>Secured by Stripe</span>
                </div>
              </CardFooter>
            </Card>
          )}

          {step === 2 && selectedInvoice && (
            <Card className="shadow-xl overflow-hidden">
              <div className="bg-slate-900 text-white p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="text-sm text-slate-400 mb-1">Total Due</div>
                    <div className="text-3xl font-bold" data-testid="text-invoice-amount">{formatAmount(selectedInvoice.amount)}</div>
                  </div>
                  <Badge variant="secondary" className={`border-0 ${selectedInvoice.status === 'paid' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                    {selectedInvoice.status === 'paid' ? 'Paid' : 'Due Today'}
                  </Badge>
                </div>
                <div className="text-sm text-slate-400">
                    Invoice #{selectedInvoice.invoiceNumber} &bull; {selectedInvoice.serviceTitle}
                </div>
              </div>
              
              <CardContent className="p-6">
                {selectedInvoice.status === 'paid' ? (
                  <div className="text-center py-6">
                    <CheckCircle className="h-12 w-12 text-secondary mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Already Paid</h3>
                    <p className="text-slate-600 mb-4">This invoice has already been paid.</p>
                    <Button variant="outline" onClick={() => { setStep(1); setSelectedInvoice(null); }}>Look Up Another Invoice</Button>
                  </div>
                ) : (
                  <form onSubmit={handlePayment} className="space-y-6">
                    <div className="space-y-3">
                      <Label className="text-base font-semibold">Payment Method</Label>
                      
                      <div className="border rounded-lg overflow-hidden transition-all focus-within:ring-2 focus-within:ring-primary focus-within:border-primary">
                          <div className="p-3 bg-slate-50 border-b flex items-center gap-2 text-sm font-medium text-slate-700">
                              <CreditCard className="h-4 w-4" />
                              Card Information
                          </div>
                          <div className="p-4 bg-white space-y-4">
                              <div className="space-y-2">
                                  <Label htmlFor="card-number" className="sr-only">Card Number</Label>
                                  <div className="relative">
                                      <Input 
                                          id="card-number" 
                                          placeholder="0000 0000 0000 0000" 
                                          className="pl-10 font-mono tracking-wider border-slate-200 focus-visible:ring-0 focus-visible:border-primary"
                                          required 
                                          data-testid="input-card-number"
                                      />
                                      <div className="absolute left-3 top-1/2 -translate-y-1/2 flex gap-1">
                                          <div className="w-4 h-2.5 bg-slate-300 rounded-sm"></div>
                                          <div className="w-4 h-2.5 bg-slate-300 rounded-sm"></div>
                                      </div>
                                  </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                      <Label htmlFor="expiry" className="sr-only">Expiration</Label>
                                      <Input id="expiry" placeholder="MM / YY" className="font-mono border-slate-200 focus-visible:ring-0 focus-visible:border-primary" required data-testid="input-expiry" />
                                  </div>
                                  <div className="space-y-2">
                                      <Label htmlFor="cvc" className="sr-only">CVC</Label>
                                      <Input id="cvc" placeholder="CVC" className="font-mono border-slate-200 focus-visible:ring-0 focus-visible:border-primary" required data-testid="input-cvc" />
                                  </div>
                              </div>
                              <div className="space-y-2">
                                  <Label htmlFor="card-name" className="sr-only">Cardholder Name</Label>
                                  <Input id="card-name" placeholder="Name on card" className="border-slate-200 focus-visible:ring-0 focus-visible:border-primary" required data-testid="input-card-name" />
                              </div>
                          </div>
                      </div>
                      
                      <div className="relative">
                          <div className="absolute inset-0 flex items-center">
                              <span className="w-full border-t" />
                          </div>
                          <div className="relative flex justify-center text-xs uppercase">
                              <span className="bg-background px-2 text-muted-foreground">Or pay with</span>
                          </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                          <Button type="button" variant="outline" className="h-11 bg-black text-white hover:bg-black/90 border-0 flex items-center justify-center gap-2">
                             <span className="font-bold tracking-tight"> Pay</span>
                          </Button>
                          <Button type="button" variant="outline" className="h-11 bg-white text-black border border-slate-200 hover:bg-slate-50 flex items-center justify-center gap-2 font-medium">
                             <span className="font-bold text-blue-500">G</span> Pay
                          </Button>
                      </div>
                    </div>

                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90 h-12 text-lg font-bold shadow-lg shadow-primary/20" disabled={payMutation.isPending} data-testid="button-pay-now">
                      {payMutation.isPending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...</> : `Pay ${formatAmount(selectedInvoice.amount)}`}
                    </Button>
                    
                    <div className="flex justify-center items-center gap-2 text-xs text-slate-400">
                      <ShieldCheck className="h-3 w-3" />
                      <span>Payments processed securely by Stripe</span>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          )}

          {step === 2 && !selectedInvoice && foundInvoices.length > 0 && (
            <Card className="shadow-xl border-t-4 border-t-primary">
              <CardHeader>
                <CardTitle>Your Invoices</CardTitle>
                <CardDescription>We found {foundInvoices.length} invoice(s) for your account.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {foundInvoices.map((inv: any) => (
                  <div
                    key={inv.invoiceNumber}
                    className="p-4 border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all"
                    data-testid={`card-invoice-lookup-${inv.invoiceNumber}`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="font-semibold text-slate-900">#{inv.invoiceNumber}</div>
                        <div className="text-sm text-slate-500">{inv.serviceTitle}</div>
                        {inv.dueDate && <div className="text-xs text-slate-400 mt-1">Due: {inv.dueDate}</div>}
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-slate-900">{formatAmount(inv.amount)}</div>
                        <Badge variant="outline" className={inv.status === 'paid' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'}>
                          {inv.status === 'paid' ? 'Paid' : 'Unpaid'}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {inv.status !== 'paid' && (
                        <Button size="sm" className="bg-primary" onClick={() => setSelectedInvoice(inv)} data-testid={`button-select-invoice-${inv.invoiceNumber}`}>
                          Pay Now
                        </Button>
                      )}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline" className="gap-1" data-testid={`button-view-invoice-${inv.invoiceNumber}`}>
                            <Eye className="h-3 w-3" /> View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                          <InvoiceTemplate invoice={inv} />
                          <div className="flex justify-end gap-2 mt-4 print:hidden">
                            <Button variant="outline" size="sm" onClick={() => window.print()} className="gap-1">
                              <FileText className="h-3 w-3" /> Print / Save PDF
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="justify-center border-t py-3">
                <Button variant="ghost" size="sm" onClick={() => { setStep(1); setFoundInvoices([]); }} className="text-slate-500">
                  Look Up Different Invoice
                </Button>
              </CardFooter>
            </Card>
          )}

          {step === 3 && selectedInvoice && (
            <Card className="shadow-xl text-center p-8">
              <CardContent className="space-y-6 pt-6">
                <div className="mx-auto bg-secondary/10 p-4 rounded-full w-fit">
                  <CheckCircle className="h-12 w-12 text-secondary" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold text-slate-900" data-testid="text-payment-success">Payment Successful!</h2>
                  <p className="text-slate-600">
                    A receipt has been automatically sent to <strong>{selectedInvoice.customerEmail}</strong>.
                  </p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg text-left max-w-xs mx-auto text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Amount Paid:</span>
                    <span className="font-bold text-slate-900">{formatAmount(selectedInvoice.amount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Invoice:</span>
                    <span className="font-mono text-slate-900">#{selectedInvoice.invoiceNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Date:</span>
                    <span className="text-slate-900">{new Date().toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex gap-3 justify-center">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="gap-2" data-testid="button-preview-invoice">
                                <Eye className="h-4 w-4" />
                                Preview Invoice
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                            <InvoiceTemplate invoice={selectedInvoice} />
                        </DialogContent>
                    </Dialog>
                    
                    <Button variant="outline" className="gap-2" onClick={() => window.print()} data-testid="button-print-receipt">
                        <FileText className="h-4 w-4" />
                        Print Receipt
                    </Button>
                </div>

                <div className="flex gap-4 justify-center pt-4 border-t mt-6">
                   <Button variant="ghost" onClick={() => { setStep(1); setSelectedInvoice(null); setFoundInvoices([]); }} className="text-slate-500 hover:text-slate-900">Pay Another Invoice</Button>
                   <Button asChild><a href="/dashboard">Go to Dashboard</a></Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
}
