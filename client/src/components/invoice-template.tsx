import { COMPANY_NAME, COMPANY_PHONE } from "@/lib/constants";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface InvoiceData {
  invoiceNumber?: string;
  customerName?: string;
  customerEmail?: string;
  serviceTitle?: string;
  amount?: number;
  status?: string;
  dueDate?: string;
  paidAt?: string | Date | null;
  createdAt?: string | Date;
}

export function InvoiceTemplate({ invoice }: { invoice?: InvoiceData }) {
  const inv = invoice || {};
  const number = inv.invoiceNumber || "1336";
  const name = inv.customerName || "Customer";
  const email = inv.customerEmail || "";
  const service = inv.serviceTitle || "HVAC Service";
  const amount = inv.amount ? (inv.amount / 100).toFixed(2) : "0.00";
  const status = inv.status || "unpaid";
  const created = inv.createdAt ? new Date(inv.createdAt).toLocaleDateString() : new Date().toLocaleDateString();
  const due = inv.dueDate || created;
  const paid = inv.paidAt ? new Date(inv.paidAt).toLocaleDateString() : null;

  return (
    <div className="bg-white p-8 max-w-4xl mx-auto text-slate-900 font-sans border border-slate-200 shadow-sm print:shadow-none print:border-none print:p-0" id="invoice-template">
      <div className="flex justify-between items-start mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-900 mb-1 tracking-tight uppercase">INVOICE</h1>
          <p className="text-slate-500 font-bold tracking-widest text-sm">#{number}</p>
        </div>
        <div className="text-right">
          <h2 className="text-xl font-bold text-slate-900 mb-1">{COMPANY_NAME}</h2>
          <p className="text-sm text-slate-600">{COMPANY_PHONE}</p>
          <p className="text-sm text-slate-600">info@bernardinomartin.com</p>
          <p className="text-sm text-slate-500 mt-2 font-medium">Lic #109283</p>
        </div>
      </div>

      <Separator className="my-8 bg-slate-200" />

      <div className="grid grid-cols-2 gap-12 mb-10">
        <div>
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Bill To</h3>
          <p className="font-bold text-lg text-slate-900">{name}</p>
          {email && <p className="text-slate-600 mt-1">{email}</p>}
        </div>
        <div className="text-right">
          <div className="mb-3">
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest mr-4">Invoice Date:</span>
            <span className="font-semibold text-slate-900">{created}</span>
          </div>
          <div className="mb-3">
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest mr-4">Due Date:</span>
            <span className="font-semibold text-slate-900">{due}</span>
          </div>
          <div className="mt-6">
            <Badge variant="outline" className={`px-4 py-1.5 text-sm font-bold tracking-wider ${status === "paid" ? "bg-green-50 text-green-700 border-green-200" : "bg-yellow-50 text-yellow-700 border-yellow-200"}`}>
              {status === "paid" ? "PAID IN FULL" : "PAYMENT DUE"}
            </Badge>
          </div>
          {paid && (
            <p className="text-xs text-slate-500 mt-2">Paid on {paid}</p>
          )}
        </div>
      </div>

      <div className="mb-10 bg-slate-50 rounded-xl border border-slate-100 overflow-hidden">
        <div className="grid grid-cols-3 gap-4 p-4 bg-slate-100 text-xs font-bold text-slate-700 uppercase tracking-wider">
          <span>Service</span>
          <span>Description</span>
          <span className="text-right">Amount</span>
        </div>
        <div className="grid grid-cols-3 gap-4 p-4">
          <span className="font-semibold text-slate-900">{service}</span>
          <span className="text-slate-600">Professional service provided</span>
          <span className="text-right font-medium text-slate-900">${amount}</span>
        </div>
      </div>

      <div className="flex justify-end mb-12">
        <div className="w-1/2 lg:w-1/3 space-y-3 bg-slate-50 p-6 rounded-xl border border-slate-100">
          <div className="flex justify-between items-center">
            <span className="text-lg font-black text-slate-900">Total</span>
            <span className="text-xl font-black text-primary">${amount}</span>
          </div>
        </div>
      </div>

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
