import { useState, useRef, useEffect } from "react";
import { Send, User, Bot, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { fetchChatAnswer } from "@/service/chatService";

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hi! I'm your AI assistant that knows everything about this portfolio. Ask me anything - about skills, experience, projects, or anything else you'd like to know!",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const [suggestionIndex, setSuggestionIndex] = useState(0);

  const suggestionGroups = [
    [
      "What are Anurag's strongest skills?",
      "Can you walk me through Anurag's experience?",
      "Tell me about some standout projects Anurag has worked on.",
      "Which technologies does Anurag use the most?",
    ],
    [
      "What kind of roles is Anurag best suited for?",
      "How does Anurag approach problem-solving?",
      "What makes Anurag different from other developers?",
      "Can you describe Anurag's coding style or philosophy?",
    ],
    [
      "What’s Anurag’s proudest project?",
      "How does Anurag stay updated with tech?",
      "Has Anurag worked in a team setting?",
      "What’s Anurag like as a developer?",
    ],
    [
      "Why should someone hire Anurag?",
      "Tell me about Anurag’s frontend skills.",
      "What backend technologies does Anurag know?",
      "What’s the most impressive thing Anurag has built?",
    ]
  ];

  const jarwisIntros = [
    "Name’s Jarwis. I’m the AI brain behind Anurag’s brilliance...",
    "I’m Jarwis, Anurag’s personal AI...",
    "Jarwis here — Anurag’s AI wingman...",
    "Yo! I'm Jarwis — Anurag's AI assistant...",
    "I’m Jarwis — Anurag’s digital stunt double...",
    "Jarwis here — Anurag’s AI sidekick...",
    "I’m Jarwis, Anurag’s AI...",
    "Jarwis here. Anurag’s building something wild...",
    "Sup, I’m Jarwis — AI assistant to the one and only Anurag...",
    "Hey there! I’m Jarwis, Anurag’s AI sidekick..."
  ];

  const [introIndex, setIntroIndex] = useState(0);
  const [fadeKey, setFadeKey] = useState(0);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [messages]);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIntroIndex((prev) => (prev + 1) % jarwisIntros.length);
      setSuggestionIndex((prev) => (prev + 1) % suggestionGroups.length);
      setFadeKey((prev) => prev + 1);
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    let response;
    let error: any = null;
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        response = await fetchChatAnswer(userMessage.content);
        error = null;
        break;
      } catch (err: any) {
        error = err;
      }
    }

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'assistant',
      content: response?.answer || `Sorry, there was an error fetching the answer. ${error?.message || ''}`,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, assistantMessage]);
    setIsLoading(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    inputRef.current?.focus();
    setTimeout(() => {
      handleSend();
    }, 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      {/* Welcome Message */}
      {messages.length === 1 && (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center mb-6 animate-glow-pulse">
            <Sparkles className="w-8 h-8 text-primary-foreground" />
          </div>
          <h2 className="text-3xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Ask Me Anything
          </h2>

          <p key={fadeKey} className="text-muted-foreground mb-8 max-w-md">
            {jarwisIntros[introIndex]}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-lg">
            {suggestionGroups[suggestionIndex].map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                className="text-left justify-start h-auto p-4 hover:bg-secondary transition-all duration-300 animate-slide-up whitespace-normal break-words text-sm"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Chat Messages */}
      {messages.length > 1 && (
        <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3 animate-slide-up",
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {message.type === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-primary-foreground" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-3 shadow-card",
                    message.type === 'user'
                      ? 'bg-chat-user text-primary-foreground ml-auto'
                      : 'bg-chat-assistant text-foreground'
                  )}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
                {message.type === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-secondary-foreground" />
                  </div>
                )}
              </div>
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex gap-3 justify-start animate-slide-up">
                <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-primary-foreground" />
                </div>
                <div className="bg-chat-assistant rounded-2xl px-4 py-3 shadow-card">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-typing"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-typing" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-typing" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}

            {/* ✅ Scroll target */}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      )}

      {/* Input Area */}
      <div className="p-4 border-t border-border bg-card/50 backdrop-blur-sm">
        <div className="flex gap-3 max-w-4xl mx-auto">
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about Anurag..."
            className="flex-1 bg-chat-input border-border focus:border-primary transition-colors"
            disabled={isLoading}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            variant="gradient"
            className="shadow-glow"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
