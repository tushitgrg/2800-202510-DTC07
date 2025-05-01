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

// This component assumes that you have a list of questions in the following format:
//   {
//     id: "1",
//     question: "What does HTML stand for?",
//     choices: ["HyperText Markup Language", "HighText Machine Language", "Home Tool Markup Language"],
//     answer: "HyperText Markup Language"
//   },
//   {
//     id: "2",
//     question: "Which language is used for styling web pages?",
//     choices: ["HTML", "JQuery", "CSS", "XML"],
//     answer: "CSS"
//   },
//   {
//     id: "3",
//     question: "Which is not a JavaScript framework?",
//     choices: ["React", "Angular", "Vue", "Django"],
//     answer: "Django"
//   },
//   {
//     id: "4",
//     question: "What does CSS stand for?",
//     choices: ["Cascading Style Sheets", "Colorful Style Sheets", "Computer Style Sheets"],
//     answer: "Cascading Style Sheets"
//   },
//   {
//     id: "5",
//     question: "Which HTML attribute is used to define inline styles?",
//     choices: ["class", "style", "font", "styles"],
//     answer: "style"
//   }
// ];

export default function Quiz({ questions, onComplete }) {
  // Simplified state management
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(null));
  const [showResults, setShowResults] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  // Get current question and answer
  const current = questions[currentIndex];
  const currentAnswer = userAnswers[currentIndex];

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
    // Fill in unanswered questions with an incorrect choice
    const finalAnswers = userAnswers.map((answer, index) => {
      if (answer === null) {
        const correctAnswer = questions[index].answer;
        const incorrectChoice = questions[index].choices.find(choice => choice !== correctAnswer);
        return incorrectChoice || questions[index].choices[0];
      }
      return answer;
    });

    setUserAnswers(finalAnswers);
    setShowResults(true);
    setShowConfirmDialog(false);
    onComplete?.();
  };

  // Calculate score
  const calculateScore = () => {
    return userAnswers.reduce((score, answer, i) => {
      return score + (answer === questions[i].answer ? 1 : 0);
    }, 0);
  };

  // Get button style based on answer
  const getButtonStyle = (choice) => {
    if (currentAnswer === null) return {};

    if (choice === currentAnswer && choice === current.answer) {
      return { backgroundColor: '#10b981', color: 'white' };
    }
    if (choice === currentAnswer && choice !== current.answer) {
      return { backgroundColor: '#ef4444', color: 'white' };
    }
    if (choice !== currentAnswer && choice === current.answer) {
      return { backgroundColor: '#10b981', color: 'white' };
    }
    return {};
  };

  // Get feedback message
  const getFeedback = () => {
    if (currentAnswer === null) return null;

    return (
      <div className={`mb-3 font-medium text-center ${
        currentAnswer === current.answer ? 'text-green-600' : 'text-red-600'
      }`}>
        {currentAnswer === current.answer ? 'Correct!' : 'Wrong!'}
      </div>
    );
  };

  // Restart quiz
  const handleRestart = () => {
    setUserAnswers(Array(questions.length).fill(null));
    setCurrentIndex(0);
    setShowResults(false);
  };

  // Results view
  if (showResults) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-center mb-4">Quiz Completed!</h2>
          <p className="text-center text-lg mb-6">
            Your score: <span className="font-bold">{calculateScore()}</span> out of {questions.length}
          </p>
          <Button className="w-full" onClick={handleRestart}>
            Restart Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Quiz view
  return (
    <div className="w-full max-w-md">
      {/* Progress indicator */}
      <div className="mb-2 text-sm text-gray-500 text-center">
        Question {currentIndex + 1} / {questions.length}
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

        <Button
          onClick={handleNext}
          variant="outline"
          size="icon"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Confirmation dialog */}
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
            <AlertDialogAction onClick={submitQuiz}>
              Submit Anyway
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}