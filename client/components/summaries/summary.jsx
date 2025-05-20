"use client";

import React, { useState, useEffect } from "react";
import Markdown from "react-markdown";
import { Checkbox } from "@/components/ui/checkbox";
import { updateResourceProgress } from "@/lib/progress";
import { useParams } from "next/navigation";

/**
 * Component to display a markdown summary with completion tracking
 * Allows users to mark the summary as read and syncs with backend progress
 *
 * @param {Object} props - Component props
 * @param {string} props.content - Markdown content to display
 * @param {boolean|null} props.progress - Whether the summary was previously marked as read
 * @returns {JSX.Element} The summary UI with markdown rendering and completion checkbox
 */
export default function Summary({ content, progress }) {
  // State to track whether the summary is marked as completed
  const [completed, setCompleted] = useState(false);

  // Get resource ID from URL params for progress tracking
  const params = useParams();
  const resourceId = params.id;

  /**
   * Initialize completion state from existing progress
   */
  useEffect(() => {
    if (progress === true) {
      setCompleted(true);
    }
  }, [progress]);

  /**
   * Handle completion checkbox change and update backend
   * @param {boolean} isChecked - New checkbox state
   */
  const handleCompletionChange = (isChecked) => {
    setCompleted(isChecked);

    // Update progress in backend
    updateResourceProgress(
      resourceId,
      {
        summaryCompletion: isChecked,
      },
      progress
    );
  };

  return (
    <div className="bg-slate-800 rounded-lg p-6 shadow-md w-full">
      {/* Render markdown content */}
      <Markdown>{content}</Markdown>

      {/* Completion checkbox */}
      <div className="flex items-center space-x-2 mt-6 justify-end">
        <Checkbox
          id="summary-complete"
          checked={completed}
          onCheckedChange={handleCompletionChange}
        />
        <label htmlFor="summary-complete" className="text-sm text-gray-300">
          Mark as read
        </label>
      </div>
    </div>
  );
}