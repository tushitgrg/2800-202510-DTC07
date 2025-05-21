"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { updateResourceProgress } from "@/lib/progress";
import { useParams } from "next/navigation";
import BadgeEarnedModal from "../badge/BadgeModel";

/**
 * Interactive quiz component with randomized questions and progress tracking
 * Shows questions one at a time with multiple choice answers and provides feedback
 *
 * @param {Object} props - Component props
 * @param {Array} props.questions - Array of question objects with question, options, and answer properties
 * @param {Function} props.onComplete - Callback function called when quiz is completed
 * @param {Object} props.progress - Current progress data for this resource
 * @returns {JSX.Element} The quiz UI
 */
export default function Quiz({ questions, onComplete, progress }) {
  // Loading state
  const [loading, setLoading] = useState(true);

  // Remove initial loading flicker
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1);

    return () => clearTimeout(timer);
  }, []);

  // Quiz state management
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [randomizedQuestions, setRandomizedQuestions] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  // Timer state
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(true);

  /**
   * Initialize user answers when randomized questions are ready
   */
  useEffect(() => {
    if (randomizedQuestions.length > 0) {
      setUserAnswers(Array(randomizedQuestions.length).fill(null));
    }
  }, [randomizedQuestions]);

  /**
   * Randomize questions and their options on component mount
   */
  useEffect(() => {
    if (!questions || questions.length === 0) return;

    // Shuffle the questions
    const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);

    // Shuffle the options for each question
    const questionsWithShuffledOptions = shuffledQuestions.map((question) => {
      // Store correct answer
      const correctAnswer = question.answer;

      // Don't shuffle True/False questions
      const isTrueFalseQuestion =
        question.options.length === 2 &&
        question.options.every(
          (option) =>
            option.toLowerCase() === "true" || option.toLowerCase() === "false"
        );

      // Shuffle options for non-true/false questions
      const shuffledOptions = isTrueFalseQuestion
        ? [...question.options]
        : [...question.options].sort(() => Math.random() - 0.5);

      return {
        ...question,
        options: shuffledOptions,
        answer: correctAnswer,
      };
    });

    setRandomizedQuestions(questionsWithShuffledOptions);
  }, [questions]);

  /**
   * Initialize timer when component mounts
   */
  useEffect(() => {
    let timer;
    if (timerRunning) {
      timer = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [timerRunning]);

  // Progress tracking
  const params = useParams();
  const resourceId = params.id;

  // Use randomized questions or fall back to original questions
  const questionsToUse =
    randomizedQuestions.length > 0 ? randomizedQuestions : questions;

  // Get current question and user's answer
  const current = questionsToUse[currentIndex];
  const currentAnswer = userAnswers[currentIndex];

  /**
   * Format seconds into MM:SS display
   * @param {number} seconds - Time in seconds
   * @returns {string} Formatted time string
   */
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  /**
   * Handle answer selection for current question
   * @param {string} choice - Selected answer option
   */
  const handleSelect = (choice) => {
    if (currentAnswer !== null) return; // Prevent changing answer after selection
    const newAnswers = [...userAnswers];
    newAnswers[currentIndex] = choice;
    setUserAnswers(newAnswers);
  };

  /**
   * Navigate to next question or show completion dialog
   */
  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Check for unanswered questions before final submission
      if (userAnswers.includes(null)) {
        setShowConfirmDialog(true);
      } else {
        submitQuiz();
      }
    }
  };

  /**
   * Navigate to previous question
   */
  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  /**
   * Submit quiz and calculate final score
   */
  const submitQuiz = () => {
    // Stop the timer
    setTimerRunning(false);

    // Fill in unanswered questions with an incorrect choice
    const finalAnswers = userAnswers.map((answer, index) => {
      if (answer === null) {
        const correctAnswer = questionsToUse[index].answer;
        const incorrectChoice = questionsToUse[index].options.find(
          (choice) => choice !== correctAnswer
        );
        return incorrectChoice || questionsToUse[index].options[0];
      }
      return answer;
    });

    setUserAnswers(finalAnswers);
    setShowResults(true);
    setShowConfirmDialog(false);
    onComplete?.();

    // Calculate score percentage
    const score = calculateScore();
    const scorePercentage = Math.round((score / questions.length) * 100);

    // Send progress to backend
    updateResourceProgress(
      resourceId,
      {
        quizScore: scorePercentage,
      },
      progress
    );
  };

  /**
   * Calculate quiz score based on correct answers
   * @returns {number} Number of correct answers
   */
  const calculateScore = () => {
    return userAnswers.reduce((score, answer, i) => {
      return score + (answer === questionsToUse[i].answer ? 1 : 0);
    }, 0);
  };

  /**
   * Get button style based on answer correctness
   * @param {string} choice - Answer option
   * @returns {Object} CSS style object
   */
  const getButtonStyle = (choice) => {
    if (currentAnswer === null) return {};

    if (choice === currentAnswer && choice === current.answer) {
      return { backgroundColor: "#0fa372", color: "white" }; // Correct answer
    }
    if (choice === currentAnswer && choice !== current.answer) {
      return { backgroundColor: "#d45959", color: "white" }; // Wrong answer
    }
    if (choice !== currentAnswer && choice === current.answer) {
      return { backgroundColor: "#0fa372", color: "white" }; // Show correct answer
    }
    return {};
  };

  /**
   * Get feedback message based on answer correctness
   * @returns {JSX.Element|null} Feedback message or null if no answer selected
   */
  const getFeedback = () => {
    if (currentAnswer === null) return null;

    return (
      <div
        className={`mb-2 font-light text-sm text-center ${
          currentAnswer === current.answer ? "text-green-500" : "text-red-400"
        }`}
      >
        {currentAnswer === current.answer ? "Correct!" : "Wrong!"}
      </div>
    );
  };

  /**
   * Reset quiz to initial state
   */
  const handleRestart = () => {
    setUserAnswers(Array(questions.length).fill(null));
    setCurrentIndex(0);
    setShowResults(false);
    setElapsedTime(0);
    setTimerRunning(true);
  };

  /**
   * Timer display component
   * @returns {JSX.Element} Timer UI
   */
  const Timer = () => (
    <div className="flex items-center justify-center gap-1 text-sm text-gray-500 mb-2">
      <Clock className="h-4 w-4" />
      <span>Time: {formatTime(elapsedTime)}</span>
    </div>
  );

  // Loading state
  if (loading) {
    return <div className="w-full h-[400px]"></div>;
  }

  // Results view
  if (showResults) {
    const score = calculateScore();
    const scorePercentage = (score / questions.length) * 100;
    return (
      <div className="w-full max-w-md">
        {/* Keep the timer visible on results page */}
        <Timer />

        {/* Show achievement badges based on score */}
        {scorePercentage > 70 && <BadgeEarnedModal success={true} />}
        {scorePercentage < 30 && <BadgeEarnedModal success={false} />}

        <Card className="w-full">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-center mb-4">
              Quiz Completed!
            </h2>
            <p className="text-center text-lg mb-6">
              Your score: <span className="font-bold">{score}</span> out of{" "}
              {questions.length}
            </p>
            <p className="text-center text-gray-600 mb-6">
              Time taken: {formatTime(elapsedTime)}
            </p>
            <Button className="w-full" onClick={handleRestart}>
              Restart Quiz
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Quiz view
  return (
    <div className="w-full max-w-md">
      {/* Progress indicator and timer on same row */}
      <div className="flex justify-between items-center mb-2">
        <div className="text-sm text-gray-500">
          Question {currentIndex + 1} / {questions.length}
        </div>
        <Timer />
      </div>

      {/* Question card */}
      <Card className="mb-4">
        <CardContent className="p-6 text-center font-semibold text-lg">
          {current.question}
        </CardContent>
      </Card>

      {/* Feedback for current answer */}
      {getFeedback()}

      {/* Answer choices */}
      <div className="space-y-2 mb-4">
        {current.options.map((choice, i) => (
          <Button
            key={i}
            onClick={() => handleSelect(choice)}
            className="w-full justify-start text-left py-3 h-auto whitespace-normal"
            variant="outline"
            disabled={
              currentAnswer !== null &&
              choice !== currentAnswer &&
              choice !== current.answer
            }
            style={getButtonStyle(choice)}
          >
            {choice}
          </Button>
        ))}
      </div>

      {/* Navigation buttons */}
      <div className="w-full flex justify-between mt-4">
        <Button
          onClick={handleBack}
          disabled={currentIndex === 0}
          variant="outline"
          size="icon"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <Button onClick={handleNext} variant="outline" size="icon">
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Confirmation dialog for unanswered questions */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Submit Quiz?</AlertDialogTitle>
            <AlertDialogDescription>
              You have unanswered questions. If you submit now, these questions
              will be marked as wrong. Are you sure you want to submit?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={submitQuiz}>
              Submit Anyway
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}