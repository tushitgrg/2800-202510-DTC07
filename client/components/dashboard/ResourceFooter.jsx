"use client";

import React from 'react';
import ProgressMedal from './ProgressMedal';

export default function ResourceFooter({ resource, formatDate, progress }) {
  return (
    <div>
      <div className="mt-4 w-full mb-2">
        <div className="flex justify-end gap-2">
          {/* Show medals based on progress */}
          <div className="flex space-x-1">
            <ProgressMedal type="quiz" score={progress?.quizScore} />
            <ProgressMedal type="flashcard" score={progress?.flashcardScore} />
            <ProgressMedal type="summary" score={progress?.summaryCompletion} />
          </div>
        </div>
      </div>
      <div className="flex w-full pt-2">
        <span className="text-sm w-full text-right text-gray-500">
          {formatDate(resource.createdAt || resource.date)}
        </span>
      </div>
    </div>
  );
}