import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Phone, Calendar, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { COMPANY_FULL, COMPANY_PHONE, getWhatsAppLink } from "@/lib/constants";
import { Link } from "wouter";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  type?: "text" | "options";
  options?: { label: string; action: () => void }[];
}

// A handful of different opening lines — one is picked at random each time the widget greets a
// visitor, so the site doesn't say the exact same thing on every visit.
const GREETINGS = [
  "Need emergency service? We're on it — day or night.",
  "Something acting up at home? Tell us what's going on and we'll take it from here.",
  "Looking for help in your area? Let's get you sorted.",
  "Ready to book a service? I can get that started right now.",
  "Got a home project on your mind? Let's talk it through.",
];

function randomGreeting() {
  return GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  // Lazy initializer — runs once per mount, so a fresh page load (or a re-mount when the SPA
  // swaps routes) has a real chance at a different greeting rather than always showing the same one.
  // References the hoisted `handleOption` function declaration below (safe — function
  // declarations are available anywhere in scope, not just after their line in the file).
  const [messages, setMessages] = useState<Message[]>(() => [
    {
      id: "1",
      text: randomGreeting(),
      sender: "bot",
      type: "options",
      options: [
        { label: "Want to Book a Service?", action: () => handleOption("book") },
        { label: "Need Emergency Service?", action: () => handleOption("emergency") },
        { label: "Get a Free Quote", action: () => handleOption("quote") },
        { label: "Pay Bill / Invoice", action: () => handleOption("pay") },
        { label: "See Our Services", action: () => handleOption("services") },
      ],
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Greets the visitor proactively, the way a real front-desk person would — every time this
  // component mounts (every fresh page load), not gated behind a "once per session" flag.
  useEffect(() => {
    const timer = window.setTimeout(() => setIsOpen(true), 3000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Function declaration (not `const`) — hoisted, so the lazy useState initializer above can
  // safely close over it even though it's defined later in the component body.
  function handleOption(option: string) {
    const userMsg: Message = { id: Date.now().toString(), text: "", sender: "user" };
    
    let botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "",
        sender: "bot",
    };

    switch (option) {
      case "pay":
        userMsg.text = "I want to pay my bill.";
        botResponse.text = "You can pay your invoice securely online via Stripe. Do you have your invoice number ready?";
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
        aria-label={isOpen ? "Close chat" : "Open chat"}
        aria-expanded={isOpen}
        className={`fixed bottom-6 right-6 z-50 rounded-full h-14 w-14 shadow-2xl transition-all duration-300 ${isOpen ? 'rotate-90 bg-slate-800 hover:bg-slate-900' : 'bg-[var(--rb-orange)] hover:bg-[var(--rb-orange-dark)] animate-bounce-subtle'}`}
      >
        {isOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <MessageCircle className="h-7 w-7" aria-hidden="true" />}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 z-50 w-[85vw] sm:w-[320px] h-[420px] shadow-2xl flex flex-col animate-in slide-in-from-bottom-10 fade-in duration-300 border-none overflow-hidden">
          <CardHeader className="bg-gradient-to-br from-[var(--rb-navy)] via-[var(--rb-navy)] to-[var(--rb-orange)] text-white p-4 flex flex-row items-center gap-3">
            <div className="relative">
                <Avatar className="h-10 w-10 border-2 border-white/50 bg-white p-1">
                <AvatarImage src="/images/rebrand/logo-redesign.png" className="object-contain" />
                <AvatarFallback>BM</AvatarFallback>
                </Avatar>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-secondary border-2 border-primary rounded-full"></span>
            </div>
            <div>
              <CardTitle className="text-lg font-bold">Martin</CardTitle>
              <p className="text-xs text-slate-300">Online now — replies in minutes</p>
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
                          ? "bg-[var(--rb-navy)] text-white rounded-br-none"
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
                                className="w-full justify-between text-xs font-semibold hover:bg-orange-50 hover:text-[var(--rb-orange)] hover:border-[var(--rb-orange)]/30 transition-colors bg-slate-50"
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
                aria-label="Chat message"
              />
              <Button type="submit" size="icon" className="bg-[var(--rb-orange)] hover:bg-[var(--rb-orange-dark)]" aria-label="Send message">
                <Send className="h-4 w-4" aria-hidden="true" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </>
  );
}
