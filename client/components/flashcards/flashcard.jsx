"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

// This component assumes that you have flashcards in the following format:
// const testFlashcards = [
//   { id: "1", front: "What is HTML?", back: "HyperText Markup Language" },
//   { id: "2", front: "What is CSS?", back: "Cascading Style Sheets" },
//   { id: "3", front: "What is JS?", back: "JavaScript" },
//   { id: "4", front: "What is React?", back: "A JavaScript library for building user interfaces" },
//   { id: "5", front: "What is Node.js?", back: "JavaScript runtime built on Chrome's V8 engine" },
//   { id: "6", front: "What is Express?", back: "Web framework for Node.js" },
//   { id: "7", front: "What is MongoDB?", back: "NoSQL database" },
//   { id: "8", front: "What is SQL?", back: "Structured Query Language" },
//   { id: "9", front: "What is Git?", back: "Version control system" },
//   { id: "10", front: "What is GitHub?", back: "Platform for version control and collaboration" },
// ];

// Individual Flashcard component
const FlashcardItem = ({ front, back, flipped, onFlip }) => {
  return (
    <div
      className="relative w-full max-w-md h-64 perspective cursor-pointer"
      onClick={onFlip}
    >
      <motion.div
        className="w-full h-full relative"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <Card
          className="absolute w-full h-full flex items-center justify-center text-center p-4"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="text-lg font-semibold">{front}</div>
        </Card>

        {/* Back */}
        <Card
          className="absolute w-full h-full flex items-center justify-center text-center p-4"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="text-lg font-semibold">{back}</div>
        </Card>
      </motion.div>
    </div>
  );
};

// Main Flashcards component that manages the set
export default function Flashcards({ cards }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Get current card
  const currentCard = cards[currentIndex];

  // Navigation handlers
  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  // Flip handler
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Counter */}
      <div className="text-center text-sm text-gray-500 mb-4">
        Card {currentIndex + 1} of {cards.length}
      </div>

      {/* Flashcard */}
      <FlashcardItem
        front={currentCard.front}
        back={currentCard.back}
        flipped={isFlipped}
        onFlip={handleFlip}
      />

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <Button
          onClick={handleBack}
          disabled={currentIndex === 0}
          variant="outline"
          size="icon"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <Button
          onClick={handleNext}
          disabled={currentIndex === cards.length - 1}
          variant="outline"
          size="icon"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}