import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Bot, MessageCircle, Minimize2, Send, User, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Message {
  id: number;
  from: "bot" | "user";
  text: string;
  timestamp: string;
}

const initialMessages: Message[] = [
  {
    id: 1,
    from: "bot",
    text: "👋 Hi there! I'm Kanika, your AI HR assistant. I can help you with questions about leave policies, salary info, benefits, onboarding, and more. What can I help you with today?",
    timestamp: "now",
  },
  {
    id: 2,
    from: "user",
    text: "What's the annual leave policy?",
    timestamp: "1m ago",
  },
  {
    id: 3,
    from: "bot",
    text: "📅 Our annual leave policy grants employees **24 days** of paid leave per year (2 days per month). Leave accrues from your start date and can be carried over up to **5 days** to the following year. To request leave, submit a request in the HR portal with at least 3 business days' notice for short leaves.",
    timestamp: "1m ago",
  },
];

const botResponses: { keywords: string[]; response: string }[] = [
  {
    keywords: ["leave", "vacation", "pto", "time off", "holiday"],
    response:
      "📅 Our leave policy includes 24 days annual leave, 10 public holidays, 5 days sick leave, and 3 days personal leave. You can request leave through the HR portal with 3 business days' notice. Unused leave (up to 5 days) rolls over to the next year.",
  },
  {
    keywords: ["salary", "pay", "compensation", "raise", "bonus", "payroll"],
    response:
      "💰 Salaries are reviewed annually in Q1. The company follows market-rate benchmarking with bi-annual surveys. Bonuses are performance-based (up to 15% of base). For specific salary questions or raise requests, please schedule a 1:1 with your manager or reach out to HR directly.",
  },
  {
    keywords: [
      "benefit",
      "insurance",
      "health",
      "dental",
      "vision",
      "wellness",
    ],
    response:
      "🏥 Benefits include: full medical insurance for employee + family, dental & vision coverage, $500/year wellness stipend, mental health support (10 free sessions/year), and life insurance at 2x base salary. Benefits kick in on day one of employment!",
  },
  {
    keywords: ["onboard", "start", "new hire", "first day", "orientation"],
    response:
      "🎉 Welcome! Your first week includes: Day 1 orientation with HR, equipment setup, company culture session, and meeting your buddy/mentor. Weeks 2-4 cover role-specific training and team introductions. All tasks are tracked in the Onboarding module — progress toward the 30/60/90 day milestones.",
  },
  {
    keywords: [
      "performance",
      "review",
      "feedback",
      "rating",
      "evaluation",
      "goal",
    ],
    response:
      "📊 Performance reviews happen twice a year (Q2 & Q4). The process includes self-assessment, manager review, AI-assisted summary, and goal-setting for the next cycle. Ratings are on a 1-5 scale. You can view your current goals and previous reviews in the Performance module.",
  },
  {
    keywords: ["learning", "training", "course", "skill", "development"],
    response:
      "📚 All employees have access to our L&D platform with 200+ courses. Each course earns XP points! There's also a $1,000/year external learning budget for conferences, certifications, and courses outside our platform. Check the Learning module for AI-personalized course recommendations.",
  },
  {
    keywords: ["remote", "work from home", "wfh", "hybrid", "office"],
    response:
      "🏠 We operate on a flexible hybrid model — employees can work remotely up to 3 days per week. Each team has a core collaboration day (usually Wednesday). Remote work requires a reliable internet connection and following our data security guidelines.",
  },
  {
    keywords: ["xp", "points", "gamification", "badge", "leaderboard", "quest"],
    response:
      "🏆 Our gamification system rewards engagement! Earn XP by completing courses, giving kudos, achieving goals, and finishing daily quests. XP contributes to your level and leaderboard ranking. Badges are awarded for special achievements. Check Recognition & Learning modules for more!",
  },
  {
    keywords: ["attrition", "retention", "quit", "resign", "leaving"],
    response:
      "📈 Our AI monitors attrition risk factors across departments. If you're thinking about your career trajectory or have concerns, we strongly encourage a confidential conversation with HR or your manager. We offer career pathing, internal mobility, and growth opportunities to help retain our best talent.",
  },
  {
    keywords: ["recruitment", "hire", "job", "open role", "apply"],
    response:
      "💼 We currently have 18 open roles across Engineering, Sales, and Product. Our AI-powered recruitment system includes resume screening with match scores. Employees can refer candidates — if hired and they stay 6 months, you earn a $2,000 referral bonus! Check the Recruitment module for current openings.",
  },
];

function getBotResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const { keywords, response } of botResponses) {
    if (keywords.some((k) => lower.includes(k))) {
      return response;
    }
  }
  return "🤔 That's a great question! I don't have a specific answer for that right now. For detailed assistance, please:\n• Email hr@kanika-hr.com\n• Raise a ticket in the HR portal\n• Book time with your HR Business Partner\n\nIs there anything else I can help you with?";
}

export default function HRChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: messages triggers scroll update
  useEffect(() => {
    if (isOpen && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg: Message = {
      id: messages.length + 1,
      from: "user",
      text: trimmed,
      timestamp: "now",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(
      () => {
        const botMsg: Message = {
          id: messages.length + 2,
          from: "bot",
          text: getBotResponse(trimmed),
          timestamp: "now",
        };
        setMessages((prev) => [...prev, botMsg]);
        setIsTyping(false);
      },
      800 + Math.random() * 600,
    );
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          type="button"
          data-ocid="chatbot.open_modal_button"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-primary rounded-full shadow-glow flex items-center justify-center text-primary-foreground hover:scale-105 active:scale-95 transition-transform z-50"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[360px] h-[520px] bg-card border border-border rounded-2xl shadow-card-hover flex flex-col z-50 overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-primary text-primary-foreground flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <Bot size={16} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">Kanika AI</p>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                <p className="text-[10px] opacity-80">HR Assistant · Online</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-lg hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
                data-ocid="chatbot.close_button"
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-3 scroll-smooth"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex items-start gap-2",
                  msg.from === "user" ? "flex-row-reverse" : "flex-row",
                )}
              >
                <div
                  className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                    msg.from === "bot"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground",
                  )}
                >
                  {msg.from === "bot" ? <Bot size={12} /> : <User size={12} />}
                </div>
                <div
                  className={cn(
                    "max-w-[75%] px-3 py-2 rounded-xl text-sm leading-relaxed",
                    msg.from === "bot"
                      ? "bg-muted text-foreground rounded-tl-sm"
                      : "bg-primary text-primary-foreground rounded-tr-sm",
                  )}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <p
                    className={cn(
                      "text-[10px] mt-1 opacity-60",
                      msg.from === "user" ? "text-right" : "",
                    )}
                  >
                    {msg.timestamp}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <Bot size={12} className="text-primary-foreground" />
                </div>
                <div className="bg-muted rounded-xl rounded-tl-sm px-3 py-2.5 flex items-center gap-1.5">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="flex-shrink-0 p-3 border-t border-border bg-card">
            <div className="flex items-center gap-2">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask anything about HR..."
                className="flex-1 h-9 text-sm border-muted-foreground/20 focus-visible:ring-primary/30"
                data-ocid="chatbot.input"
              />
              <Button
                size="icon"
                className="h-9 w-9 flex-shrink-0"
                onClick={sendMessage}
                disabled={!input.trim() || isTyping}
                data-ocid="chatbot.submit_button"
              >
                <Send size={14} />
              </Button>
            </div>
            <p className="text-[10px] text-muted-foreground mt-1.5 text-center">
              Ask about leave, salary, benefits, onboarding...
            </p>
          </div>
        </div>
      )}
    </>
  );
}
