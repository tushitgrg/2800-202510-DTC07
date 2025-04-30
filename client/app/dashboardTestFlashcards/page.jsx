"use client";

import { useState } from "react";
import Flashcard from "@/components/flashcards/Flashcard";
import { Button } from "@/components/ui/button";

const testFlashcards = [ // Sample flashcards for testing
  { id: "1", front: "What is HTML?", back: "HyperText Markup Language" },
  { id: "2", front: "What is CSS?", back: "Cascading Style Sheets" },
  { id: "3", front: "What is JS?", back: "JavaScript" },
  { id: "4", front: "What is React?", back: "A JavaScript library for building user interfaces" },
  { id: "5", front: "What is Node.js?", back: "JavaScript runtime built on Chrome's V8 JavaScript engine" },
  { id: "6", front: "What is Express?", back: "Web framework for Node.js" },
  { id: "7", front: "What is MongoDB?", back: "NoSQL database" },
  { id: "8", front: "What is SQL?", back: "Structured Query Language" },
  { id: "9", front: "What is Git?", back: "Version control system" },
  { id: "10", front: "What is GitHub?", back: "Platform for version control and collaboration" }
];

export default function DashboardTestPage() {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const handleNext = () => {
    if (index < testFlashcards.length - 1) {
      setIndex(index + 1);
      setFlipped(false); // Reset to front
    }
  };

  const handleBack = () => {
    if (index > 0) {
      setIndex(index - 1);
      setFlipped(false); // Reset to front
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6 relative">
      <Flashcard
        term={testFlashcards[index].front}
        definition={testFlashcards[index].back}
        index={index}
        total={testFlashcards.length}
        flipped={flipped}
        setFlipped={setFlipped}
      />

      <div className="w-full max-w-screen-md flex justify-between mt-8 px-4 absolute bottom-8">
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