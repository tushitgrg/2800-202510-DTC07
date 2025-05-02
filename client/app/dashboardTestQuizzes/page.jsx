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
  },
  {
    id: "6",
    question: "Which is the correct CSS syntax?",
    choices: ["body:color=black;", "body {color: black;}", "{body;color:black;}", "body {color: black;}"],
    answer: "body {color: black;}"
  },
  {
    id: "7",
    question: "Which property is used to change the background color?",
    choices: ["bgcolor", "color", "background-color", "background"],
    answer: "background-color"
  },
  {
    id: "8",
    question: "How do you add a comment in CSS?",
    choices: ["// this is a comment", "<!-- this is a comment -->", "/* this is a comment */"],
    answer: "/* this is a comment */"
  },
  {
    id: "9",
    question: "Which HTML element is used to define the title of a document?",
    choices: ["<head>", "<title>", "<meta>", "<h1>", "<h1>", "<h1>", "<h1>", "<h1>", "<h1>", "<h1>", "<h1>", "<h1>", "<h1>", "<h1>", "<h1>", "<h1>", "<h1>", "<h1>"],
    answer: "<title>"
  },
  {
    id: "10",
    question: "Testing super long question Testing super long question Testing super long question Testing super long question Testing super long question Testing super long question Testing super long question Testing super long question Testing super long question Testing super long question Testing super long question Testing super long question Testing super long question Testing super long question Testing super long question Testing super long question Testing super long question Testing super long question Testing super long question Testing super long question Testing super long question Testing super long question Testing super long question Testing super long question Testing super long question Testing super long question Testing super long question ",
    choices: ["Defines an alternative text for the image", "Testing super long answer Testing super long answer Testing super long answer Testing super long answer Testing super long answer Testing super long answer Testing super long answer Testing super long answer Testing super long answer Testing super long answer Testing super long answer Testing super long answer Testing super long answer Testing super long answer Testing super long answer Testing super long answer Testing super long answer Testing super long answer Testing super long answer Testing super long answer Testing super long answer ", "Defines the alignment of the image", "Defines the size of the image"],
    answer: "Defines an alternative text for the image"
  }
];

// Simplified usage
export default function DashboardTestQuizzesPage() {
  return (
    <div className="min-h-screen flex flex-col w-full justify-center items-center p-6">
      <Quiz questions={testQuizzes}/>
    </div>
  );
}