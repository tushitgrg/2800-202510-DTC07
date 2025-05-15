"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, Check, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Quiz from "@/components/quizzes/quiz";
import Flashcards from "@/components/flashcards/flashcard";
import Markdown from "react-markdown";
import { addToDashboard } from "@/lib/addToDashboard";

const ResourceComp = ({ resourceData, userData, goToDashboard }) => {
  // Check available content
  const hasQuiz = !!resourceData.quiz;
  const hasFlashcards = !!resourceData.flashcard;
  const hasSummary = !!resourceData.summary;

  // Set default tab
  let defaultTab = "quiz";
  if (!hasQuiz && hasFlashcards) defaultTab = "flashcard";
  else if (!hasQuiz && !hasFlashcards && hasSummary) defaultTab = "summary";

  const [activeTab, setActiveTab] = useState(defaultTab);

  // Format date
  const formattedDate = new Date(resourceData.createdAt).toDateString();

  // Check if user already has this resource or is the owner
  const hasResource =
    resourceData.hasResource ||
    (userData.resources || []).includes(resourceData.id);
  const isOwner = resourceData.isOwner === true;

  // Add to dashboard
  const handleAddToDashboard = async () => {
    try {
      await addToDashboard(resourceData.id);
      setTimeout(() => goToDashboard(), 500);
    } catch (error) {
      console.error("Error adding to dashboard:", error);
    }
  };


  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl w-screen">
      {/* Back button and Add to Dashboard */}
      <div className="flex justify-between items-center mb-6">
        <p

          onClick={()=>window.history.back()}
          className="flex items-center text-sm text-gray-400 hover:text-white cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back
        </p>

        {/* Add button if not owner and not already added */}
        {!isOwner && !hasResource && (
          <Button
            variant="outline"
            className="w-fit"
            onClick={handleAddToDashboard}
          >
            <Plus className="mr-1 h-3 w-3" />
            Add to my Dashboard
          </Button>
        )}

        {/* Already added and not owner */}
        {!isOwner && hasResource && (
          <Button
            variant="outline"
            className="w-fit cursor-not-allowed opacity-70 text-xs"
            disabled
          >
            <Check className="mr-1 h-3 w-3" />
            Added to my Dashboard
          </Button>
        )}
      </div>

      {/* Title and date */}
      <div className="mb-8">
      <div>
    <h1 className="text-2xl md:text-3xl font-bold mb-2">
          {resourceData.title}
        </h1>
      </div>
    
        <p className="text-sm text-gray-400">Created on {formattedDate}</p>
      </div>

      {/* Content tabs */}
      <Tabs
        defaultValue={defaultTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
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

        {/* Quiz content */}
        {hasQuiz && (
          <TabsContent value="quiz" className="py-4 flex justify-center">
            <Quiz questions={resourceData.quiz.questions} />
          </TabsContent>
        )}

        {/* Flashcards content */}
        {hasFlashcards && (
          <TabsContent value="flashcard" className="py-4 flex justify-center">
            <Flashcards cards={resourceData.flashcard.cards} />
          </TabsContent>
        )}

        {/* Summary content */}
        {hasSummary && (
          <TabsContent value="summary" className="py-4 flex justify-center">
            <div className="bg-slate-800 rounded-lg p-6 shadow-md w-full max-w-3xl">
              <Markdown>{resourceData.summary.content}</Markdown>
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default ResourceComp;
