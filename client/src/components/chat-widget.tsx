import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Phone, Calendar, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { COMPANY_NAME, COMPANY_PHONE, getWhatsAppLink } from "@/lib/constants";
import { Link } from "wouter";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  type?: "text" | "options";
  options?: { label: string; action: () => void }[];
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: `Hi there! Welcome to ${COMPANY_NAME}. How can we help you today?`,
      sender: "bot",
      type: "options",
      options: [
        { label: "Book a Service", action: () => handleOption("book") },
        { label: "Pay Bill / Invoice", action: () => handleOption("pay") },
        { label: "Emergency Service", action: () => handleOption("emergency") },
        { label: "Get a Quote", action: () => handleOption("quote") },
        { label: "Our Services", action: () => handleOption("services") },
      ],
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleOption = (option: string) => {
    const userMsg: Message = { id: Date.now().toString(), text: "", sender: "user" };
    
    let botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "",
        sender: "bot",
    };

    switch (option) {
      case "pay":
        userMsg.text = "I want to pay my bill.";
        botResponse.text = "You can pay your invoice securely online. Do you have your invoice number ready?";
        botResponse.type = "options";
        botResponse.options = [
            { label: "Pay Online Now", action: () => window.location.href = "/payment" },
            { label: "View My Invoices", action: () => window.location.href = "/dashboard" },
            { label: "Questions about Billing", action: () => window.open(getWhatsAppLink("I have a question about my bill"), "_blank") }
        ];
        break;
      case "book":
        userMsg.text = "I want to book a service.";
        botResponse.text = "Great! You can book an appointment online or call us directly.";
        botResponse.type = "options";
        botResponse.options = [
            { label: "Book Online Now", action: () => window.location.href = "/booking" },
            { label: "Call Us", action: () => window.location.href = `tel:${COMPANY_PHONE.replace(/\D/g, '')}` },
            { label: "Chat on WhatsApp", action: () => window.open(getWhatsAppLink("I'd like to book a service"), "_blank") }
        ];
        break;
      case "emergency":
        userMsg.text = "I have an emergency.";
        botResponse.text = `For emergencies, please call us immediately at ${COMPANY_PHONE}. We are available 24/7.`;
        botResponse.type = "options";
        botResponse.options = [
            { label: `Call ${COMPANY_PHONE}`, action: () => window.location.href = `tel:${COMPANY_PHONE.replace(/\D/g, '')}` },
            { label: "WhatsApp Emergency", action: () => window.open(getWhatsAppLink("URGENT: I have an HVAC/Plumbing emergency"), "_blank") }
        ];
        break;
      case "quote":
        userMsg.text = "I need a quote.";
        botResponse.text = "We'd be happy to provide a quote. What service are you interested in?";
        botResponse.type = "options";
        botResponse.options = [
            { label: "HVAC Installation/Repair", action: () => handleServiceSelect("hvac") },
            { label: "Solar System", action: () => handleServiceSelect("solar") },
            { label: "Plumbing", action: () => handleServiceSelect("plumbing") }
        ];
        break;
      case "services":
        userMsg.text = "What services do you offer?";
        botResponse.text = "We offer a wide range of services including AC Repair, Heating, Solar Installation, and Plumbing.";
        botResponse.type = "options";
        botResponse.options = [
            { label: "View All Services", action: () => window.location.href = "/services" },
            { label: "Chat with an Expert", action: () => window.open(getWhatsAppLink("Tell me more about your services"), "_blank") }
        ];
        break;
      default:
        return;
    }
    setMessages((prev) => [...prev, userMsg, botResponse]);
  };

  const handleServiceSelect = (service: string) => {
      const userMsg: Message = { id: Date.now().toString(), text: service === 'hvac' ? 'HVAC' : service === 'solar' ? 'Solar' : 'Plumbing', sender: "user" };
      const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: "Perfect. The fastest way to get a quote is to send us a message on WhatsApp or book a consultation.",
          sender: "bot",
          type: "options",
          options: [
              { label: "Get Quote via WhatsApp", action: () => window.open(getWhatsAppLink(`I need a quote for ${service} services`), "_blank") },
              { label: "Book Consultation", action: () => window.location.href = "/booking" }
          ]
      };
      setMessages((prev) => [...prev, userMsg, botResponse]);
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    const userMsg: Message = { id: Date.now().toString(), text: inputValue, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");

    // Simulate bot thinking
    setTimeout(() => {
        const botResponse: Message = {
            id: (Date.now() + 1).toString(),
            text: "Thanks for your message! Our team is best reached via phone or WhatsApp for custom inquiries.",
            sender: "bot",
            type: "options",
            options: [
                { label: "Chat on WhatsApp", action: () => window.open(getWhatsAppLink(inputValue), "_blank") },
                { label: `Call ${COMPANY_PHONE}`, action: () => window.location.href = `tel:${COMPANY_PHONE.replace(/\D/g, '')}` }
            ]
        };
        setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 rounded-full h-14 w-14 shadow-2xl transition-all duration-300 ${isOpen ? 'rotate-90 bg-slate-800 hover:bg-slate-900' : 'bg-primary hover:bg-blue-600 animate-bounce-subtle'}`}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-7 w-7" />}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 z-50 w-[90vw] sm:w-[380px] h-[500px] shadow-2xl flex flex-col animate-in slide-in-from-bottom-10 fade-in duration-300 border-primary/20">
          <CardHeader className="bg-primary text-white p-4 rounded-t-xl flex flex-row items-center gap-3">
            <div className="relative">
                <Avatar className="h-10 w-10 border-2 border-white/50">
                <AvatarImage src="/images/technician.png" />
                <AvatarFallback>BM</AvatarFallback>
                </Avatar>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-primary rounded-full"></span>
            </div>
            <div>
              <CardTitle className="text-lg font-bold">Customer Support</CardTitle>
              <p className="text-xs text-blue-100">Online | Replies instantly</p>
            </div>
          </CardHeader>
          
          <CardContent className="flex-1 p-0 overflow-hidden bg-slate-50">
            <ScrollArea className="h-full p-4">
              <div className="space-y-4 flex flex-col">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                        msg.sender === "user"
                          ? "bg-primary text-white rounded-br-none"
                          : "bg-white text-slate-800 border border-slate-100 rounded-bl-none"
                      }`}
                    >
                      <p>{msg.text}</p>
                      {msg.options && (
                        <div className="mt-3 flex flex-col gap-2">
                          {msg.options.map((opt, idx) => (
                            <Button
                                key={idx}
                                variant="outline"
                                size="sm"
                                onClick={opt.action}
                                className="w-full justify-between text-xs font-semibold hover:bg-blue-50 hover:text-primary hover:border-blue-200 transition-colors bg-slate-50"
                            >
                                {opt.label}
                                <ChevronRight className="h-3 w-3 opacity-50" />
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={scrollRef} />
              </div>
            </ScrollArea>
          </CardContent>

          <CardFooter className="p-3 bg-white border-t">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex w-full gap-2"
            >
              <Input
                placeholder="Type a message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 bg-slate-50 border-slate-200 focus-visible:ring-primary"
              />
              <Button type="submit" size="icon" className="bg-primary hover:bg-blue-600">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </>
  );
}
