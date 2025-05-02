"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Flashcard component
const FlashcardItem = ({ front, back, flipped, onFlip, index, total }) => {
  const [cardHeight, setCardHeight] = useState("16rem"); // Default height
  const frontContentRef = useRef(null);

  // Calculate height based on front content
  useEffect(() => {
    if (frontContentRef.current) {
      const contentHeight = frontContentRef.current.scrollHeight;
      const height = Math.max(contentHeight, 256);
      setCardHeight(`${height + 16}px`);
    }
  }, [front]);

  return (
    <div
      className="relative w-full max-w-md perspective cursor-pointer"
      onClick={onFlip}
      style={{ height: cardHeight }}
    >
      {/* Counter */}
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-sm text-muted-foreground z-10">
        {index + 1} / {total}
      </div>

      <motion.div
        key={index} // Add key to force reset animation on card change
        className="w-full h-full relative"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <Card
          className="absolute w-full h-full bg-slate-950 border-slate-900"
          style={{ backfaceVisibility: "hidden", position: "absolute" }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              ref={frontContentRef}
              className="w-full text-center p-6 text-lg font-semibold"
            >
              {front}
            </div>
          </div>
        </Card>

        {/* Back with dark scrollbar */}
        <Card
          className="absolute w-full h-full bg-slate-900 border-slate-950"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)", position: "absolute" }}
        >
          <div className="absolute inset-0 overflow-auto dark-scrollbar">
            <div className="min-h-full flex items-center justify-center text-center p-6">
              <div className="text-lg font-semibold">{back}</div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

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
    <div className="relative w-full max-w-md">
      {/* Flashcard */}
      <FlashcardItem
        front={currentCard.front}
        back={currentCard.back}
        flipped={isFlipped}
        onFlip={handleFlip}
        index={currentIndex}
        total={cards.length}
      />

      {/* Navigation */}
      <div className="w-full max-w-md flex justify-between mt-4">
        <Button
          onClick={handleBack}
          disabled={currentIndex === 0}
          variant="outline"
          size="icon"
          className="opacity-100"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <Button
          onClick={handleNext}
          disabled={currentIndex === cards.length - 1}
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