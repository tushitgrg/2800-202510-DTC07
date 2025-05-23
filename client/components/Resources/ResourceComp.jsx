"use client"; // Designates this as a Client Component for client-side interactivity.

import { useState } from "react"; // React hook for managing component state.
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // UI components for tab navigation.
import { ChevronLeft, Check, Plus } from "lucide-react"; // Icons for UI elements.
import { Button } from "@/components/ui/button"; // UI button component.
import Link from "next/link"; // For client-side navigation (though not directly used in this component's return).
import Quiz from "@/components/quizzes/quiz"; // Quiz display component.
import Flashcards from "@/components/flashcards/flashcard"; // Flashcards display component.
import Summary from "@/components/summaries/summary"; // Summary display component.
import { addToDashboard } from "@/lib/addToDashboard"; // Function to add resource to user's dashboard.
import TogglePublicButton from "@/components/ui/toggle-public"; // Button to toggle resource public/private status.
import LikeButton from "@/components/ui/like"; // Button to like/unlike a resource.
import updateResource from "@/lib/updateResource"; // Function to update resource properties (like, public status).

/**
 * ResourceComp Component
 * Displays a single learning resource with tabs for Quiz, Flashcards, and Summary content.
 * Handles actions like adding to dashboard, liking, and toggling public status for owners.
 *
 * @param {Object} props - Component properties.
 * @param {Object} props.resourceData - Data for the specific learning resource.
 * @param {Object} props.userData - Data for the current user.
 * @param {Function} props.goToDashboard - Callback function to navigate to the dashboard.
 */
const ResourceComp = ({ resourceData, userData, goToDashboard }) => {
  // Determine if specific content types (quiz, flashcards, summary) are available.
  const hasQuiz = !!resourceData.quiz;
  const hasFlashcards = !!resourceData.flashcard;
  const hasSummary = !!resourceData.summary;

  // State for the resource's liked status by the current user.
  const [liked, setLiked] = useState(resourceData.isLiked || false);
  // State for the resource's public/private status.
  const [isPublic, setIsPublic] = useState(resourceData.isPublic || false);

  // Set the default active tab based on available content.
  let defaultTab = "quiz";
  if (!hasQuiz && hasFlashcards) defaultTab = "flashcard";
  else if (!hasQuiz && !hasFlashcards && hasSummary) defaultTab = "summary";
  // State for the currently active tab.
  const [activeTab, setActiveTab] = useState(defaultTab);

  // Format the resource creation date for display.
  const formattedDate = new Date(resourceData.createdAt).toDateString();

  // Check if the user already has this resource in their dashboard or is the owner.
  const hasResource = resourceData.hasResource === true;
  const isOwner = resourceData.isOwner === true;

  /**
   * Handles adding the resource to the user's dashboard.
   * On success, navigates to the dashboard.
   */
  const handleAddToDashboard = async () => {
    try {
      await addToDashboard(resourceData.id);
      goToDashboard();
    } catch (error) {
      console.error("Error adding to dashboard:", error);
    }
  };

  /**
   * Toggles the like status of the resource.
   * Updates UI state immediately, then calls API. Reverts state if API fails.
   * @param {boolean} newLikedState - The new liked status.
   */
  const handleLike = async (newLikedState) => {
    const originalLikedState = liked; // Store original state for potential revert
    setLiked(newLikedState); // Optimistically update UI
    try {
      await updateResource({
        editingId: resourceData.id,
        isLiked: newLikedState,
      });
      console.log(
        `Resource ${resourceData.id} like status updated to ${newLikedState}`,
      );
    } catch (error) {
      setLiked(originalLikedState); // Revert state on API error
      console.error("Error updating like status:", error);
    }
  };

  /**
   * Toggles the public/private status of the resource (only for owners).
   * Updates UI state immediately, then calls API. Reverts state if API fails.
   * @param {boolean} newPublicState - The new public status.
   */
  const handleTogglePublic = async (newPublicState) => {
    const originalPublicState = isPublic; // Store original state for potential revert
    setIsPublic(newPublicState); // Optimistically update UI
    try {
      await updateResource({
        editingId: resourceData.id,
        isPublic: newPublicState,
      });
      console.log(
        `Resource ${resourceData.id} public status updated to ${newPublicState}`,
      );
    } catch (error) {
      setIsPublic(originalPublicState); // Revert state on API error
      console.error("Error updating public status:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl w-screen">
      {/* Back button and Add to Dashboard/Added status */}
      <div className="flex justify-between items-center mb-6">
        <p
          onClick={() => window.history.back()}
          className="flex items-center text-sm text-gray-400 hover:text-white cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back
        </p>

        {/* 'Add to Dashboard' button for non-owners if not already added */}
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

        {/* 'Added to Dashboard' button if already present and not owner */}
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

      {/* Resource Title, Date, Like Button, and Toggle Public Button */}
      <div className="mb-8">
        <div className="header flex justify-between w-full">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            {resourceData.title}
          </h1>
          <div className="buttons flex gap-2">
            <LikeButton liked={liked} onChange={handleLike} />
            {isOwner && ( // Only show toggle public button if the current user is the resource owner.
              <TogglePublicButton
                isPublic={isPublic}
                onClick={handleTogglePublic}
              />
            )}
          </div>
        </div>
        <p className="text-sm text-gray-400">Created on {formattedDate}</p>
      </div>

      {/* Content Tabs (Quiz, Flashcards, Summary) */}
      <Tabs
        defaultValue={defaultTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList
          // Dynamically adjust grid columns based on how many content types are available.
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

        {/* Quiz Content */}
        {hasQuiz && (
          <TabsContent value="quiz" className="py-4 flex justify-center">
            <Quiz questions={resourceData.quiz.questions} />
          </TabsContent>
        )}

        {/* Flashcards Content */}
        {hasFlashcards && (
          <TabsContent value="flashcard" className="py-4 flex justify-center">
            <Flashcards cards={resourceData.flashcard.cards} />
          </TabsContent>
        )}

        {/* Summary Content */}
        {hasSummary && (
          <TabsContent value="summary" className="py-4 flex justify-center">
            <Summary
              content={resourceData.summary.content}
              progress={resourceData.progress.summaryCompletion}
            />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default ResourceComp;
