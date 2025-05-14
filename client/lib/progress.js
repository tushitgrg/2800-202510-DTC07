import { ServerUrl } from "./urls";

export const updateResourceProgress = async (
  resourceId,
  progressData,
  currentProgress
) => {
  try {
    console.log("Progress data before processing:", progressData);
    console.log("Current progress:", currentProgress);

    if (currentProgress) {
      if (
        progressData.quizScore !== undefined &&
        progressData.quizScore <= currentProgress.quizScore
      ) {
        delete progressData.quizScore;
      }
      if (
        progressData.flashcardScore !== undefined &&
        progressData.flashcardScore <= currentProgress.flashcardScore
      ) {
        delete progressData.flashcardScore;
      }
    }

    console.log("Progress data after processing:", progressData);

    if (Object.keys(progressData).length === 0) {
      console.log("No progress data to update"); // Add logging
      return;
    }

    const response = await fetch(`${ServerUrl}/progress/${resourceId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(progressData),
    });

    if (!response.ok) {
      throw new Error("Failed to update progress");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating progress:", error);
    return null;
  }
};
