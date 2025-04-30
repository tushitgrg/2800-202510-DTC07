"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function Flashcard({ term, definition }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <Card
      className="w-full max-w-md h-64 flex items-center justify-center text-center cursor-pointer"
      onClick={() => setFlipped(!flipped)}
    >
      <CardContent className="flex items-center justify-center h-full text-lg font-semibold">
        {flipped ? definition : term}
      </CardContent>
    </Card>
  );
}