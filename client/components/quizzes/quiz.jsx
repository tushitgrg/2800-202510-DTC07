"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  const current = questions[currentIndex];
  const currentAnswer = userAnswers[currentIndex];

  const handleSelect = (choice) => {
    if (currentAnswer !== null) return;
    onAnswerSelect(currentIndex, choice);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      onIndexChange(currentIndex + 1);
    } else if (allQuestionsAnswered()) {
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      onIndexChange(currentIndex - 1);
    }
  };

  const allQuestionsAnswered = () => {
    return userAnswers.every(answer => answer !== null);
  };

  const calculateScore = () => {
    return userAnswers.reduce((score, answer, i) => {
      return score + (answer === questions[i].answer ? 1 : 0);
    }, 0);
  };

  const getButtonStyle = (choice) => {
    if (currentAnswer === null) return {};

    if (choice === currentAnswer && choice === current.answer) {
      // Correct answer selected
      return { backgroundColor: '#10b981', borderColor: '#10b981', color: 'white' };
    }

    if (choice === currentAnswer && choice !== current.answer) {
      // Wrong answer selected
      return { backgroundColor: '#ef4444', borderColor: '#ef4444', color: 'white' };
    }

    if (choice !== currentAnswer && choice === current.answer) {
      // Show correct answer
      return { backgroundColor: '#10b981', borderColor: '#10b981', color: 'white' };
    }

    return {};
  };

  // Determine feedback message
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

  // Show results screen if completed
  if (showResults) {
    return (
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Quiz Completed!</h2>
        <p className="text-center text-lg mb-6">
          Your score: <span className="font-bold">{calculateScore()}</span> out of {questions.length}
        </p>
        <Button 
          className="w-full" 
          onClick={onRestart}
        >
          Restart Quiz
        </Button>
      </div>
    );
  }

  const showNextButton = currentIndex < questions.length - 1 || (currentIndex === questions.length - 1 && currentAnswer !== null);

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
      
      {/* Feedback message */}
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
          disabled={!showNextButton}
          variant="outline"
          size="icon"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}