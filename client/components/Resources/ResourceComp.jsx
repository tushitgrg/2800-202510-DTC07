"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import Quiz from "@/components/quizzes/quiz";
import Flashcards from "@/components/flashcards/flashcard";
import Summary from "@/components/summaries/summary";

const ResourceComp = ({ resourceData }) => {
  // Check what content types are available
  const hasQuiz = !!resourceData.quiz;
  const hasFlashcards = !!resourceData.flashcard;
  const hasSummary = !!resourceData.summary;

  // Determine default tab based on available content
  let defaultTab = "quiz";
  if (!hasQuiz && hasFlashcards) defaultTab = "flashcard";
  else if (!hasQuiz && !hasFlashcards && hasSummary) defaultTab = "summary";

  const [activeTab, setActiveTab] = useState(defaultTab);

  // Format the creation date
  const formattedDate = new Date(resourceData.createdAt).toDateString();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl w-screen">
      {/* Back button */}
      <Link
        href="/dashboard"
        className="flex items-left text-sm text-gray-400 hover:text-white mb-6 w-fit"
      >
        <ChevronLeft className="w-5 h-5 mr-1" />
        Back to Dashboard
      </Link>

      {/* Resource title and creation date */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          {resourceData.title}
        </h1>
        <p className="text-sm text-gray-400">Created on {formattedDate}</p>
      </div>

      {/* Tabs for different content types */}
      <Tabs
        defaultValue={defaultTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        {/* Dynamic tab list based on available content */}
        <TabsList
          className={`grid w-full mb-6 ${
            [hasQuiz, hasFlashcards, hasSummary].filter(Boolean).length === 1
              ? "grid-cols-1"
              : [hasQuiz, hasFlashcards, hasSummary].filter(Boolean).length ===
                2
              ? "grid-cols-2"
              : "grid-cols-3"
          }`}
        >
          {hasQuiz && <TabsTrigger value="quiz">Quiz</TabsTrigger>}
          {hasFlashcards && (
            <TabsTrigger value="flashcard">Flashcards</TabsTrigger>
          )}
          {hasSummary && <TabsTrigger value="summary">Summary</TabsTrigger>}
        </TabsList>

        {/* Tab content */}
        {hasQuiz && (
          <TabsContent value="quiz" className="py-4 flex justify-center">
            <Quiz
              questions={resourceData.quiz.questions}
              progress={resourceData.progress}
            />
          </TabsContent>
        )}

        {hasFlashcards && (
          <TabsContent value="flashcard" className="py-4 flex justify-center">
            <Flashcards
              cards={resourceData.flashcard.cards}
              progress={resourceData.progress}
            />
          </TabsContent>
        )}

        {hasSummary && (
          <TabsContent value="summary" className="py-4 flex justify-center">
            <Summary
              content={resourceData.summary.content}
              progress={resourceData.progress}
            />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default ResourceComp;
