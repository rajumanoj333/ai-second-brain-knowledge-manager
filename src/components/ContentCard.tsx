"use client";

import { FileText, Youtube, Image as ImageIcon, FileVideo, Bookmark } from "lucide-react";
import { Card } from "@/components/ui/card";

export type ContentType = "note" | "article" | "video" | "image" | "document" | "add-note";

interface ContentCardProps {
  type: ContentType;
  title?: string;
  content?: string;
  imageUrl?: string;
  metadata?: {
    views?: string;
    likes?: string;
    comments?: string;
  };
  onClick?: () => void;
  className?: string;
}

export default function ContentCard({
  type,
  title,
  content,
  imageUrl,
  metadata,
  onClick,
  className = "",
}: ContentCardProps) {
  const getIcon = () => {
    switch (type) {
      case "article":
        return <FileText className="w-5 h-5" />;
      case "video":
        return <Youtube className="w-5 h-5 text-red-500" />;
      case "image":
        return <ImageIcon className="w-5 h-5" />;
      case "document":
        return <FileText className="w-5 h-5" />;
      default:
        return null;
    }
  };

  if (type === "add-note") {
    return (
      <Card
        className={`p-6 cursor-pointer hover:shadow-lg transition-all border-2 border-dashed border-muted-foreground/30 hover:border-primary/50 bg-background ${className}`}
        onClick={onClick}
      >
        <div className="flex flex-col items-center justify-center h-full min-h-[200px]">
          <div className="text-primary/60 text-sm font-medium uppercase tracking-wider mb-3">
            Add a new note
          </div>
          <div className="text-muted-foreground text-sm">
            Start typing here...
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card
      className={`overflow-hidden cursor-pointer hover:shadow-lg transition-all group ${className}`}
      onClick={onClick}
    >
      {imageUrl && (
        <div className="relative overflow-hidden">
          <img
            src={imageUrl}
            alt={title || "Content"}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {type === "video" && (
            <div className="absolute top-3 left-3 bg-red-500 rounded px-2 py-1 flex items-center gap-1">
              <Youtube className="w-4 h-4 text-white" />
            </div>
          )}
          {type !== "add-note" && (
            <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Bookmark className="w-4 h-4" />
            </div>
          )}
        </div>
      )}
      
      {(title || content) && (
        <div className="p-4">
          {title && (
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-semibold text-base line-clamp-2">{title}</h3>
              {getIcon() && (
                <div className="flex-shrink-0 mt-1">{getIcon()}</div>
              )}
            </div>
          )}
          {content && (
            <p className="text-sm text-muted-foreground line-clamp-3">
              {content}
            </p>
          )}
          {metadata && (
            <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
              {metadata.views && <span>{metadata.views} views</span>}
              {metadata.likes && <span>{metadata.likes} likes</span>}
              {metadata.comments && <span>{metadata.comments} comments</span>}
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
