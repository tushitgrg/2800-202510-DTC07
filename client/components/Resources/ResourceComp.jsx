"use client"
import React from 'react'
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import Quiz from "@/components/quizzes/quiz";
import Flashcards from "@/components/flashcards/flashcard";
import Markdown from 'react-markdown';

const ResourceComp = ({resourceData}) => {
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
                <Markdown>{resourceData.summary.content}</Markdown>
              {/* <p className="text-white">{JSON.stringify(resourceData.summary.content)}</p> */}
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}

export default ResourceComp