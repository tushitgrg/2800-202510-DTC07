"use client";

import { useState } from "react";
import Flashcard from "@/components/flashcards/Flashcard";
import { Button } from "@/components/ui/button";

const testFlashcards = [
  { id: "1", front: "What is HTML?", back: "HyperText Markup Language" },
  { id: "2", front: "What is CSS?", back: "Cascading Style Sheets" },
  { id: "3", front: "What is JS?", back: "JavaScript" }
];

export default function DashboardTestPage() {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    if (index < testFlashcards.length - 1) setIndex(index + 1);
  };

  const handleBack = () => {
    if (index > 0) setIndex(index - 1);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6">
      <h1 className="text-2xl font-bold mb-4">Flashcards</h1>
      <Flashcard
        term={testFlashcards[index].front}
        definition={testFlashcards[index].back}
      />

      <div className="w-full max-w-screen-md flex justify-between mt-3 px-3">
        <Button onClick={handleBack} disabled={index === 0}>
          Back
        </Button>
        <Button onClick={handleNext} disabled={index === testFlashcards.length - 1}>
          Next
        </Button>
      </div>
    </div>
  );
}