import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send, Loader2, X } from "lucide-react";

interface EmailComposerProps {
  contactId: number;
  customerName: string;
  customerEmail: string;
  onSent: () => void;
  onCancel: () => void;
}

export default function EmailComposer({
  contactId,
  customerName,
  customerEmail,
  onSent,
  onCancel,
}: EmailComposerProps) {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const quickReplies = [
    "Thank you for contacting Bernardino Martin HVAC. We received your inquiry and will get back to you shortly.",
    "We appreciate your interest in our services. One of our team members will contact you within 24 hours.",
    "Thank you for your inquiry. We offer flexible scheduling to accommodate your needs. Please let us know your preferred time.",
  ];

  const handleSend = async () => {
    if (!message.trim()) {
      setError("Please enter a message");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/admin/contacts/${contactId}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ replyMessage: message }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || "Failed to send email");
      }

      onSent();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Reply to Contact</h3>
        <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="bg-gray-50 p-3 rounded-lg">
        <p className="text-sm text-gray-600">
          <span className="font-medium">To:</span> {customerName}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Email:</span> {customerEmail}
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your Message *
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your reply here..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={6}
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div>
        <p className="text-xs text-gray-500 mb-2">Quick replies:</p>
        <div className="space-y-2">
          {quickReplies.map((reply, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setMessage(reply)}
              className="w-full text-left text-sm p-2 rounded border border-gray-200 hover:bg-gray-50 transition text-gray-600"
            >
              {reply.length > 80 ? reply.substring(0, 80) + "..." : reply}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button variant="outline" onClick={onCancel} disabled={isLoading} className="flex-1">
          Cancel
        </Button>
        <Button
          onClick={handleSend}
          disabled={isLoading || !message.trim()}
          className="flex-1 gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send size={16} />
              Send Email
            </>
          )}
        </Button>
      </div>
    </div>
  );
}