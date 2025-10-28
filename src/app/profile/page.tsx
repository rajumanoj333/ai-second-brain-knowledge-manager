"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import SearchBar from "@/components/SearchBar";

export default function ProfilePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "MyBudhi",
    email: "Budhi.oi@demo.com",
    mobile: "",
    apiKey: "••••••••••••••••••••••••••••••",
    location: "USA",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar onAddNote={() => {}} />
      
      <div className="ml-[72px]">
        <SearchBar />
        
        <main className="p-6 max-w-2xl mx-auto">
          <Card className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                  <AvatarFallback>MB</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-xl font-semibold">MyBudhi</h1>
                  <p className="text-sm text-muted-foreground">Budhi.oi@demo.com</p>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push("/")}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="flex items-center justify-between">
                <Label className="text-base">Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-64 text-right"
                />
              </div>

              {/* Email */}
              <div className="flex items-center justify-between">
                <Label className="text-base">Email account</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-64 text-right"
                />
              </div>

              {/* Mobile */}
              <div className="flex items-center justify-between">
                <Label className="text-base">Mobile number</Label>
                <Input
                  type="tel"
                  placeholder="Add number"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  className="w-64 text-right"
                />
              </div>

              {/* API Key */}
              <div className="flex items-center justify-between">
                <Label className="text-base">API Key</Label>
                <Input
                  type="password"
                  value={formData.apiKey}
                  onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
                  className="w-64 text-right font-mono"
                  readOnly
                />
              </div>

              {/* Location */}
              <div className="flex items-center justify-between">
                <Label className="text-base">Location</Label>
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-64 text-right"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button type="submit" className="w-full sm:w-auto px-8">
                  Save Change
                </Button>
              </div>
            </form>
          </Card>
        </main>
      </div>
    </div>
  );
}
