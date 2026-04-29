import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const DELETE_REASONS = [
  { value: "duplicate", label: "Duplicate request" },
  { value: "spam", label: "Spam or test submission" },
  { value: "customer-request", label: "Requested by customer" },
  { value: "invalid", label: "Invalid or incomplete request" },
  { value: "other", label: "Other reason" },
] as const;

type DeleteModalProps = {
  endpoint: string;
  entityLabel: string;
  queryKeysToInvalidate?: string[][];
  successMessage?: string;
  triggerLabel?: string;
  onDeleted?: () => void;
};

export function DeleteModal({
  endpoint,
  entityLabel,
  queryKeysToInvalidate = [],
  successMessage,
  triggerLabel = "Delete",
  onDeleted,
}: DeleteModalProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState<string>("duplicate");
  const [customReason, setCustomReason] = useState("");

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const resolvedReason =
        reason === "other"
          ? customReason.trim() || "Deleted by admin"
          : DELETE_REASONS.find((item) => item.value === reason)?.label ?? "Deleted by admin";

      await apiRequest("DELETE", endpoint, {
        reason: resolvedReason,
        deletedBy: "admin",
      });
    },
    onSuccess: async () => {
      await Promise.all(
        queryKeysToInvalidate.map((queryKey) =>
          queryClient.invalidateQueries({ queryKey }),
        ),
      );
      toast({
        title: successMessage ?? `${entityLabel} deleted successfully`,
      });
      setOpen(false);
      setReason("duplicate");
      setCustomReason("");
      onDeleted?.();
    },
    onError: (error: Error) => {
      toast({
        title: `Failed to delete ${entityLabel.toLowerCase()}`,
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="border-rose-200 text-rose-700 hover:bg-rose-50 hover:text-rose-800"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          {triggerLabel}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {entityLabel}?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will hide the {entityLabel.toLowerCase()} from active admin lists while preserving its database record.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Reason</label>
            <Select value={reason} onValueChange={setReason}>
              <SelectTrigger>
                <SelectValue placeholder="Select a reason" />
              </SelectTrigger>
              <SelectContent>
                {DELETE_REASONS.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {reason === "other" ? (
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Custom reason</label>
              <Textarea
                value={customReason}
                onChange={(event) => setCustomReason(event.target.value)}
                placeholder="Explain why this item is being deleted"
                rows={3}
              />
            </div>
          ) : null}
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteMutation.isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(event) => {
              event.preventDefault();
              deleteMutation.mutate();
            }}
            className="bg-rose-600 text-white hover:bg-rose-700"
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? "Deleting..." : `Delete ${entityLabel}`}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
