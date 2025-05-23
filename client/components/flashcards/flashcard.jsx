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

/**
 * Interactive flashcards component with flip animation and progress tracking
 * Shows cards one at a time with front/back sides and allows users to mark their knowledge of the content
 *
 * @param {Object} props - Component props
 * @param {Array} props.cards - Array of flashcard objects with front and back properties
 * @param {Object} props.progress - Current progress data for this resource
 * @returns {JSX.Element} The flashcards UI
 */
export default function Flashcards({ cards, progress }) {
  // Progress tracking
  const params = useParams();
  const resourceId = params.id;

  // State management
  const [randomizedCards, setRandomizedCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);

  // Use randomized cards or fall back to original cards
  const cardsToUse = randomizedCards.length > 0 ? randomizedCards : cards;
  const currentCard = cardsToUse[currentIndex];

  /**
   * Shuffle cards on component mount
   */
  useEffect(() => {
    if (!cards || cards.length === 0) return;

    // Create a shuffled copy of the cards array
    const shuffledCards = [...cards].sort(() => Math.random() - 0.5);

    setRandomizedCards(shuffledCards);

    // Initialize correctAnswers array based on shuffled cards
    setCorrectAnswers(Array(shuffledCards.length).fill(false));
  }, [cards]);

  /**
   * Move to the next card or show results if at the end
   */
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

      // Send progress to backend if it's better than existing progress
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

  /**
   * Move to the previous card
   */
  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  /**
   * Toggle the card flip state
   */
  const flipCard = () => setIsFlipped(!isFlipped);

  /**
   * Toggle whether the current card is marked as correct
   * @param {Event} e - Change event
   */
  const toggleCorrect = (e) => {
    const newCorrectAnswers = [...correctAnswers];
    newCorrectAnswers[currentIndex] = !newCorrectAnswers[currentIndex];
    setCorrectAnswers(newCorrectAnswers);
  };

  /**
   * Reset all states to restart the flashcards
   */
  const restartFlashcards = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setCorrectAnswers(Array(cards.length).fill(false));
    setShowResults(false);
  };

  // Results view when all cards have been reviewed
  if (showResults) {
    const correctCount = correctAnswers.filter(Boolean).length;
    const scorePercentage = Math.round(
      (correctCount / cardsToUse.length) * 100,
    );

    return (
      <div className="w-full max-w-md">
        {/* Show achievement badges based on score */}
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

  // Main flashcard view
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

      {/* Navigation buttons */}
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

/**
 * Individual flashcard item with flip animation and responsive text sizing
 *
 * @param {Object} props - Component props
 * @param {string} props.front - Content for the front of the card
 * @param {string} props.back - Content for the back of the card
 * @param {boolean} props.flipped - Whether the card is flipped to show the back
 * @param {Function} props.onFlip - Handler for flipping the card
 * @param {number} props.index - Current card index
 * @param {number} props.total - Total number of cards
 * @param {boolean} props.isCorrect - Whether the card is marked as correct
 * @param {Function} props.onToggleCorrect - Handler for toggling correct state
 * @returns {JSX.Element} The flashcard item UI
 */
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
  // Adaptive text sizing state
  const [frontSize, setFrontSize] = useState("text-lg");
  const [backSize, setBackSize] = useState("text-lg");

  // Refs for content and container measurement
  const frontRef = useRef(null);
  const backRef = useRef(null);
  const frontCardRef = useRef(null);
  const backCardRef = useRef(null);

  /**
   * Adjust text size based on content length and container size
   */
  useEffect(() => {
    /**
     * Calculate appropriate text size class based on content and container ratio
     * @param {number} contentHeight - Height of the content
     * @param {number} cardHeight - Height of the container
     * @returns {string} Tailwind text size class
     */
    function getTextSize(contentHeight, cardHeight) {
      const ratio = cardHeight / contentHeight;
      if (ratio < 0.5) return "text-xs";
      if (ratio < 0.7) return "text-sm";
      if (ratio < 0.9) return "text-base";
      return "text-lg";
    }

    /**
     * Measure and adjust front card text size
     */
    function adjustFrontSize() {
      if (!frontRef.current || !frontCardRef.current) return;

      const contentHeight = frontRef.current.scrollHeight;
      const cardHeight = frontCardRef.current.clientHeight - 48; // Accounting for padding

      if (contentHeight > cardHeight) {
        setFrontSize(getTextSize(contentHeight, cardHeight));
      }
    }

    /**
     * Measure and adjust back card text size
     */
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
