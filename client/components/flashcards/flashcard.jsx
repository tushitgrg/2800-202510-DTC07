"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Flashcards({ cards }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const currentCard = cards[currentIndex];

  // Navigation
  const nextCard = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const flipCard = () => setIsFlipped(!isFlipped);

  return (
    <div className="relative w-full max-w-md">
      <FlashcardItem
        front={currentCard.front}
        back={currentCard.back}
        flipped={isFlipped}
        onFlip={flipCard}
        index={currentIndex}
        total={cards.length}
      />

      <div className="w-full max-w-md flex justify-between mt-4">
        <Button
          onClick={prevCard}
          disabled={currentIndex === 0}
          variant="outline"
          size="icon"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <Button
          onClick={nextCard}
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

// Flashcard item component
function FlashcardItem({ front, back, flipped, onFlip, index, total }) {
  // Text sizing state
  const [frontSize, setFrontSize] = useState("text-lg");
  const [backSize, setBackSize] = useState("text-lg");

  // Refs for measurement
  const frontRef = useRef(null);
  const backRef = useRef(null);
  const frontCardRef = useRef(null);
  const backCardRef = useRef(null);

  // Adjust text size when content changes
  useEffect(() => {
    // Helper function to determine appropriate text size
    function getTextSize(contentHeight, cardHeight) {
      const ratio = cardHeight / contentHeight;
      if (ratio < 0.5) return "text-xs";
      if (ratio < 0.7) return "text-sm";
      if (ratio < 0.9) return "text-base";
      return "text-lg";
    }

    // Measure and set front card text size
    function adjustFrontSize() {
      if (!frontRef.current || !frontCardRef.current) return;

      const contentHeight = frontRef.current.scrollHeight;
      const cardHeight = frontCardRef.current.clientHeight - 48; // Accounting for padding

      if (contentHeight > cardHeight) {
        setFrontSize(getTextSize(contentHeight, cardHeight));
      }
    }

    // Measure and set back card text size
    function adjustBackSize() {
      if (!backRef.current || !backCardRef.current) return;

      const contentHeight = backRef.current.scrollHeight;
      const cardHeight = backCardRef.current.clientHeight - 48; // Accounting for padding

      if (contentHeight > cardHeight) {
        setBackSize(getTextSize(contentHeight, cardHeight));
      }
    }

    // Reset sizes first to get accurate measurements
    setFrontSize("text-lg");
    setBackSize("text-lg");

    // Use timeout to ensure DOM has updated before measuring
    setTimeout(() => {
      adjustFrontSize();
      adjustBackSize();
    }, 0);
  }, [front, back]);

  return (
    <div
      className="relative w-full max-w-md h-64 perspective cursor-pointer"
      onClick={onFlip}
    >
      {/* Card counter */}
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-sm text-muted-foreground z-10">
        {index + 1} / {total}
      </div>

      {/* Card container with flip animation */}
      <motion.div
        key={index}
        className="w-full h-full relative"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front side */}
        <Card
          ref={frontCardRef}
          className="absolute w-full h-full flex items-center justify-center text-center bg-slate-950 border-slate-900"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div
            ref={frontRef}
            className={`font-semibold p-6 w-full ${frontSize} break-words`}
          >
            {front}
          </div>
        </Card>

        {/* Back side */}
        <Card
          ref={backCardRef}
          className="absolute w-full h-full flex items-center justify-center text-center bg-slate-800 border-slate-700"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div
            ref={backRef}
            className={`font-semibold p-6 w-full ${backSize} break-words`}
          >
            {back}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}