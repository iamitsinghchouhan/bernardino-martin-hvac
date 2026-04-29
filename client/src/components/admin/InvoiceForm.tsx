import { useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

type InvoiceLineItemDraft = {
  description: string;
  quantity: string;
  unitPrice: string;
};

type InvoiceFormProps = {
  onCreated?: () => void;
};

function createEmptyLineItem(): InvoiceLineItemDraft {
  return {
    description: "",
    quantity: "1",
    unitPrice: "",
  };
}

export function InvoiceForm({ onCreated }: InvoiceFormProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [serviceTitle, setServiceTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("draft");
  const [lineItems, setLineItems] = useState<InvoiceLineItemDraft[]>([
    createEmptyLineItem(),
  ]);

  const total = useMemo(() => {
    return lineItems.reduce((sum, item) => {
      const quantity = Number(item.quantity || 0);
      const unitPrice = Number(item.unitPrice || 0);
      return sum + quantity * unitPrice;
    }, 0);
  }, [lineItems]);

  const createInvoiceMutation = useMutation({
    mutationFn: async () => {
      const filteredLineItems = lineItems.filter(
        (item) => item.description.trim() && item.quantity.trim() && item.unitPrice.trim(),
      );

      const response = await apiRequest("POST", "/api/admin/invoices", {
        invoiceNumber: invoiceNumber.trim() || undefined,
        clientName: clientName.trim(),
        clientEmail: clientEmail.trim(),
        serviceTitle: serviceTitle.trim() || undefined,
        dueDate: dueDate || undefined,
        status,
        lineItems: filteredLineItems,
      });

      return response.json();
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["/api/admin/invoices"] }),
        queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] }),
        queryClient.invalidateQueries({ queryKey: ["/api/admin/cms/overview"] }),
      ]);
      toast({
        title: "Invoice created successfully",
      });
      setInvoiceNumber("");
      setClientName("");
      setClientEmail("");
      setServiceTitle("");
      setDueDate("");
      setStatus("draft");
      setLineItems([createEmptyLineItem()]);
      onCreated?.();
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to create invoice",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const canSubmit =
    clientName.trim() &&
    clientEmail.trim() &&
    lineItems.some(
      (item) => item.description.trim() && item.quantity.trim() && item.unitPrice.trim(),
    );

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Client Name</label>
          <Input value={clientName} onChange={(event) => setClientName(event.target.value)} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Client Email</label>
          <Input
            type="email"
            value={clientEmail}
            onChange={(event) => setClientEmail(event.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Invoice Number (optional)</label>
          <Input
            value={invoiceNumber}
            onChange={(event) => setInvoiceNumber(event.target.value)}
            placeholder="Leave blank to auto-generate"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Invoice Status</label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="sent">Sent</SelectItem>
              <SelectItem value="unpaid">Unpaid</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-slate-700">Service Summary (optional)</label>
          <Input
            value={serviceTitle}
            onChange={(event) => setServiceTitle(event.target.value)}
            placeholder="General Service, HVAC Repair, Solar Maintenance, etc."
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium text-slate-700">Due Date (optional)</label>
          <Input type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} />
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg font-semibold text-slate-900">Line Items</h3>
          <Button
            type="button"
            variant="outline"
            className="border-slate-300"
            onClick={() => setLineItems((current) => [...current, createEmptyLineItem()])}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Line Item
          </Button>
        </div>

        <div className="mt-4 space-y-4">
          {lineItems.map((item, index) => (
            <div key={`${index}-${item.description}`} className="grid gap-3 rounded-2xl border border-slate-200 p-4 md:grid-cols-[1.5fr,0.7fr,0.7fr,auto]">
              <Input
                value={item.description}
                onChange={(event) =>
                  setLineItems((current) =>
                    current.map((lineItem, lineIndex) =>
                      lineIndex === index
                        ? { ...lineItem, description: event.target.value }
                        : lineItem,
                    ),
                  )
                }
                placeholder="Description"
              />
              <Input
                type="number"
                min="0"
                step="0.01"
                value={item.quantity}
                onChange={(event) =>
                  setLineItems((current) =>
                    current.map((lineItem, lineIndex) =>
                      lineIndex === index
                        ? { ...lineItem, quantity: event.target.value }
                        : lineItem,
                    ),
                  )
                }
                placeholder="Qty"
              />
              <Input
                type="number"
                min="0"
                step="0.01"
                value={item.unitPrice}
                onChange={(event) =>
                  setLineItems((current) =>
                    current.map((lineItem, lineIndex) =>
                      lineIndex === index
                        ? { ...lineItem, unitPrice: event.target.value }
                        : lineItem,
                    ),
                  )
                }
                placeholder="Unit Price"
              />
              <Button
                type="button"
                variant="ghost"
                className="text-rose-700 hover:bg-rose-50 hover:text-rose-800"
                onClick={() =>
                  setLineItems((current) =>
                    current.length === 1
                      ? [createEmptyLineItem()]
                      : current.filter((_, lineIndex) => lineIndex !== index),
                  )
                }
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">Estimated total</p>
          <p className="text-2xl font-bold text-slate-950">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(total)}
          </p>
        </div>
        <Button
          type="button"
          className="bg-blue-700 text-white hover:bg-blue-800"
          onClick={() => createInvoiceMutation.mutate()}
          disabled={createInvoiceMutation.isPending || !canSubmit}
        >
          {createInvoiceMutation.isPending ? "Creating..." : "Create Invoice"}
        </Button>
      </div>
    </div>
  );
}
