import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Mail, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

type EmailComposerProps = {
  contactId: number;
  recipientName: string;
  recipientEmail: string;
  existingReplyMessage?: string | null;
  isResolved?: boolean | null;
  onSent?: () => void;
};

export function EmailComposer({
  contactId,
  recipientName,
  recipientEmail,
  existingReplyMessage,
  isResolved,
  onSent,
}: EmailComposerProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [message, setMessage] = useState(existingReplyMessage ?? "");
  const [isOpen, setIsOpen] = useState(!isResolved);

  const replyMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", `/api/admin/contacts/${contactId}/reply`, {
        replyMessage: message.trim(),
        repliedBy: "admin",
        isResolved: true,
      });
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["/api/admin/contacts"] }),
        queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] }),
        queryClient.invalidateQueries({ queryKey: ["/api/admin/cms/overview"] }),
      ]);
      toast({
        title: "Reply sent successfully",
      });
      setIsOpen(false);
      onSent?.();
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to send reply",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  if (!isOpen) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-emerald-800">
              {isResolved ? "Resolved" : "Ready to reply"} for {recipientName}
            </p>
            <p className="mt-1 text-sm text-emerald-700">{recipientEmail}</p>
          </div>
          <Button
            type="button"
            variant="outline"
            className="border-emerald-300 text-emerald-800 hover:bg-emerald-100"
            onClick={() => setIsOpen(true)}
          >
            <Mail className="mr-2 h-4 w-4" />
            {existingReplyMessage ? "Send follow-up" : "Reply"}
          </Button>
        </div>
        {existingReplyMessage ? (
          <p className="mt-3 rounded-xl bg-white/80 p-3 text-sm leading-6 text-emerald-800">
            {existingReplyMessage}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-blue-900">Replying to {recipientName}</p>
          <p className="mt-1 text-sm text-blue-700">{recipientEmail}</p>
        </div>
        <Button
          type="button"
          variant="ghost"
          className="text-blue-700 hover:bg-blue-100"
          onClick={() => setIsOpen(false)}
        >
          Close
        </Button>
      </div>

      <div className="mt-4 space-y-3">
        <Textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Write your response here..."
          rows={5}
        />
        <Button
          type="button"
          onClick={() => replyMutation.mutate()}
          disabled={replyMutation.isPending || !message.trim()}
          className="bg-blue-700 text-white hover:bg-blue-800"
        >
          <Send className="mr-2 h-4 w-4" />
          {replyMutation.isPending ? "Sending..." : "Send Reply"}
        </Button>
      </div>
    </div>
  );
}
