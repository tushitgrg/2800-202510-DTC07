import { ServerUrl } from "./urls";
export function getLevelInfo(xp) {
  const levels = [
    { xp: 0, name: "Newbie" },
    { xp: 100, name: "Learner" },
    { xp: 250, name: "Note Taker" },
    { xp: 500, name: "Quiz Master" },
    { xp: 800, name: "Flashcard Pro" },
    { xp: 1200, name: "Resource Architect" },
    { xp: 1700, name: "Knowledge Seeker" },
    { xp: 2300, name: "Study Strategist" },
    { xp: 3000, name: "Mentor in Making" },
    { xp: 3800, name: "Scholar" },
    { xp: 4700, name: "Study Sage" },
    { xp: 5700, name: "Mastermind" },
    { xp: 6800, name: "Study Legend" },
    { xp: 8000, name: "Knowledge Guardian" },
    { xp: 10000, name: "The Enlightened" },
  ];
  let levelNumber = 1;
  let levelName = levels[0].name;
  let nextLevelXp = levels[1].xp;

  for (let i = 0; i < levels.length; i++) {
    if (xp >= levels[i].xp) {
      levelNumber = i + 1;
      levelName = levels[i].name;
      nextLevelXp = levels[levelNumber].xp;
    } else {
      break;
    }
  }

  return { level: levelNumber, name: levelName, nextLevelXp };
}
export const updateResourceProgress = async (
  resourceId,
  progressData,
  currentProgress,
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
