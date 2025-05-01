"use client";

import Quiz from "@/components/quizzes/Quiz";

// Sample quiz data
const testQuizzes = [
  {
    id: "1",
    question: "What does HTML stand for?",
    choices: ["HyperText Markup Language", "HighText Machine Language", "Home Tool Markup Language"],
    answer: "HyperText Markup Language"
  },
  {
    id: "2",
    question: "Which language is used for styling web pages?",
    choices: ["HTML", "JQuery", "CSS", "XML"],
    answer: "CSS"
  },
  {
    id: "3",
    question: "Which is not a JavaScript framework?",
    choices: ["React", "Angular", "Vue", "Django"],
    answer: "Django"
  },
  {
    id: "4",
    question: "What does CSS stand for?",
    choices: ["Cascading Style Sheets", "Colorful Style Sheets", "Computer Style Sheets"],
    answer: "Cascading Style Sheets"
  },
  {
    id: "5",
    question: "Which HTML attribute is used to define inline styles?",
    choices: ["class", "style", "font", "styles"],
    answer: "style"
  }
];

// Simplified usage
export default function DashboardTestQuizzesPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6">
      <Quiz questions={testQuizzes}/>
    </div>
  );
}