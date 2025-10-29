"use client";

import { Plus, LogOut, Sun, Moon, ChevronLeft, ChevronRight, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface SidebarProps {
  onAddNote: () => void;
}

export default function Sidebar({ onAddNote }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
    setIsDark(!isDark);
  };

  return (
    <aside 
      className={`bg-[#0f1729] border-r border-white/5 flex flex-col py-6 h-screen fixed left-0 top-0 z-50 transition-all duration-300 ${
        isExpanded ? 'w-[200px] px-4' : 'w-[72px] px-4'
      }`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -right-3 top-6 w-6 h-6 rounded-full bg-[#0f1729] border border-white/10 flex items-center justify-center text-white hover:bg-white/5 transition-colors"
      >
        {isExpanded ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
      </button>

      {/* Logo & User Info */}
      <div className="mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center mx-auto">
          <Brain className="w-6 h-6 text-white" />
        </div>
        {isExpanded && (
          <div className="mt-3 text-center">
            <p className="text-white text-sm font-medium">Budhi AI</p>
            <p className="text-gray-400 text-xs">budhi.ai@demo.com</p>
          </div>
        )}
      </div>

      {/* Add Button */}
      <Button
        onClick={onAddNote}
        className={`bg-red-500 hover:bg-red-600 text-white font-medium rounded-full mb-4 ${
          isExpanded ? 'w-full' : 'w-11 h-11 p-0'
        }`}
      >
        <Plus className={isExpanded ? "w-5 h-5 mr-2" : "w-5 h-5"} />
        {isExpanded && "Add"}
      </Button>

      <div className="flex-1" />

      {/* Credits Badge */}
      <div className={`${isExpanded ? 'mb-4' : 'mb-4 flex justify-center'}`}>
        <div className={`relative ${isExpanded ? 'w-full bg-white/5 rounded-lg p-3' : ''}`}>
          <div className={`${isExpanded ? 'flex items-center gap-3' : 'w-12 h-12 mx-auto'}`}>
            {/* Circular badge */}
            <div className="relative w-12 h-12 flex-shrink-0">
              <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 48 48">
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="4"
                />
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="4"
                  strokeDasharray="126"
                  strokeDashoffset="38"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-sm font-bold">30</span>
              </div>
            </div>
            
            {isExpanded && (
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <span className="text-white text-xs font-medium">Free Plan</span>
                </div>
                <p className="text-gray-400 text-xs">100 Memos left this month</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Logout & Dark Mode */}
      <div className={`flex ${isExpanded ? 'gap-2' : 'flex-col gap-2'}`}>
        <Button
          variant="ghost"
          onClick={toggleDarkMode}
          className={`text-white hover:bg-white/5 ${isExpanded ? 'flex-1 justify-start' : 'w-11 h-11 p-0 mx-auto'} rounded-full`}
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          {isExpanded && <span className="ml-2 text-sm">{isDark ? 'Light' : 'Dark'}</span>}
        </Button>
        
        {!isExpanded && (
          <Button
            variant="ghost"
            className="w-11 h-11 p-0 mx-auto text-white hover:bg-white/5 rounded-full"
          >
            <LogOut className="w-5 h-5" />
          </Button>
        )}
        
        {isExpanded && (
          <Button
            variant="ghost"
            className="text-white hover:bg-white/5 rounded-full"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        )}
      </div>
    </aside>
  );
}