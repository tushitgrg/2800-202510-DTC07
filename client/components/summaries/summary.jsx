"use client";

import React, { useState, useEffect } from "react";
import Markdown from "react-markdown";
import { Checkbox } from "@/components/ui/checkbox";
import { updateResourceProgress } from "@/lib/progress";
import { useParams } from "next/navigation";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

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
    const processedContent = content
    // Replace escaped newlines with actual newlines
    .replace(/\\n/g, "\n")
    // Fix any heading issues (ensure space after #)
    .replace(/^(#{1,6})([^#\s])/gm, "$1 $2")
    // Ensure bullet points have proper spacing
    .replace(/^(\s*)-(\S)/gm, "$1- $2");

  return (
    <div className="bg-slate-800 rounded-lg p-6 shadow-md w-full">
      {/* Render markdown content */}
             <Markdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            // Properly style unordered lists and list items
            ul: ({ node, ...props }) => (
              <ul className="list-disc pl-6 space-y-1 my-3" {...props} />
            ),
            li: ({ node, children, ...props }) => (
              <li className="my-1" {...props}>
                {children}
              </li>
            ),
            // Custom component for headings
            h1: ({ node, ...props }) => (
              <h1 className="text-2xl font-bold mb-4 mt-6" {...props} />
            ),
            h2: ({ node, ...props }) => (
              <h2 className="text-xl font-bold mb-3 mt-5" {...props} />
            ),
            p: ({ node, ...props }) => (
              <p className="my-2" {...props} />
            ),
          }}
        >
          {processedContent}
        </Markdown>

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