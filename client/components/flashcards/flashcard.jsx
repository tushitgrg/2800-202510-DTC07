"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { updateResourceProgress } from "@/lib/progress";
import { useParams } from "next/navigation";
import BadgeEarnedModal from "../badge/BadgeModel";

export default function Flashcards({ cards, progress }) {
  // Progress tracking
  const params = useParams();
  const resourceId = params.id;

  // State for randomized cards
  const [randomizedCards, setRandomizedCards] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);

  // Use randomized cards or fall back to original cards
  const cardsToUse = randomizedCards.length > 0 ? randomizedCards : cards;
  const currentCard = cardsToUse[currentIndex];

  // Shuffle cards on component mount
  useEffect(() => {
    if (!cards || cards.length === 0) return;

    // Create a shuffled copy of the cards array
    const shuffledCards = [...cards].sort(() => Math.random() - 0.5);

    setRandomizedCards(shuffledCards);

    // CorrectAnswers array based on shuffled cards
    setCorrectAnswers(Array(shuffledCards.length).fill(false));
  }, [cards]);

  // Navigation
  const nextCard = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    } else {
      // Show results when reaching the last card
      setShowResults(true);

      // Calculate score percentage
      const correctCount = correctAnswers.filter(Boolean).length;
      const scorePercentage = Math.round((correctCount / cards.length) * 100);

      // Send progress to backend
      if (
        !progress ||
        !progress.flashcardScore ||
        scorePercentage > progress.flashcardScore
      ) {
        updateResourceProgress(
          resourceId,
          {
            flashcardScore: scorePercentage,
          },
          progress,
        );
      }
    }
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const flipCard = () => setIsFlipped(!isFlipped);

  const toggleCorrect = (e) => {
    const newCorrectAnswers = [...correctAnswers];
    newCorrectAnswers[currentIndex] = !newCorrectAnswers[currentIndex];
    setCorrectAnswers(newCorrectAnswers);
  };

  const restartFlashcards = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setCorrectAnswers(Array(cards.length).fill(false));
    setShowResults(false);
  };

  // Results view
  if (showResults) {
    const correctCount = correctAnswers.filter(Boolean).length;
    const scorePercentage = Math.round(
      (correctCount / cardsToUse.length) * 100,
    );

    return (
      <div className="w-full max-w-md">
        {scorePercentage > 70 && <BadgeEarnedModal success={true} />}
        {scorePercentage < 30 && <BadgeEarnedModal success={false} />}
        <Card className="w-full">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-center mb-4">
              Flashcards Completed!
            </h2>
            <p className="text-center text-lg mb-6">
              You marked <span className="font-bold">{correctCount}</span> out
              of {cards.length} cards as learned ({scorePercentage}%)
            </p>
            <Button className="w-full" onClick={restartFlashcards}>
              Restart Flashcards
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-md">
      <FlashcardItem
        front={currentCard.front}
        back={currentCard.back}
        flipped={isFlipped}
        onFlip={flipCard}
        index={currentIndex}
        total={cards.length}
        isCorrect={correctAnswers[currentIndex]}
        onToggleCorrect={toggleCorrect}
      />

      <div className="w-full flex justify-between mt-12">
        <Button
          onClick={prevCard}
          disabled={currentIndex === 0}
          variant="outline"
          size="icon"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <Button onClick={nextCard} variant="outline" size="icon">
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}

// Flashcard item component
function FlashcardItem({
  front,
  back,
  flipped,
  onFlip,
  index,
  total,
  isCorrect,
  onToggleCorrect,
}) {
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
      <div className="mt-1 mb-3 text-sm text-gray-500">
        Flashcard {index + 1} / {total}
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
          className="absolute w-full h-full flex items-center justify-center text-center bg-slate-900 border-slate-800"
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
          className="absolute w-full h-full flex items-center justify-center text-center bg-slate-700 border-slate-600"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div
            ref={backRef}
            className={`font-semibold p-6 w-full ${backSize} break-words`}
          >
            {back}
          </div>

          {/* Got it right checkbox */}
          <div
            className="absolute bottom-3 right-3 flex items-center space-x-2"
            onClick={(e) => e.stopPropagation()} // Prevent card flip
          >
            <Checkbox
              id={`learned-${index}`}
              checked={isCorrect}
              onCheckedChange={(e) => onToggleCorrect(e)}
            />
            <label htmlFor={`learned-${index}`} className="text-sm">
              I know this!
            </label>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
