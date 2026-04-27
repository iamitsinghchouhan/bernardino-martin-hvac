import { useState } from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DeleteConfirmationModalProps {
  itemType: "appointment" | "quote";
  itemName: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  isLoading?: boolean;
}

export default function DeleteConfirmationModal({
  itemType,
  itemName,
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
}: DeleteConfirmationModalProps) {
  const [reason, setReason] = useState("");
  const [customReason, setCustomReason] = useState("");

  if (!isOpen) return null;

  const reasons = [
    { value: "Customer request", label: "Customer request" },
    { value: "No response from customer", label: "No response from customer" },
    { value: "Rescheduled", label: "Rescheduled" },
    { value: "Duplicate entry", label: "Duplicate entry" },
    { value: "Other", label: "Other" },
  ];

  const handleSubmit = () => {
    const finalReason = reason === "Other" ? customReason : reason;
    if (!finalReason) {
      alert("Please select a reason");
      return;
    }
    onConfirm(finalReason);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
        <div className="flex items-start gap-3 p-6 border-b">
          <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Delete {itemType === "appointment" ? "Appointment" : "Quote"}?
            </h2>
            <p className="text-sm text-gray-600 mt-1">{itemName}</p>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-sm text-gray-700">
            This action cannot be undone. Please select a reason for deletion:
          </p>

          <div className="space-y-2">
            {reasons.map((r) => (
              <label
                key={r.value}
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
              >
                <input
                  type="radio"
                  name="reason"
                  value={r.value}
                  checked={reason === r.value}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-sm text-gray-700">{r.label}</span>
              </label>
            ))}
          </div>

          {reason === "Other" && (
            <textarea
              placeholder="Please explain the reason for deletion..."
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          )}
        </div>

        <div className="flex gap-3 p-6 border-t bg-gray-50">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleSubmit}
            disabled={isLoading || !reason}
            className="flex-1"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}