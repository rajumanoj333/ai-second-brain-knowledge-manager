"use client";

import { ReactNode } from "react";

interface MasonryGridProps {
  children: ReactNode;
  columns?: number;
  gap?: number;
}

export default function MasonryGrid({ 
  children, 
  columns = 3, 
  gap = 16 
}: MasonryGridProps) {
  return (
    <div
      style={{
        columnCount: columns,
        columnGap: `${gap}px`,
      }}
      className="w-full"
    >
      {children}
    </div>
  );
}

interface MasonryItemProps {
  children: ReactNode;
}

export function MasonryItem({ children }: MasonryItemProps) {
  return (
    <div
      style={{
        breakInside: "avoid",
        marginBottom: "16px",
      }}
      className="w-full"
    >
      {children}
    </div>
  );
}
