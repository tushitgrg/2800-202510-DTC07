import React from "react";
import { Trophy } from "lucide-react";

export default function ProgressMedal({ type, score }) {
  // No medal if no score
  if (score === null || score === undefined || score === false) {
    return null;
  }

  let color;
  if (type === "summary") {
    // Summary is either completed (gold) or not
    color = score ? "text-yellow-500" : null;
  } else {
    // For quiz and flashcards, determine medal based on score percentage
    if (score >= 100) {
      color = "text-yellow-500"; // Gold
    } else if (score >= 80) {
      color = "text-gray-400"; // Silver
    } else if (score >= 60) {
      color = "text-amber-600"; // Bronze
    } else {
      return null; // No medal for scores below 60%
    }
  }

  if (!color) return null;

  return <Trophy className={`h-5 w-5 ${color}`} />;
}
