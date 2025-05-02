"use client";

import Flashcards from "@/components/flashcards/Flashcard";

// Sample flashcard data
const testFlashcards = [
  { id: "1", front: "What is HTML?", back: "HyperText Markup Language" },
  { id: "2", front: "What is CSS?", back: "Cascading Style Sheets" },
  { id: "3", front: "What is JS?", back: "JavaScript" },
  { id: "4", front: "What is React?", back: "A JavaScript library for building user interfaces" },
  { id: "5", front: "What is Node.js?", back: "JavaScript runtime built on Chrome's V8 engine" },
  { id: "6", front: "What is Express?", back: "Web framework for Node.js" },
  { id: "7", front: "What is MongoDB?", back: "NoSQL database" },
  { id: "8", front: "What is SQL?", back: "Structured Query Language" },
  { id: "9", front: "What is Git?", back: "Version control system" },
  { id: "10", front: "What is GitHub?What is GitHub?What is GitHub?What is GitHub?What is GitHub?What is GitHub?What is GitHub?What is GitHub?What is GitHub?What is GitHub?What is GitHub?What is GitHub?What is GitHub?What is GitHub?What is GitHub?What is GitHub?What is GitHub?What is GitHub?What is GitHub?What is GitHub?What is GitHub?What is GitHub?What is GitHub?What is GitHub?What is GitHub?What is GitHub?What is GitHub?What is GitHub?What is GitHub?What is GitHub?What is GitHub?What is GitHub?What is GitHub?What is GitHub?What is GitHub?What is GitHub?What is GitHub?", back: "Platform for version control and collaborationPlatform for version control and collaborationPlatform for version control and collaborationPlatform for version control and collaborationPlatform for version control and collaborationPlatform for version control and collaborationPlatform for version control and collaborationPlatform for version control and collaborationPlatform for version control and collaborationPlatform for version control and collaborationPlatform for version control and collaborationPlatform for version control and collaborationPlatform for version control and collaborationPlatform for version control and collaborationPlatform for version control and collaborationPlatform for version control and collaborationPlatform for version control and collaboration" },
];

export default function DashboardTestPage() {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center p-6">
      <Flashcards cards={testFlashcards} />
    </div>
  );
}