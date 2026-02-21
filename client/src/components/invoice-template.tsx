import { COMPANY_NAME, COMPANY_PHONE } from "@/lib/constants";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export function InvoiceTemplate() {
  const currentDate = new Date().toLocaleDateString();
  const dueDate = new Date().toLocaleDateString();

  return (
    <div className="bg-white p-8 max-w-4xl mx-auto text-slate-900 font-sans border border-slate-200 shadow-sm print:shadow-none print:border-none print:p-0" id="invoice-template">
      {/* Header */}
      <div className="flex justify-between items-start mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-900 mb-1 tracking-tight uppercase">INVOICE</h1>
          <p className="text-slate-500 font-bold tracking-widest text-sm">#1336</p>
        </div>
        <div className="text-right">
          <h2 className="text-xl font-bold text-slate-900 mb-1">{COMPANY_NAME}</h2>
          <p className="text-sm text-slate-600">{COMPANY_PHONE}</p>
          <p className="text-sm text-slate-600">info@bernardinomartin.com</p>
          <p className="text-sm text-slate-600">www.bernardinomartin.com</p>
          <p className="text-sm text-slate-500 mt-2 font-medium">Lic #109283</p>
        </div>
      </div>

      <Separator className="my-8 bg-slate-200" />

      {/* Bill To / Details */}
      <div className="grid grid-cols-2 gap-12 mb-10">
        <div>
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Bill To</h3>
          <p className="font-bold text-lg text-slate-900">John Doe</p>
          <p className="text-slate-600">123 Maple Avenue</p>
          <p className="text-slate-600">Los Angeles, CA 90012</p>
          <p className="text-slate-600 mt-1">john.doe@example.com</p>
          <p className="text-slate-600">(555) 123-4567</p>
        </div>
        <div className="text-right">
          <div className="mb-3">
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest mr-4">Invoice Date:</span>
            <span className="font-semibold text-slate-900">{currentDate}</span>
          </div>
          <div className="mb-3">
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest mr-4">Due Date:</span>
            <span className="font-semibold text-slate-900">{dueDate}</span>
          </div>
          <div className="mt-6">
             <Badge variant="outline" className="px-4 py-1.5 text-sm font-bold bg-green-50 text-green-700 border-green-200 tracking-wider">
               PAID IN FULL
             </Badge>
          </div>
        </div>
      </div>

      {/* Line Items */}
      <div className="mb-10">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="w-[15%] font-bold text-slate-700 py-4">Category</TableHead>
              <TableHead className="w-[45%] font-bold text-slate-700 py-4">Description</TableHead>
              <TableHead className="text-right font-bold text-slate-700 py-4">Qty</TableHead>
              <TableHead className="text-right font-bold text-slate-700 py-4">Rate</TableHead>
              <TableHead className="text-right font-bold text-slate-700 py-4">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-semibold text-slate-900">HVAC</TableCell>
              <TableCell>
                <div className="font-medium text-slate-900">AC System Diagnostics & Repair</div>
                <div className="text-sm text-slate-500 mt-1">Replaced faulty run capacitor and cleared primary drain line.</div>
              </TableCell>
              <TableCell className="text-right">1</TableCell>
              <TableCell className="text-right">$185.00</TableCell>
              <TableCell className="text-right font-medium">$185.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold text-slate-900">Plumbing</TableCell>
              <TableCell>
                <div className="font-medium text-slate-900">Moen Smart Shutoff Installation</div>
                <div className="text-sm text-slate-500 mt-1">Professional installation of smart water valve on main line.</div>
              </TableCell>
              <TableCell className="text-right">1</TableCell>
              <TableCell className="text-right">$450.00</TableCell>
              <TableCell className="text-right font-medium">$450.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold text-slate-900">Electrical</TableCell>
              <TableCell>
                <div className="font-medium text-slate-900">Smart Thermostat Wiring</div>
                <div className="text-sm text-slate-500 mt-1">C-wire installation for new smart thermostat.</div>
              </TableCell>
              <TableCell className="text-right">1</TableCell>
              <TableCell className="text-right">$125.00</TableCell>
              <TableCell className="text-right font-medium">$125.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold text-slate-900">Solar</TableCell>
              <TableCell>
                <div className="font-medium text-slate-900">Panel Efficiency Inspection</div>
                <div className="text-sm text-slate-500 mt-1">Annual cleaning and performance check.</div>
              </TableCell>
              <TableCell className="text-right">1</TableCell>
              <TableCell className="text-right">$149.00</TableCell>
              <TableCell className="text-right font-medium">$149.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold text-slate-900">Network</TableCell>
              <TableCell>
                <div className="font-medium text-slate-900">Smart Home Integration Hub</div>
                <div className="text-sm text-slate-500 mt-1">Setup central network hub for HVAC and water monitoring.</div>
              </TableCell>
              <TableCell className="text-right">1</TableCell>
              <TableCell className="text-right">$89.00</TableCell>
              <TableCell className="text-right font-medium">$89.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* Totals */}
      <div className="flex justify-end mb-12">
        <div className="w-1/2 lg:w-1/3 space-y-3 bg-slate-50 p-6 rounded-xl border border-slate-100">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600 font-medium">Subtotal</span>
            <span className="font-semibold text-slate-900">$998.00</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-600 font-medium">Tax Rate (9.5%)</span>
            <span className="text-slate-600">9.5%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-600 font-medium">Tax Amount</span>
            <span className="font-semibold text-slate-900">$94.81</span>
          </div>
          <Separator className="my-3 border-slate-200" />
          <div className="flex justify-between items-center">
            <span className="text-lg font-black text-slate-900">Grand Total</span>
            <span className="text-xl font-black text-primary">$1,092.81</span>
          </div>
        </div>
      </div>

      {/* Footer / Terms */}
      <div className="text-sm text-slate-500 border-t border-slate-200 pt-8">
        <h4 className="font-bold text-slate-900 mb-2 uppercase tracking-wider text-xs">Terms & Conditions</h4>
        <p className="mb-4 max-w-2xl leading-relaxed">
          Payment is due upon receipt. All workmanship is guaranteed for 1 year from the date of service. 
          Please contact our office within 48 hours for any billing discrepancies.
          Thank you for choosing {COMPANY_NAME}!
        </p>
        <p className="italic text-center mt-12 text-xs opacity-70">
          This is an electronically generated invoice. No signature is required.
        </p>
      </div>
    </div>
  );
}
