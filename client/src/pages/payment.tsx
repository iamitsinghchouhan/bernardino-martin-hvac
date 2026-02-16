import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Lock, CheckCircle, Wallet, Building } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function Payment() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
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
        description: "Your receipt has been emailed to you.",
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
                    <Input id="email" type="email" placeholder="you@example.com" />
                  </div>
                  <Button type="submit" className="w-full bg-primary" disabled={isLoading}>
                    {isLoading ? "Searching..." : "Find Invoice"}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="justify-center bg-slate-50 py-4">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Lock className="h-3 w-3" />
                  <span>Secure 256-bit SSL Encryption</span>
                </div>
              </CardFooter>
            </Card>
          )}

          {step === 2 && (
            <Card className="shadow-xl">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Invoice #INV-2024-001</CardTitle>
                    <CardDescription>HVAC Maintenance Service</CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-slate-900">$149.00</div>
                    <div className="text-xs text-slate-500">Due Date: Today</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePayment} className="space-y-6">
                  <div className="space-y-3">
                    <Label>Payment Method</Label>
                    <RadioGroup defaultValue="card" className="grid grid-cols-2 gap-4">
                      <div>
                        <RadioGroupItem value="card" id="card" className="peer sr-only" />
                        <Label
                          htmlFor="card"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <CreditCard className="mb-3 h-6 w-6" />
                          Credit Card
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem value="bank" id="bank" className="peer sr-only" />
                        <Label
                          htmlFor="bank"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <Building className="mb-3 h-6 w-6" />
                          Bank Transfer
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-4 border p-4 rounded-md bg-slate-50/50">
                    <div className="space-y-2">
                      <Label htmlFor="card-name">Name on Card</Label>
                      <Input id="card-name" placeholder="John Doe" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="card-number">Card Number</Label>
                      <Input id="card-number" placeholder="0000 0000 0000 0000" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry</Label>
                        <Input id="expiry" placeholder="MM/YY" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" required />
                      </div>
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 h-12 text-lg" disabled={isLoading}>
                    {isLoading ? "Processing..." : "Pay $149.00"}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="justify-center border-t py-4">
                <div className="flex gap-4 text-slate-400">
                  <div className="h-6 w-10 bg-slate-200 rounded"></div>
                  <div className="h-6 w-10 bg-slate-200 rounded"></div>
                  <div className="h-6 w-10 bg-slate-200 rounded"></div>
                  <div className="h-6 w-10 bg-slate-200 rounded"></div>
                </div>
              </CardFooter>
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
                    Thank you for your payment. A receipt has been sent to your email.
                  </p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg text-left max-w-xs mx-auto text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Amount Paid:</span>
                    <span className="font-bold text-slate-900">$149.00</span>
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
                <div className="flex gap-4 justify-center pt-4">
                   <Button variant="outline" onClick={() => setStep(1)}>Pay Another Invoice</Button>
                   <Button asChild><a href="/">Return Home</a></Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
}
