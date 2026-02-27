import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Sparkles, BookOpen, ExternalLink, ArrowRight } from "lucide-react";

// Mock conversation
const INITIAL_CHAT = [
  { role: 'assistant', content: "Hello Alex! I've analyzed your recent project in React. To reach a Senior Frontend role, we need to bridge your gap in System Design. Shall we start a brief assessment?" }
];

export default function AdvisingSession() {
  const [messages, setMessages] = useState(INITIAL_CHAT);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showInteractiveContent, setShowInteractiveContent] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "Based on that, I think you have a solid grasp on state management. However, large-scale application architecture seems to be a weak point. I've generated a customized learning path for you on the right." 
      }]);
      setShowInteractiveContent(true);
    }, 1500);
  };

  return (
    <div className="h-full flex overflow-hidden">
      {/* Chat Area */}
      <div className={`flex flex-col h-full transition-all duration-500 ease-in-out ${showInteractiveContent ? 'w-1/2 border-r border-white/10' : 'w-full max-w-4xl mx-auto'}`}>
        <div className="p-6 border-b border-white/10 glass-panel border-x-0 border-t-0 rounded-none z-10">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Bot className="text-primary w-6 h-6" /> 
            AI Advisor Session
          </h2>
          <p className="text-sm text-muted-foreground mt-1">Personalised career mapping & skill gap analysis.</p>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6" ref={scrollRef}>
          <AnimatePresence initial={false}>
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 max-w-[80%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'assistant' ? 'bg-primary/20 text-primary' : 'bg-white/10 text-white'}`}>
                  {msg.role === 'assistant' ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
                </div>
                <div className={`p-4 rounded-2xl ${msg.role === 'assistant' ? 'bg-card border border-white/5 shadow-lg' : 'bg-primary text-primary-foreground'}`}>
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4 max-w-[80%]">
              <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
                <Bot className="w-5 h-5" />
              </div>
              <div className="p-4 rounded-2xl bg-card border border-white/5 flex gap-1 items-center">
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </motion.div>
          )}
        </div>

        <div className="p-6 bg-background z-10">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask for guidance or answer the prompt..."
              className="w-full bg-card border border-white/10 rounded-xl px-6 py-4 pr-16 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              data-testid="input-chat"
            />
            <button 
              onClick={handleSend}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors"
              data-testid="button-send-chat"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <div className="flex gap-2 mt-3 overflow-x-auto pb-2 scrollbar-hide">
            {["I want to be a full-stack dev.", "What is system design?", "Give me a practical test."].map((suggestion, i) => (
              <button 
                key={i}
                onClick={() => setInput(suggestion)}
                className="whitespace-nowrap px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-muted-foreground hover:text-foreground hover:border-white/20 transition-all"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Content Area (Dynamically Generated) */}
      <AnimatePresence>
        {showInteractiveContent && (
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "50%", opacity: 1 }}
            className="h-full bg-card/30 relative overflow-y-auto"
          >
            <div className="p-8 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold flex items-center gap-2 text-gradient">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Your Adaptive Roadmap
                </h3>
              </div>

              <div className="space-y-4">
                <div className="p-5 rounded-2xl glass-panel relative overflow-hidden group border-primary/30">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <BookOpen className="w-24 h-24 text-primary" />
                  </div>
                  <h4 className="text-lg font-bold mb-2 relative z-10">Module 1: System Design Basics</h4>
                  <p className="text-sm text-muted-foreground mb-4 w-4/5 relative z-10">
                    A personalized module generated based on your gap analysis. Focuses on scalable frontend architectures.
                  </p>
                  <div className="flex items-center gap-3 relative z-10">
                    <div className="h-2 w-full bg-black/50 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-secondary w-[15%]" />
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">15%</span>
                  </div>
                  <button className="mt-6 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors relative z-10">
                    Resume Module <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-5 rounded-2xl border border-white/5 bg-black/20 opacity-70">
                  <h4 className="text-lg font-bold mb-2">Module 2: Distributed State</h4>
                  <p className="text-sm text-muted-foreground mb-4">Locked. Complete Module 1 to dynamically generate this content.</p>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-white/10">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <ExternalLink className="w-4 h-4 text-secondary" />
                  Suggested Real-world Projects
                </h4>
                <div className="grid gap-3">
                  {[
                    "Build a real-time collaborative document editor",
                    "Design an e-commerce checkout state machine"
                  ].map((proj, i) => (
                    <div key={i} className="p-4 rounded-xl border border-white/5 hover:border-secondary/30 bg-white/5 cursor-pointer transition-colors">
                      <p className="text-sm font-medium">{proj}</p>
                      <p className="text-xs text-muted-foreground mt-1">Est. 12 hours • High Impact</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}