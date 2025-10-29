"use client";

import { Search, X, List, Grid3x3, LayoutGrid, User, Settings, Bell, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";

const filterTabs = ["All", "Notes", "Articles", "Youtube", "Images", "Documents"];

interface SearchBarProps {
  onViewChange?: (view: "grid" | "list" | "masonry") => void;
  currentView?: "grid" | "list" | "masonry";
}

export default function SearchBar({ onViewChange, currentView = "masonry" }: SearchBarProps) {
  const [activeTab, setActiveTab] = useState("All");
  const [searchValue, setSearchValue] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="w-full bg-background border-b border-border px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
        {/* Search Input */}
        <div className="flex-1 max-w-2xl relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search your second brain..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="pl-10 pr-10 h-11 bg-muted/50 border-border"
          />
          {searchValue && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
              onClick={() => setSearchValue("")}
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* User Profile Dropdown */}
        <Popover open={isProfileOpen} onOpenChange={setIsProfileOpen}>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
              <Avatar className="w-10 h-10 cursor-pointer">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                <AvatarFallback>BA</AvatarFallback>
              </Avatar>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-2" align="end">
            <div className="flex items-center gap-3 p-3 border-b border-border mb-2">
              <Avatar className="w-10 h-10">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                <AvatarFallback>BA</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">Budhi AI</span>
                <span className="text-xs text-muted-foreground">budhi.ai@demo.com</span>
              </div>
            </div>
            
            <div className="space-y-1">
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 h-10"
                onClick={() => {
                  router.push("/profile");
                  setIsProfileOpen(false);
                }}
              >
                <User className="w-4 h-4" />
                <span>My Profile</span>
              </Button>
              
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 h-10"
                onClick={() => setIsProfileOpen(false)}
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </Button>
              
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 h-10"
                onClick={() => setIsProfileOpen(false)}
              >
                <Bell className="w-4 h-4" />
                <span>Notification</span>
              </Button>
              
              <div className="border-t border-border my-1" />
              
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 h-10 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                onClick={() => setIsProfileOpen(false)}
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Filter Tabs and View Toggle */}
      <div className="max-w-7xl mx-auto flex items-center justify-between mt-4">
        <div className="flex items-center gap-1 bg-muted/30 rounded-lg p-1">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                activeTab === tab
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* View Toggle Buttons */}
        <div className="flex items-center gap-1 bg-muted/30 rounded-lg p-1">
          <Button
            variant="ghost"
            size="icon"
            className={`h-8 w-8 ${
              currentView === "list" ? "bg-background shadow-sm" : ""
            }`}
            onClick={() => onViewChange?.("list")}
          >
            <List className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`h-8 w-8 ${
              currentView === "grid" ? "bg-background shadow-sm" : ""
            }`}
            onClick={() => onViewChange?.("grid")}
          >
            <Grid3x3 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`h-8 w-8 ${
              currentView === "masonry" ? "bg-background shadow-sm" : ""
            }`}
            onClick={() => onViewChange?.("masonry")}
          >
            <LayoutGrid className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}