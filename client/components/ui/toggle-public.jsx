"use client";
import { Toggle } from "@/components/ui/toggle";

import { Globe } from "lucide-react";

export default function TogglePublicButton({ isPublic, onClick }) {
  return (
    <Toggle
      pressed={isPublic}
      onPressedChange={onClick}
      aria-label={isPublic ? "Make private" : "Make public"}
      variant="outline"
      size="lg"
    >
      <Globe className={isPublic ? "text-purple-600" : ""} />
    </Toggle>
  );
}