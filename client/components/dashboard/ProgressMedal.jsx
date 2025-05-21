import React from "react";
import { Trophy } from "lucide-react";

/**
 * Component that displays a trophy icon representing progress of a resource
 * The trophy color indicates the level of achievement (gold, silver, bronze, or gray for none)
 *
 * @param {Object} props - Component props
 * @param {string} props.type - Type of resource ("quiz", "flashcard", or "summary")
 * @param {number|boolean|null} props.score - Progress score or completion status
 *   - For quizzes and flashcards: A number representing percentage (0-100)
 *   - For summaries: A boolean indicating completion
 *   - null or undefined if never attempted
 * @returns {JSX.Element} Trophy icon with appropriate color and tooltip
 */
export default function ProgressMedal({ type, score }) {
  // Determine if trophy is earned based on resource type and score
  let earned = false;
  let color = "text-gray-600/30"; // Default placeholder color (dim gray)

  // Apply different scoring logic based on resource type
  if (score !== null && score !== undefined && score !== false) {
    earned = true;

    if (type === "summary") {
      // Summary is either completed (gold) or not
      color = score ? "text-yellow-500" : color;
    } else {
      // For quiz and flashcards, determine medal based on score percentage
      if (score >= 100) {
        color = "text-yellow-500"; // Gold trophy (perfect score)
      } else if (score >= 80) {
        color = "text-gray-400"; // Silver trophy (good score)
      } else if (score >= 60) {
        color = "text-amber-600"; // Bronze trophy (passing score)
      } else {
        color = "text-gray-600/30"; // No trophy (low score)
      }
    }
  }

  // Create appropriate tooltip text based on resource type and completion status
  let tooltipText = "";
  if (earned) {
    // Tooltip for completed resources
    if (type === "summary") {
      tooltipText = "Summary completed";
    } else if (type === "quiz") {
      tooltipText = `Quiz score: ${score}%`;
    } else if (type === "flashcard") {
      tooltipText = `Flashcard score: ${score}%`;
    }
  } else {
    // Tooltip for incomplete resources
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
      {/* Trophy icon with appropriate color based on achievement level */}
      <Trophy className={`h-5 w-5 ${color} transition-colors duration-300`} />

      {/* Tooltip that appears on hover */}
      <div className="absolute bottom-full left-0 mb-2 px-2 py-1 bg-gray-800 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
        {tooltipText}
      </div>
    </div>
  );
}
