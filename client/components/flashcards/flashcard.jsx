"use client";

import { Card, CardContent } from "@/components/ui/card";

export default function Flashcard() {
  return (
    <Card className="w-full max-w-sm h-40 flex items-center justify-center">
      <CardContent className="text-muted-foreground">
        (Empty Flashcard)
      </CardContent>
    </Card>
  );
}