"use client";
// Component Imported from Shadcn (ui.shadcn.com)
import { Toggle } from "@/components/ui/toggle";
import { Heart } from "lucide-react";

export default function LikeButton({ liked, onChange }) {
  return (
    <Toggle
      pressed={liked}
      onPressedChange={onChange}
      aria-label="Like"
      variant="outline"
      size="lg"
    >
      <Heart className={liked ? "fill-red-500 text-red-500" : ""} />
    </Toggle>
  );
}
