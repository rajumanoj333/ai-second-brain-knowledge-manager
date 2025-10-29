"use client";

import { useState } from "react";
import { Plus, LogOut, Sun, Moon, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

interface SidebarProps {
  onAddNote: () => void;
}

export default function Sidebar({ onAddNote }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div
      className={`fixed left-0 top-0 h-screen bg-card border-r border-border flex flex-col py-4 px-3 z-50 transition-all duration-300 ${
        isExpanded ? "w-[200px]" : "w-[72px]"
      }`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -right-3 top-6 w-6 h-6 bg-card border border-border rounded-full flex items-center justify-center hover:bg-accent transition-colors"
      >
        {isExpanded ? (
          <ChevronLeft className="w-4 h-4 text-foreground" />
        ) : (
          <ChevronRight className="w-4 h-4 text-foreground" />
        )}
      </button>

      <div className="flex-1 space-y-4">
        {/* Logo & User Info */}
        <div className="mb-6">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto" style={{ backgroundColor: 'var(--budhi-blue)' }}>
            <img 
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1761723148689.png" 
              alt="Budhi"
              className="w-8 h-8 object-contain"
            />
          </div>
          {isExpanded && (
            <div className="mt-3 text-center">
              <h3 className="font-semibold text-sm">Budhi AI</h3>
              <p className="text-xs text-muted-foreground">budhi.ai@demo.com</p>
            </div>
          )}
        </div>

        {/* Add Note Button */}
        <Button
          onClick={onAddNote}
          className="w-full text-white flex items-center gap-2 justify-center"
          style={{ backgroundColor: 'var(--budhi-amber)' }}
        >
          <Plus className="w-5 h-5" />
          {isExpanded && <span>Add</span>}
        </Button>

        {/* MyBudhi Button */}
        {isExpanded && (
          <Button
            variant="ghost"
            className="w-full justify-start text-sm"
          >
            Budhi
          </Button>
        )}

        {/* Credits Display */}
        <div className="pt-4">
          {isExpanded ? (
            <div className="bg-muted rounded-lg p-3 text-center">
              <div className="flex items-center justify-center mb-2">
                <div className="relative w-12 h-12">
                  <svg className="w-12 h-12 transform -rotate-90">
                    <circle
                      cx="24"
                      cy="24"
                      r="20"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      className="text-muted-foreground opacity-20"
                    />
                    <circle
                      cx="24"
                      cy="24"
                      r="20"
                      stroke="var(--budhi-amber)"
                      strokeWidth="4"
                      fill="none"
                      strokeDasharray={`${(30 / 100) * 125.6} 125.6`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold">30</span>
                  </div>
                </div>
              </div>
              <p className="text-xs font-medium mb-1">Free Plan</p>
              <p className="text-xs text-muted-foreground">100 Memos left this month</p>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="relative w-10 h-10">
                <svg className="w-10 h-10 transform -rotate-90">
                  <circle
                    cx="20"
                    cy="20"
                    r="16"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    className="text-muted-foreground opacity-20"
                  />
                  <circle
                    cx="20"
                    cy="20"
                    r="16"
                    stroke="var(--budhi-amber)"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray={`${(30 / 100) * 100.48} 100.48`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-bold">30</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="space-y-2 mt-auto pt-4 border-t border-border">
        {/* Dark Mode Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className={`${isExpanded ? "w-full justify-start" : "w-10 h-10 mx-auto"}`}
        >
          {theme === "dark" ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
          {isExpanded && <span className="ml-2">Theme</span>}
        </Button>

        {/* Logout */}
        <Button
          variant="ghost"
          size="icon"
          className={`text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950 ${
            isExpanded ? "w-full justify-start" : "w-10 h-10 mx-auto"
          }`}
        >
          <LogOut className="w-5 h-5" />
          {isExpanded && <span className="ml-2">Logout</span>}
        </Button>
      </div>
    </div>
  );
}