"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import SearchBar from "@/components/SearchBar";
import AddNoteModal from "@/components/AddNoteModal";
import ContentCard from "@/components/ContentCard";
import ContentDetailView from "@/components/ContentDetailView";
import VoiceMessageBubble from "@/components/VoiceMessageBubble";
import MasonryGrid, { MasonryItem } from "@/components/MasonryGrid";
import { ContentType } from "@/components/ContentCard";
import { Button } from "@/components/ui/button";

interface ContentItem {
  type: ContentType;
  title?: string;
  content?: string;
  imageUrl?: string;
  metadata?: {
    views?: string;
    likes?: string;
    comments?: string;
  };
}

export default function Home() {
  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);
  const [isAskOpen, setIsAskOpen] = useState(false);
  const [view, setView] = useState<"grid" | "list" | "masonry">("masonry");
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);

  const sampleContent: ContentItem[] = [
    {
      type: "add-note" as const,
    },
    {
      type: "article" as const,
      title: "CRISTIANO RONALDO'S HIDDEN WEAPON",
      imageUrl: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&h=400&fit=crop",
    },
    {
      type: "image" as const,
      title: "What's stopping you?",
      imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=400&fit=crop",
    },
    {
      type: "video" as const,
      title: "trap of the education system",
      imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=300&fit=crop",
    },
    {
      type: "image" as const,
      title: "Ikigai",
      content: "(生き甲斐) from Japanese\n\na reason for being; the things that give you get up in the morning, your passion, values and vocation that gives you something to live for",
      imageUrl: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600&h=500&fit=crop",
    },
    {
      type: "document" as const,
      title: "august:",
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    },
    {
      type: "article" as const,
      title: "OpenAI",
      imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
    },
    {
      type: "note" as const,
      title: "Personal Growth Insights",
      content: "from a young age i knew everybody was wrong and i was right",
      metadata: {
        comments: "168",
        likes: "49.8K",
        views: "3.5M",
      },
    },
  ];

  const handleCardClick = (item: ContentItem) => {
    if (item.type === "add-note") {
      setIsAddNoteOpen(true);
    } else {
      setSelectedContent(item);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar onAddNote={() => setIsAddNoteOpen(true)} />

      {/* Main Content */}
      <div className="ml-[72px]">
        {/* Search Bar */}
        <SearchBar onViewChange={setView} currentView={view} />

        {/* Content Grid */}
        <main className="p-6 max-w-7xl mx-auto">
          {view === "masonry" ? (
            <MasonryGrid columns={3} gap={16}>
              {sampleContent.map((item, index) => (
                <MasonryItem key={index}>
                  <ContentCard
                    type={item.type}
                    title={item.title}
                    content={item.content}
                    imageUrl={item.imageUrl}
                    metadata={item.metadata}
                    onClick={() => handleCardClick(item)}
                  />
                </MasonryItem>
              ))}
            </MasonryGrid>
          ) : view === "grid" ? (
            <div className="grid grid-cols-3 gap-4">
              {sampleContent.map((item, index) => (
                <ContentCard
                  key={index}
                  type={item.type}
                  title={item.title}
                  content={item.content}
                  imageUrl={item.imageUrl}
                  metadata={item.metadata}
                  onClick={() => handleCardClick(item)}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {sampleContent.map((item, index) => (
                <ContentCard
                  key={index}
                  type={item.type}
                  title={item.title}
                  content={item.content}
                  imageUrl={item.imageUrl}
                  metadata={item.metadata}
                  onClick={() => handleCardClick(item)}
                  className="w-full"
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Floating Ask Button - Centered */}
      <Button
        onClick={() => setIsAskOpen(true)}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 h-16 w-16 rounded-full shadow-2xl text-white z-40 group hover:scale-110 transition-all"
        size="icon"
        style={{ backgroundColor: 'var(--budhi-amber)' }}
      >
        <img 
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/apple-touch-icon-1761722780488.png" 
          alt="Ask"
          className="w-9 h-9 group-hover:scale-110 transition-transform"
        />
      </Button>

      {/* Add Note Modal */}
      <AddNoteModal open={isAddNoteOpen} onOpenChange={setIsAddNoteOpen} />

      {/* Voice Message Bubble */}
      <VoiceMessageBubble open={isAskOpen} onOpenChange={setIsAskOpen} />

      {/* Content Detail View */}
      {selectedContent && (
        <ContentDetailView
          type={selectedContent.type}
          title={selectedContent.title}
          content={selectedContent.content}
          imageUrl={selectedContent.imageUrl}
          metadata={selectedContent.metadata}
          onClose={() => setSelectedContent(null)}
        />
      )}
    </div>
  );
}