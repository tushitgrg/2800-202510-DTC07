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

export default function Quiz({ questions, onComplete, progress }) {
  // State management
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  // Randomization
  const [randomizedQuestions, setRandomizedQuestions] = useState([]);
  useEffect(() => {
    if (randomizedQuestions.length > 0) {
      setUserAnswers(Array(randomizedQuestions.length).fill(null));
    }
  }, [randomizedQuestions]);

  const [showResults, setShowResults] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  // Timer
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(true);

  // Randomize questions and options
  useEffect(() => {
    if (!questions || questions.length === 0) return;
    // Shuffle the questions
    const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
    // Shuffle the options
    const questionsWithShuffledOptions = shuffledQuestions.map((question) => {
      // correct answer
      const correctAnswer = question.answer;

      // not shuffling True/false questions
      const isTrueFalseQuestion =
        question.options.length === 2 &&
        question.options.every(
          (option) =>
            option.toLowerCase() === "true" || option.toLowerCase() === "false"
        );

      // Shuffle the options
      const shuffledOptions = [...question.options].sort(
        () => Math.random() - 0.5
      );

      return {
        ...question,
        options: shuffledOptions,
        answer: correctAnswer,
      };
    });

    setRandomizedQuestions(questionsWithShuffledOptions);
  }, [questions]);

  // Initialize userAnswers based on randomized questions
  useEffect(() => {
    if (randomizedQuestions.length > 0) {
      setUserAnswers(Array(randomizedQuestions.length).fill(null));
    }
  }, [randomizedQuestions]);

  // Start timer
  useEffect(() => {
    let timer;
    if (timerRunning) {
      timer = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [timerRunning]);

  // Format time function
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  // Use randomizedQuestions instead of questions
  const questionsToUse =
    randomizedQuestions.length > 0 ? randomizedQuestions : questions;

  // Get current question and answer
  const current = questionsToUse[currentIndex];
  const currentAnswer = userAnswers[currentIndex];

  // Progress tracking
  const params = useParams();
  const resourceId = params.id;

  // Handle answer selection
  const handleSelect = (choice) => {
    if (currentAnswer !== null) return; // Prevent changing answer after selection
    const newAnswers = [...userAnswers];
    newAnswers[currentIndex] = choice;
    setUserAnswers(newAnswers);
  };

  // Handle navigation
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

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Submit quiz and calculate score
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

  // Calculate score
  const calculateScore = () => {
    return userAnswers.reduce((score, answer, i) => {
      return score + (answer === questionsToUse[i].answer ? 1 : 0);
    }, 0);
  };

  // Get button style based on answer
  const getButtonStyle = (choice) => {
    if (currentAnswer === null) return {};

    if (choice === currentAnswer && choice === current.answer) {
      return { backgroundColor: "#0fa372", color: "white" };
    }
    if (choice === currentAnswer && choice !== current.answer) {
      return { backgroundColor: "#d45959", color: "white" };
    }
    if (choice !== currentAnswer && choice === current.answer) {
      return { backgroundColor: "#0fa372", color: "white" };
    }
    return {};
  };

  // Get feedback message
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

  // Restart quiz
  const handleRestart = () => {
    setUserAnswers(Array(questions.length).fill(null));
    setCurrentIndex(0);
    setShowResults(false);
    setElapsedTime(0);
    setTimerRunning(true);
  };

  // Timer component
  const Timer = () => (
    <div className="flex items-center justify-center gap-1 text-sm text-gray-500 mb-2">
      <Clock className="h-4 w-4" />
      <span>Time: {formatTime(elapsedTime)}</span>
    </div>
  );

  // Results view
  if (showResults) {
    return (
      <div className="w-full max-w-md">
        {/* Keep the timer visible on results page */}
        <Timer />
        <Card className="w-full">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-center mb-4">
              Quiz Completed!
            </h2>
            <p className="text-center text-lg mb-6">
              Your score: <span className="font-bold">{calculateScore()}</span>{" "}
              out of {questions.length}
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

      {/* Feedback */}
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

      {/* Navigation */}
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

      {/* Confirmation dialog */}
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
