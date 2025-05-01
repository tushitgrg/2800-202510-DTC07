"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
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

export default function Quiz({
  questions,
  currentIndex,
  onIndexChange,
  userAnswers,
  onAnswerSelect,
  showResults = false,
  onComplete,
  onRestart
}) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const current = questions[currentIndex];
  const currentAnswer = userAnswers[currentIndex];

  const handleSelect = (choice) => {
    if (currentAnswer !== null) return;
    onAnswerSelect(currentIndex, choice);
  };

  const hasUnansweredQuestions = () => {
    return userAnswers.some(answer => answer === null);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      onIndexChange(currentIndex + 1);
    } else {
      // on the last question, check if need to confirm submission
      if (hasUnansweredQuestions()) {
        setShowConfirmDialog(true);
      } else {
        onComplete();
      }
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      onIndexChange(currentIndex - 1);
    }
  };

  const handleConfirmSubmit = () => {
    // mark all empty answers as wrong
    const markUnansweredAsWrong = () => {
      const updatedAnswers = userAnswers.map((answer, index) => {
        if (answer === null) {
          // pick any wrong answer to mark it incorrect
          const correctAnswer = questions[index].answer;
          const incorrectAnswer = questions[index].choices.find(choice => choice !== correctAnswer);
          return incorrectAnswer || questions[index].choices[0];
        }
        return answer;
      });

      updatedAnswers.forEach((answer, index) => {
        if (userAnswers[index] === null) {
          onAnswerSelect(index, answer);
        }
      });
    };

    markUnansweredAsWrong();
    setShowConfirmDialog(false);
    onComplete();
  };

  const calculateScore = () => {
    return userAnswers.reduce((score, answer, i) => {
      return score + (answer === questions[i].answer ? 1 : 0);
    }, 0);
  };

  const getButtonStyle = (choice) => {
    if (currentAnswer === null) return {};

    if (choice === currentAnswer && choice === current.answer) {
      return { backgroundColor: '#10b981', borderColor: '#10b981', color: 'white' };
    }

    if (choice === currentAnswer && choice !== current.answer) {
      return { backgroundColor: '#ef4444', borderColor: '#ef4444', color: 'white' };
    }

    if (choice !== currentAnswer && choice === current.answer) {
      return { backgroundColor: '#10b981', borderColor: '#10b981', color: 'white' };
    }

    return {};
  };

  const getFeedback = () => {
    if (currentAnswer === null) return null;

    if (currentAnswer === current.answer) {
      return (
        <div className="mb-3 font-medium text-center text-green-600">
          Correct!
        </div>
      );
    } else {
      return (
        <div className="mb-3 font-medium text-center text-red-600">
          Wrong!
        </div>
      );
    }
  };

  if (showResults) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-center mb-4">Quiz Completed!</h2>
          <p className="text-center text-lg mb-6">
            Your score: <span className="font-bold text-primary">{calculateScore()}</span> out of {questions.length}
          </p>
          <Button
            className="w-full"
            onClick={onRestart}
          >
            Restart Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-md">
      <div className="mb-2 text-sm text-muted-foreground text-center">
        Question {currentIndex + 1} / {questions.length}
      </div>

      <Card className="mb-4">
        <CardContent className="p-6 text-center font-semibold text-lg">
          {current.question}
        </CardContent>
      </Card>

      {getFeedback()}

      <div className="space-y-2 mb-4">
        {current.choices.map((choice, i) => (
          <Button
            key={i}
            onClick={() => handleSelect(choice)}
            className="w-full justify-start text-left"
            variant="outline"
            disabled={currentAnswer !== null && choice !== currentAnswer && choice !== current.answer}
            style={getButtonStyle(choice)}
          >
            {choice}
          </Button>
        ))}
      </div>

      <div className="w-full flex justify-between mt-4">
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
          variant="outline"
          size="icon"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Confirmation dialog for submitting the quiz */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Submit Quiz?</AlertDialogTitle>
            <AlertDialogDescription>
              You have unanswered questions. If you submit now, these questions will be marked as wrong. Are you sure you want to submit?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmSubmit}>
              Submit Anyway
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}