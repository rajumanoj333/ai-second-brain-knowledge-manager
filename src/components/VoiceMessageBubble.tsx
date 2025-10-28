"use client";

import { useState, useRef, useEffect } from "react";
import { Mic, Send, X, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface VoiceMessageBubbleProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function VoiceMessageBubble({ open, onOpenChange }: VoiceMessageBubbleProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue;
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setInputValue("");
    setIsProcessing(true);

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "I understand you're asking about: '" + userMessage + "'. How can I help you organize this information in your second brain?",
        },
      ]);
      setIsProcessing(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // In a real implementation, you would start/stop audio recording here
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        setMessages((prev) => [
          ...prev,
          { role: "user", text: "Voice message recorded" },
          { role: "ai", text: "I've captured your voice message. What would you like me to do with this information?" },
        ]);
      }, 3000);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[600px] bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden flex flex-col shadow-2xl border-primary/20">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-amber-500/5 animate-pulse" />
        
        {/* Header */}
        <div className="relative flex items-center justify-between p-4 border-b border-border/50 backdrop-blur-sm bg-background/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                Ask Budhi AI
              </h2>
              <p className="text-xs text-muted-foreground">Your AI-powered second brain assistant</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onOpenChange(false)}
            className="h-9 w-9 hover:bg-destructive/10 hover:text-destructive"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Messages Area */}
        <div className="relative flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-amber-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">What's on your mind?</h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  Ask me anything, and I'll help you organize, summarize, or retrieve information from your second brain.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center max-w-md">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  onClick={() => setInputValue("Summarize my recent notes")}
                >
                  Summarize notes
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  onClick={() => setInputValue("Find articles about AI")}
                >
                  Find articles
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  onClick={() => setInputValue("Organize my content")}
                >
                  Organize content
                </Button>
              </div>
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-2xl shadow-lg ${
                  message.role === "user"
                    ? "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground ml-12"
                    : "bg-gradient-to-br from-muted to-muted/50 mr-12"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
              </div>
            </div>
          ))}

          {isProcessing && (
            <div className="flex justify-start">
              <div className="max-w-[80%] p-4 rounded-2xl bg-gradient-to-br from-muted to-muted/50 mr-12">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm text-muted-foreground">Thinking...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="relative p-4 border-t border-border/50 backdrop-blur-sm bg-background/50">
          <div className="flex items-end gap-3">
            <div className="flex-1 relative">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask anything..."
                rows={1}
                className="w-full px-4 py-3 pr-12 rounded-full bg-muted/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none text-sm transition-all"
                style={{ minHeight: "48px", maxHeight: "120px" }}
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSend}
                disabled={!inputValue.trim() || isProcessing}
                className="absolute right-2 bottom-2 h-8 w-8 rounded-full hover:bg-primary hover:text-primary-foreground"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            
            <Button
              size="icon"
              onClick={toggleRecording}
              className={`h-12 w-12 rounded-full transition-all ${
                isRecording
                  ? "bg-red-500 hover:bg-red-600 animate-pulse"
                  : "bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
              }`}
            >
              <Mic className="w-5 h-5 text-white" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Press Enter to send, Shift + Enter for new line
          </p>
        </div>
      </Card>
    </div>
  );
}
