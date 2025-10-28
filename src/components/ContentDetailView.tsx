"use client";

import { X, Bookmark, Share2, MoreVertical, FileText, Youtube, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ContentType } from "@/components/ContentCard";

interface ContentDetailViewProps {
  type: ContentType;
  title?: string;
  content?: string;
  imageUrl?: string;
  metadata?: {
    views?: string;
    likes?: string;
    comments?: string;
  };
  onClose: () => void;
}

export default function ContentDetailView({
  type,
  title,
  content,
  imageUrl,
  metadata,
  onClose,
}: ContentDetailViewProps) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl max-h-[85vh] bg-background relative overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border flex-shrink-0">
          <div className="flex items-center gap-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
              <AvatarFallback>MK</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">manojkasulla8</p>
              <p className="text-xs text-muted-foreground">2025-10-24 19:17:28</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Bookmark className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Share2 className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <MoreVertical className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-9 w-9"
              onClick={onClose}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-6">
          {/* Title */}
          {title && (
            <h1 className="text-2xl font-bold mb-4">{title}</h1>
          )}

          {/* Tags/Categories */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge variant="secondary" className="rounded-full">
              <Tag className="w-3 h-3 mr-1" />
              AI
            </Badge>
            <Badge variant="secondary" className="rounded-full">
              <Tag className="w-3 h-3 mr-1" />
              Human-Machine Interaction
            </Badge>
            <Badge variant="secondary" className="rounded-full">
              <Tag className="w-3 h-3 mr-1" />
              Education
            </Badge>
            <Badge variant="secondary" className="rounded-full">
              <Tag className="w-3 h-3 mr-1" />
              ChatGPT
            </Badge>
          </div>

          {/* Main Image/Video */}
          {imageUrl && (
            <div className="mb-6 rounded-lg overflow-hidden">
              <img
                src={imageUrl}
                alt={title || "Content"}
                className="w-full h-auto max-h-96 object-cover"
              />
            </div>
          )}

          {/* Video URL if video type */}
          {type === "video" && (
            <div className="mb-6 p-4 bg-muted/50 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Youtube className="w-5 h-5 text-red-500" />
                <span className="text-sm font-medium">https://www.youtube.com/watch?v=DQacCB9tDaw</span>
              </div>
              <Button variant="outline" size="sm">
                View source
              </Button>
            </div>
          )}

          {/* AI Summary Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <FileText className="w-5 h-5" />
                AI SUMMARY
              </h2>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
            <div className="p-4 bg-muted/30 rounded-lg">
              <p className="text-sm leading-relaxed">
                {content || "Mira Murati introduced GPT-4o, a model merging GPT-4 with faster processing and expanded capabilities in text, vision, and audio. The aim is to enhance human-machine interaction with real-time conversational speech and improved user experience, emphasizing collaboration."}
              </p>
            </div>
          </div>

          {/* Key Points Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">Key Points</h2>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-3">
              <div className="p-4 bg-muted/30 rounded-lg">
                <h3 className="font-semibold mb-2">[SUMMARY]</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Mira Murati introduced GPT-4o, a model merging GPT-4 with faster processing and expanded capabilities in text, vision, and audio.
                </p>
              </div>
              
              <div className="p-4 bg-muted/30 rounded-lg">
                <h3 className="font-semibold mb-2">[KEY POINTS]</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-foreground">•</span>
                    <span>GPT-4o introduction with faster processing speeds</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-foreground">•</span>
                    <span>Enhanced capabilities in text, vision, and audio</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-foreground">•</span>
                    <span>Real-time conversational speech and improved user experience</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Metadata */}
          {metadata && (
            <div className="flex items-center gap-6 text-sm text-muted-foreground border-t border-border pt-4">
              {metadata.views && <span>{metadata.views} views</span>}
              {metadata.likes && <span>{metadata.likes} likes</span>}
              {metadata.comments && <span>{metadata.comments} comments</span>}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}