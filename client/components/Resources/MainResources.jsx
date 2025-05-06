"use client";

import { use } from "react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import Quiz from "@/components/quizzes/quiz";
import Flashcards from "@/components/flashcards/flashcard";

export default function MainResources({ resourceData }) {

//   const unwrappedParams = use(params);
//   // Mock data
//   const resourceData = {
//     id: unwrappedParams.id || "1",
//     title: "Biology 101 - Cell Structure",
//     createdAt: "May 4, 2025",
//     quiz: {
//       questions: [
//         {
//           question: "What is the powerhouse of the cell?",
//           choices: ["Nucleus", "Mitochondria", "Ribosome", "Golgi apparatus"],
//           answer: "Mitochondria"
//         },
//         {
//           question: "Which of the following is NOT a type of RNA?",
//           choices: ["mRNA", "tRNA", "rRNA", "dRNA"],
//           answer: "dRNA"
//         },
//         {
//           question: "What is the function of ribosomes?",
//           choices: ["Protein synthesis", "Energy production", "DNA replication", "Cell division"],
//           answer: "Protein synthesis"
//         },
//         {
//             question: "What is the function of the Golgi apparatus?",
//             choices: ["Energy production", "Protein modification and sorting", "DNA replication", "Cell division"],
//             answer: "Protein modification and sorting"
//         }
//       ]
//     },
//     flashcard: {
//       cards: [
//         { front: "Mitochondria", back: "The powerhouse of the cell" },
//         { front: "DNA", back: "Deoxyribonucleic acid, the genetic material of organisms" }
//       ]
//     },
//     summary: {
//       content: "This chapter covers the fundamental structures of eukaryotic cells. The cell is the basic unit of life, with the cell membrane serving as a protective barrier that regulates the movement of materials."
//     }
//   };

  // Check available content
  const hasQuiz = !!resourceData.quiz;
  const hasFlashcards = !!resourceData.flashcard;
  const hasSummary = !!resourceData.summary;

  // Make tab on what's available
  let defaultTab = 'quiz';
  if (!hasQuiz && hasFlashcards) defaultTab = 'flashcard';
  else if (!hasQuiz && !hasFlashcards && hasSummary) defaultTab = 'summary';

  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Back button */}
      <Link href="/dashboard" className="flex items-center text-sm text-gray-400 hover:text-white mb-6">
        <ChevronLeft className="w-4 h-4 mr-1" />
        Back to Dashboard
      </Link>

      {/* Resource title and creation date */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">{resourceData.title}</h1>
        <p className="text-sm text-gray-400">Created on {new Date(resourceData.createdAt).toDateString()}</p>
      </div>

      {/* Tabs for different content types */}
      <Tabs defaultValue={defaultTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="quiz" disabled={!hasQuiz}>Quiz</TabsTrigger>
          <TabsTrigger value="flashcard" disabled={!hasFlashcards}>Flashcards</TabsTrigger>
          <TabsTrigger value="summary" disabled={!hasSummary}>Summary</TabsTrigger>
        </TabsList>

        {hasQuiz && (
          <TabsContent value="quiz" className="py-4">
            <Quiz questions={resourceData.quiz.questions} />
          </TabsContent>
        )}

        {hasFlashcards && (
          <TabsContent value="flashcard" className="py-4">
            <Flashcards cards={resourceData.flashcard.cards} />
          </TabsContent>
        )}

        {hasSummary && (
          <TabsContent value="summary" className="py-4">
            <div className="bg-slate-800 rounded-lg p-6 shadow-md">
              <p className="text-white">{resourceData.summary.content}</p>
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}