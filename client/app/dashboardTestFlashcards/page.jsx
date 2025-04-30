"use client";

import { useState } from "react";
import Flashcard from "@/components/flashcards/Flashcard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testFlashcards = [ //assuming this is the format of flashcards data from backend
  { id: "1", front: "What is HTML?", back: "HyperText Markup Language" },
  { id: "2", front: "What is CSS?", back: "Cascading Style Sheets" },
  { id: "3", front: "What is JS?", back: "JavaScript" },
  { id: "4", front: "What is React?", back: "A JavaScript library for building user interfaces" },
  { id: "5", front: "What is Node.js?", back: "JavaScript runtime built on Chrome's V8 engine" },
  { id: "6", front: "What is Express?", back: "Web framework for Node.js" },
  { id: "7", front: "What is MongoDB?", back: "NoSQL database" },
  { id: "8", front: "What is SQL?", back: "Structured Query Language" },
  { id: "9", front: "What is Git?", back: "Version control system" },
  { id: "10", front: "What is GitHub?", back: "Platform for version control and collaboration" },
];

export default function DashboardTestPage() {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false); // State to track if the card is flipped

  const handleNext = () => { // Move to the next flashcard
    if (index < testFlashcards.length - 1) {
      setIndex(index + 1);
      setFlipped(false);
    }
  };

  const handleBack = () => { // Move to the previous flashcard
    if (index > 0) {
      setIndex(index - 1);
      setFlipped(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6">
      {/* Flashcard */}
      <Flashcard
        term={testFlashcards[index].front}
        definition={testFlashcards[index].back}
        index={index}
        total={testFlashcards.length}
        flipped={flipped}
        setFlipped={setFlipped}
      />

      <div className="w-full max-w-md flex justify-between mt-4">
        <Button
          onClick={handleBack}
          disabled={index === 0} // Disable if on the first card
          variant="outline"
          size="icon"
          className="opacity-100"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          onClick={handleNext}
          disabled={index === testFlashcards.length - 1} // Disable if on the last card
          variant="outline"
          size="icon"
          className="opacity-100"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}