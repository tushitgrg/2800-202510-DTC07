"use client";

import React from "react";
import ProgressMedal from "./ProgressMedal";

/**
 * Component that displays the footer section of a resource card
 * Shows progress medals and creation date
 *
 * @param {Object} props - Component props
 * @param {Object} props.resource - The resource data
 * @param {Function} props.formatDate - Function to format date strings
 * @param {Object} props.progress - Progress data for the resource
 * @param {number|null} props.progress.quizScore - Quiz completion score (0-100)
 * @param {number|null} props.progress.flashcardScore - Flashcard completion score (0-100)
 * @param {boolean|null} props.progress.summaryCompletion - Whether summary is completed
 * @returns {JSX.Element} Footer section with progress indicators and date
 */
export default function ResourceFooter({ resource, formatDate, progress }) {
  return (
    <div>
      {/* Progress medals section */}
      <div className="mt-4 w-full mb-2">
        <div className="flex gap-2">
          {/* Display medals for each content type */}
          <div className="flex space-x-1">
            {/* Quiz progress medal */}
            <ProgressMedal type="quiz" score={progress?.quizScore} />

            {/* Flashcard progress medal */}
            <ProgressMedal type="flashcard" score={progress?.flashcardScore} />

            {/* Summary progress medal */}
            <ProgressMedal type="summary" score={progress?.summaryCompletion} />
          </div>
        </div>
      </div>

      {/* Creation date */}
      <div className="flex w-full pt-2">
        <span className="text-sm w-full text-right text-gray-500">
          {formatDate(resource.createdAt || resource.date)}
        </span>
      </div>
    </div>
  );
}
