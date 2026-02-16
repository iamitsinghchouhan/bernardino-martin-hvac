import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, User } from "lucide-react";

export default function Dashboard() {
  const invoices = [
    { id: "INV-2024-001", date: "Feb 15, 2024", service: "HVAC Maintenance", amount: "$149.00", status: "Paid" },
    { id: "INV-2023-089", date: "Nov 12, 2023", service: "Heating Repair", amount: "$289.00", status: "Paid" },
    { id: "INV-2023-042", date: "Jul 05, 2023", service: "AC Tune-Up", amount: "$89.00", status: "Paid" },
  ];

  return (
    <Layout>
      <SEO title="Customer Portal" description="Access your service history and invoices." noindex={true} />
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center gap-4 mb-8">
           <div className="bg-primary/10 p-4 rounded-full">
             <User className="h-8 w-8 text-primary" />
           </div>
           <div>
             <h1 className="text-3xl font-heading font-bold">Welcome back, John</h1>
             <p className="text-slate-600">Manage your services and payments</p>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Invoices</CardTitle>
              <CardDescription>View and download your payment history.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((inv) => (
                    <TableRow key={inv.id}>
                      <TableCell className="font-medium">{inv.id}</TableCell>
                      <TableCell>{inv.date}</TableCell>
                      <TableCell>{inv.service}</TableCell>
                      <TableCell>{inv.amount}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          {inv.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4 text-slate-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="bg-primary text-white border-none">
              <CardHeader>
                <CardTitle>Need Service?</CardTitle>
                <CardDescription className="text-blue-100">Schedule your next maintenance visit easily.</CardDescription>
              </CardHeader>
              <CardContent>
                 <Button className="w-full bg-white text-primary hover:bg-slate-100 font-bold">
                   Book Appointment
                 </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div>
                   <div className="text-sm text-slate-500">Customer Name</div>
                   <div className="font-medium">John Doe</div>
                 </div>
                 <div>
                   <div className="text-sm text-slate-500">Email</div>
                   <div className="font-medium">john.doe@example.com</div>
                 </div>
                 <div>
                   <div className="text-sm text-slate-500">Phone</div>
                   <div className="font-medium">(555) 123-4567</div>
                 </div>
                 <div className="pt-4">
                   <Button variant="outline" className="w-full">Edit Profile</Button>
                 </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
