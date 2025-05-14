import React from "react";
import { Trophy } from "lucide-react";

export default function ProgressMedal({ type, score }) {
  // Determine if trophy is earned
  let earned = false;
  let color = "text-gray-600/30"; // Default placeholder color (dim gray)

  if (score !== null && score !== undefined && score !== false) {
    earned = true;

    if (type === "summary") {
      // Summary is either completed (gold) or not
      color = score ? "text-yellow-500" : color;
    } else {
      // For quiz and flashcards, determine medal based on score percentage
      if (score >= 100) {
        color = "text-yellow-500"; // Gold
      } else if (score >= 80) {
        color = "text-gray-400"; // Silver
      } else if (score >= 60) {
        color = "text-amber-600"; // Bronze
      } else {
        color = "text-gray-600/30"; // Not earned yet
      }
    }
  }

  // Add tooltip
  let tooltipText = "";
  if (earned) {
    if (type === "summary") {
      tooltipText = "Summary completed";
    } else if (type === "quiz") {
      tooltipText = `Quiz score: ${score}%`;
    } else if (type === "flashcard") {
      tooltipText = `Flashcard score: ${score}%`;
    }
  } else {
    if (type === "summary") {
      tooltipText = "Complete the summary to earn this trophy";
    } else if (type === "quiz") {
      tooltipText = "Score at least 60% in quiz to earn a trophy";
    } else if (type === "flashcard") {
      tooltipText = "Score at least 60% in flashcards to earn a trophy";
    }
  }

  return (
    <div className="relative group">
      <Trophy className={`h-5 w-5 ${color} transition-colors duration-300`} />

      {/* Tooltip that appears on hover */}
      <div className="absolute bottom-full left-0 mb-2 px-2 py-1 bg-gray-800 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
        {tooltipText}
      </div>
    </div>
  );
}
