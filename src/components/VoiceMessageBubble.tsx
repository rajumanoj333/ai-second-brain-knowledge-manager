"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AIVoiceInput } from "@/components/AIVoiceInput";

interface VoiceMessageBubbleProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function VoiceMessageBubble({ open, onOpenChange }: VoiceMessageBubbleProps) {
  const handleStart = () => {
    console.log("Recording started");
  };

  const handleStop = (duration: number) => {
    console.log("Recording stopped, duration:", duration);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden flex flex-col shadow-2xl border-primary/20">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-amber-600/5 animate-pulse" />
        
        {/* Header */}
        <div className="relative flex items-center justify-between p-4 border-b border-border/50 backdrop-blur-sm bg-background/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center p-1.5">
              <img 
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/FINAL_LOGO_BUDHI_AI_WHITE-02-1761722272977.png"
                alt="Budhi AI"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h2 className="text-lg font-bold bg-gradient-to-r from-foreground to-amber-600 bg-clip-text text-transparent">
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

        {/* Centered Voice Input Area */}
        <div className="relative flex-1 flex items-center justify-center p-8">
          <div className="flex flex-col items-center gap-6 w-full">
            {/* Logo */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-2xl p-4">
              <img 
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/FINAL_LOGO_BUDHI_AI_WHITE-02-1761722272977.png"
                alt="Budhi AI"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Title */}
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-foreground to-amber-600 bg-clip-text text-transparent">
                What's on your mind?
              </h3>
              <p className="text-sm text-muted-foreground max-w-md">
                Ask me anything, and I'll help you organize, summarize, or retrieve information from your second brain.
              </p>
            </div>

            {/* Voice Input Component */}
            <AIVoiceInput 
              onStart={handleStart}
              onStop={handleStop}
              visualizerBars={48}
              className="w-full"
            />
          </div>
        </div>
      </Card>
    </div>
  );
}