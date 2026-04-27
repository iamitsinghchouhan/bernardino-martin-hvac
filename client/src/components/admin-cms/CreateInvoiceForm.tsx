import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Plus, Trash2 } from "lucide-react";

interface LineItem {
  description: string;
  quantity: number;
  unitPrice: number;
}

interface CreateInvoiceFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export default function CreateInvoiceForm({ onSuccess, onCancel }: CreateInvoiceFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    serviceType: "",
    description: "",
    taxPercent: 0,
    dueDate: "",
    paymentInstructions: "",
    warrantyInfo: "",
    notes: "",
  });

  const [lineItems, setLineItems] = useState<LineItem[]>([
    { description: "", quantity: 1, unitPrice: 0 },
  ]);

  const addLineItem = () => {
    setLineItems([...lineItems, { description: "", quantity: 1, unitPrice: 0 }]);
  };

  const removeLineItem = (index: number) => {
    if (lineItems.length > 1) {
      setLineItems(lineItems.filter((_, i) => i !== index));
    }
  };

  const updateLineItem = (index: number, field: keyof LineItem, value: string | number) => {
    const updated = [...lineItems];
    updated[index] = { ...updated[index], [field]: value };
    setLineItems(updated);
  };

  const subtotal = lineItems.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const tax = Math.round(subtotal * (formData.taxPercent / 100));
  const total = subtotal + tax;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          lineItems: lineItems.filter((item) => item.description && item.unitPrice > 0),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || "Failed to create invoice");
      }

      onSuccess();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Create New Invoice</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Client Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="clientName">Client Name *</Label>
              <Input
                id="clientName"
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="clientEmail">Client Email *</Label>
              <Input
                id="clientEmail"
                type="email"
                value={formData.clientEmail}
                onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="clientPhone">Client Phone</Label>
              <Input
                id="clientPhone"
                value={formData.clientPhone}
                onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="serviceType">Service Type *</Label>
              <Select
                value={formData.serviceType}
                onValueChange={(value) => setFormData({ ...formData, serviceType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="HVAC Repair">HVAC Repair</SelectItem>
                  <SelectItem value="HVAC Installation">HVAC Installation</SelectItem>
                  <SelectItem value="AC Repair">AC Repair</SelectItem>
                  <SelectItem value="Heating Service">Heating Service</SelectItem>
                  <SelectItem value="Solar Installation">Solar Installation</SelectItem>
                  <SelectItem value="Plumbing">Plumbing</SelectItem>
                  <SelectItem value="Maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Line Items */}
          <div>
            <Label className="mb-2 block">Line Items *</Label>
            <div className="space-y-3">
              {lineItems.map((item, index) => (
                <div key={index} className="flex gap-2 items-end">
                  <div className="flex-1">
                    <Input
                      placeholder="Description"
                      value={item.description}
                      onChange={(e) => updateLineItem(index, "description", e.target.value)}
                    />
                  </div>
                  <div className="w-20">
                    <Input
                      type="number"
                      placeholder="Qty"
                      value={item.quantity || ""}
                      onChange={(e) => updateLineItem(index, "quantity", parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div className="w-28">
                    <Input
                      type="number"
                      placeholder="Price"
                      value={item.unitPrice || ""}
                      onChange={(e) => updateLineItem(index, "unitPrice", parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeLineItem(index)}
                    disabled={lineItems.length === 1}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              ))}
            </div>
            <Button type="button" variant="outline" onClick={addLineItem} className="mt-2">
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </div>

          {/* Totals */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between text-sm">
              <span>Subtotal:</span>
              <span>${(subtotal / 100).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span>Tax (%):</span>
              <Input
                type="number"
                className="w-20 h-8 text-right"
                value={formData.taxPercent}
                onChange={(e) => setFormData({ ...formData, taxPercent: parseInt(e.target.value) || 0 })}
              />
              <span>${(tax / 100).toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t">
              <span>Total:</span>
              <span>${(total / 100).toFixed(2)}</span>
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dueDate">Due Date *</Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={2}
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Invoice"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}