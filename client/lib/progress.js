import { ServerUrl } from "./urls";

export const updateResourceProgress = async (resourceId, progressData, currentProgress) => {
  try {
    if (progressData.quizScore <= currentProgress.quizScore) {
      delete progressData.quizScore;
    }
    if (progressData.flashcardScore <= currentProgress.flashcardScore) {
      delete progressData.flashcardScore;
    }
    if (!progressData.quizScore && !progressData.flashcardScore) {
      return;
    }
    const response = await fetch(`${ServerUrl}/progress/${resourceId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(progressData),
    });

    if (!response.ok) {
      throw new Error('Failed to update progress');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating progress:', error);
    return null;
  }
};