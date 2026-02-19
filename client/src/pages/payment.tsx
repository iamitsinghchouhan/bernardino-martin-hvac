import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Lock, CheckCircle, Wallet, Building, ShieldCheck, FileText, Eye } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { InvoiceTemplate } from "@/components/invoice-template";

export default function Payment() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API lookup
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
    }, 1000);
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false);
      setStep(3);
      toast({
        title: "Payment Successful",
        description: `Your receipt has been emailed to ${email || "your email address"}.`,
      });
    }, 2000);
  };

  return (
    <Layout>
      <SEO title="Pay Online" description="Secure online payment portal for Bernardino Martin HVAC services." noindex={true} />
      <div className="container mx-auto px-4 py-20 min-h-[80vh] flex items-center justify-center bg-slate-50">
        <div className="w-full max-w-lg">
          {step === 1 && (
            <Card className="shadow-xl border-t-4 border-t-primary">
              <CardHeader className="text-center">
                <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-4">
                  <CreditCard className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Pay Your Invoice</CardTitle>
                <CardDescription>Enter your invoice number or email to get started.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLookup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="invoice">Invoice Number</Label>
                    <Input id="invoice" placeholder="INV-0000" required />
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
                    />
                  </div>
                  <Button type="submit" className="w-full bg-primary" disabled={isLoading}>
                    {isLoading ? "Searching..." : "Find Invoice"}
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

          {step === 2 && (
            <Card className="shadow-xl overflow-hidden">
              <div className="bg-slate-900 text-white p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="text-sm text-slate-400 mb-1">Total Due</div>
                    <div className="text-3xl font-bold">$149.00</div>
                  </div>
                  <Badge variant="secondary" className="bg-green-500/20 text-green-400 hover:bg-green-500/30 border-0">
                    Due Today
                  </Badge>
                </div>
                <div className="text-sm text-slate-400">
                    Invoice #INV-2024-001 • HVAC Maintenance Service
                </div>
              </div>
              
              <CardContent className="p-6">
                <form onSubmit={handlePayment} className="space-y-6">
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">Payment Method</Label>
                    
                    {/* Simulated Stripe Element Container */}
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
                                    />
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 flex gap-1">
                                        {/* Icons for card types */}
                                        <div className="w-4 h-2.5 bg-slate-300 rounded-sm"></div>
                                        <div className="w-4 h-2.5 bg-slate-300 rounded-sm"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="expiry" className="sr-only">Expiration</Label>
                                    <Input id="expiry" placeholder="MM / YY" className="font-mono border-slate-200 focus-visible:ring-0 focus-visible:border-primary" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="cvc" className="sr-only">CVC</Label>
                                    <Input id="cvc" placeholder="CVC" className="font-mono border-slate-200 focus-visible:ring-0 focus-visible:border-primary" required />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="card-name" className="sr-only">Cardholder Name</Label>
                                <Input id="card-name" placeholder="Name on card" className="border-slate-200 focus-visible:ring-0 focus-visible:border-primary" required />
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
                           <span className="font-bold tracking-tight">Pay</span>
                        </Button>
                        <Button type="button" variant="outline" className="h-11 bg-white text-black border border-slate-200 hover:bg-slate-50 flex items-center justify-center gap-2 font-medium">
                           <span className="font-bold text-blue-500">G</span> Pay
                        </Button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:bg-blue-600 h-12 text-lg font-bold shadow-lg shadow-blue-500/20" disabled={isLoading}>
                    {isLoading ? "Processing..." : "Pay $149.00"}
                  </Button>
                  
                  <div className="flex justify-center items-center gap-2 text-xs text-slate-400">
                    <ShieldCheck className="h-3 w-3" />
                    <span>Payments processed securely by Stripe</span>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {step === 3 && (
            <Card className="shadow-xl text-center p-8">
              <CardContent className="space-y-6 pt-6">
                <div className="mx-auto bg-green-100 p-4 rounded-full w-fit">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold text-slate-900">Payment Successful!</h2>
                  <p className="text-slate-600">
                    A receipt has been automatically sent to <strong>{email || "your email"}</strong>.
                  </p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg text-left max-w-xs mx-auto text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Amount Paid:</span>
                    <span className="font-bold text-slate-900">$149.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Payment Method:</span>
                    <span className="font-medium text-slate-900 flex items-center gap-1"><CreditCard className="h-3 w-3"/> •••• 4242</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Transaction ID:</span>
                    <span className="font-mono text-slate-900">TXN-88392</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Date:</span>
                    <span className="text-slate-900">{new Date().toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex gap-3 justify-center">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="gap-2">
                                <Eye className="h-4 w-4" />
                                Preview Invoice
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                            <InvoiceTemplate />
                        </DialogContent>
                    </Dialog>
                    
                    <Button variant="outline" className="gap-2" onClick={() => window.print()}>
                        <FileText className="h-4 w-4" />
                        Print Receipt
                    </Button>
                </div>

                <div className="flex gap-4 justify-center pt-4 border-t mt-6">
                   <Button variant="ghost" onClick={() => setStep(1)} className="text-slate-500 hover:text-slate-900">Pay Another Invoice</Button>
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

