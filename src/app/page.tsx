"use client";

import { useState, useMemo } from "react";
import Sidebar from "@/components/Sidebar";
import SearchBar from "@/components/SearchBar";
import AddNoteModal from "@/components/AddNoteModal";
import ContentCard from "@/components/ContentCard";
import ContentDetailView from "@/components/ContentDetailView";
import VoiceMessageBubble from "@/components/VoiceMessageBubble";
import MasonryGrid, { MasonryItem } from "@/components/MasonryGrid";
import { ContentType } from "@/components/ContentCard";
import { FileText, Youtube, Image as ImageIcon, Globe, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ContentItem {
  type: ContentType;
  title?: string;
  content?: string;
  imageUrl?: string;
  source?: "youtube" | "twitter" | "internet";
  date?: string;
  metadata?: {
    views?: string;
    likes?: string;
    comments?: string;
  };
}

export default function Home() {
  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);
  const [isAskOpen, setIsAskOpen] = useState(false);
  const [view, setView] = useState<"grid" | "list" | "masonry" | "table">("masonry");
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);

  const sampleContent: ContentItem[] = [
    {
      type: "add-note" as const,
    },
    {
      type: "article" as const,
      title: "CRISTIANO RONALDO'S HIDDEN WEAPON",
      imageUrl: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&h=400&fit=crop",
      source: "internet",
      date: "2024-03-15",
    },
    {
      type: "image" as const,
      title: "What's stopping you?",
      imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=400&fit=crop",
      source: "internet",
      date: "2024-03-14",
    },
    {
      type: "video" as const,
      title: "trap of the education system",
      imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=300&fit=crop",
      source: "youtube",
      date: "2024-03-13",
    },
    {
      type: "image" as const,
      title: "Ikigai",
      content: "(生き甲斐) from Japanese\n\na reason for being; the things that give you get up in the morning, your passion, values and vocation that gives you something to live for",
      imageUrl: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600&h=500&fit=crop",
      source: "twitter",
      date: "2024-03-12",
    },
    {
      type: "document" as const,
      title: "august:",
      imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
      source: "internet",
      date: "2024-03-11",
    },
    {
      type: "article" as const,
      title: "OpenAI",
      imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
      source: "internet",
      date: "2024-03-10",
    },
    {
      type: "note" as const,
      title: "Personal Growth Insights",
      content: "from a young age i knew everybody was wrong and i was right",
      source: "twitter",
      date: "2024-03-09",
      metadata: {
        comments: "168",
        likes: "49.8K",
        views: "3.5M",
      },
    },
  ];

  const filteredContent = useMemo(() => {
    if (activeFilter === "All") return sampleContent;
    
    const filterMap: Record<string, ContentType[]> = {
      "Notes": ["note"],
      "Articles": ["article"],
      "Youtube": ["video"],
      "Images": ["image"],
      "Documents": ["document"],
    };
    
    const allowedTypes = filterMap[activeFilter] || [];
    return sampleContent.filter(item => allowedTypes.includes(item.type));
  }, [activeFilter]);

  const handleCardClick = (item: ContentItem) => {
    if (item.type === "add-note") {
      setIsAddNoteOpen(true);
    } else {
      setSelectedContent(item);
    }
  };

  const getSourceIcon = (source?: "youtube" | "twitter" | "internet") => {
    switch (source) {
      case "youtube":
        return <Youtube className="w-4 h-4 text-red-500" />;
      case "twitter":
        return <Twitter className="w-4 h-4 text-blue-400" />;
      case "internet":
        return <Globe className="w-4 h-4 text-green-500" />;
      default:
        return <FileText className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getTypeIcon = (type: ContentType) => {
    switch (type) {
      case "article":
        return <FileText className="w-4 h-4" />;
      case "video":
        return <Youtube className="w-4 h-4 text-red-500" />;
      case "image":
        return <ImageIcon className="w-4 h-4" />;
      case "document":
        return <FileText className="w-4 h-4" />;
      case "note":
        return <FileText className="w-4 h-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar onAddNote={() => setIsAddNoteOpen(true)} />

      {/* Main Content */}
      <div className="ml-[72px]">
        {/* Search Bar */}
        <SearchBar 
          onViewChange={setView} 
          currentView={view}
          onFilterChange={setActiveFilter}
          activeFilter={activeFilter}
        />

        {/* Content Grid */}
        <main className="p-6 max-w-7xl mx-auto">
          {view === "table" ? (
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">Type</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead className="w-[100px]">Source</TableHead>
                    <TableHead className="w-[150px]">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContent
                    .filter(item => item.type !== "add-note")
                    .map((item, index) => (
                      <TableRow 
                        key={index} 
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => handleCardClick(item)}
                      >
                        <TableCell>
                          <div className="flex items-center justify-center">
                            {getTypeIcon(item.type)}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          {item.title || "Untitled"}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getSourceIcon(item.source)}
                            <span className="text-sm text-muted-foreground capitalize">
                              {item.source || "-"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {formatDate(item.date)}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          ) : view === "masonry" ? (
            <MasonryGrid columns={3} gap={16}>
              {filteredContent.map((item, index) => (
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
              {filteredContent.map((item, index) => (
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
              {filteredContent.map((item, index) => (
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

      {/* Floating Ask Button */}
      <Button
        onClick={() => setIsAskOpen(true)}
        className="fixed bottom-8 right-8 h-16 w-16 rounded-full shadow-2xl bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white z-40 group p-0 flex items-center justify-center"
        size="icon"
      >
        <img 
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/FINAL_LOGO_BUDHI_AI_WHITE-02-1761721606139.png"
          alt="Ask Budhi AI"
          className="w-10 h-10 object-contain group-hover:scale-110 transition-transform"
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