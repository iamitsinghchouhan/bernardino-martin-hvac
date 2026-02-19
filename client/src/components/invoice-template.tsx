import { COMPANY_NAME, COMPANY_PHONE } from "@/lib/constants";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function InvoiceTemplate() {
  const currentDate = new Date().toLocaleDateString();
  const dueDate = new Date().toLocaleDateString();

  return (
    <div className="bg-white p-8 max-w-3xl mx-auto text-slate-900 font-sans border border-slate-200 shadow-sm print:shadow-none print:border-none" id="invoice-template">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">INVOICE</h1>
          <p className="text-slate-500 font-medium">#INV-2024-001</p>
        </div>
        <div className="text-right">
          <h2 className="text-lg font-bold text-slate-900">{COMPANY_NAME}</h2>
          <p className="text-sm text-slate-600">Los Angeles, CA</p>
          <p className="text-sm text-slate-600">Lic #109283</p>
          <p className="text-sm text-slate-600">{COMPANY_PHONE}</p>
        </div>
      </div>

      <Separator className="my-6" />

      {/* Bill To / Details */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Bill To</h3>
          <p className="font-semibold">John Doe</p>
          <p className="text-slate-600">123 Maple Avenue</p>
          <p className="text-slate-600">Los Angeles, CA 90012</p>
          <p className="text-slate-600">john.doe@example.com</p>
        </div>
        <div className="text-right">
          <div className="mb-2">
            <span className="text-sm font-bold text-slate-500 uppercase tracking-wider mr-4">Date:</span>
            <span className="font-medium">{currentDate}</span>
          </div>
          <div className="mb-2">
            <span className="text-sm font-bold text-slate-500 uppercase tracking-wider mr-4">Due Date:</span>
            <span className="font-medium">{dueDate}</span>
          </div>
          <div>
             <span className="text-sm font-bold text-slate-500 uppercase tracking-wider mr-4">Status:</span>
             <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">PAID</span>
          </div>
        </div>
      </div>

      {/* Line Items */}
      <div className="mb-8">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50%]">Description</TableHead>
              <TableHead className="text-right">Qty</TableHead>
              <TableHead className="text-right">Rate</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">
                HVAC Maintenance Service
                <span className="block text-xs text-slate-500 font-normal mt-1">
                  Routine inspection, filter change, and system tune-up.
                </span>
              </TableCell>
              <TableCell className="text-right">1</TableCell>
              <TableCell className="text-right">$149.00</TableCell>
              <TableCell className="text-right">$149.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* Totals */}
      <div className="flex justify-end mb-8">
        <div className="w-1/3 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Subtotal</span>
            <span>$149.00</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Tax (0%)</span>
            <span>$0.00</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>$149.00</span>
          </div>
        </div>
      </div>

      {/* Footer / Terms */}
      <div className="text-sm text-slate-500 mt-12 pt-8 border-t border-slate-100">
        <h4 className="font-bold text-slate-700 mb-2">Terms & Conditions</h4>
        <p className="mb-4">
          Payment is due upon receipt. Please make checks payable to {COMPANY_NAME}. 
          Thank you for your business!
        </p>
        <p className="italic text-center mt-8">
          This is an electronically generated invoice.
        </p>
      </div>
    </div>
  );
}
