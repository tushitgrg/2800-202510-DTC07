"use client";

import React, { useState, useEffect } from "react";
import Markdown from "react-markdown";
import { Checkbox } from "@/components/ui/checkbox";
import { updateResourceProgress } from "@/lib/progress";
import { useParams } from "next/navigation";

export default function Summary({ content, progress }) {
  const [completed, setCompleted] = useState(false);
  const params = useParams();
  const resourceId = params.id;

  // Initialize completion state from existing progress
  useEffect(() => {
    if (progress === true) {
      setCompleted(true);
    }
  }, [progress]);

  // Handle completion checkbox change
  const handleCompletionChange = (isChecked) => {
    setCompleted(isChecked);
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
      <Markdown>{content}</Markdown>

      {/* Add completion checkbox */}
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
