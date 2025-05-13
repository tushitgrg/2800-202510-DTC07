const Progress = require("../models/progressModel");

// Update progress for a specific resource
const updateProgress = async (req, res) => {
  try {
    const userId = req.user._id;
    const resourceId = req.params.resourceId;
    const { quizScore, flashcardScore, summaryCompletion } = req.body;

    // Find existing progress or create a new one
    let progress = await Progress.findOne({ userId, resourceId });

    if (!progress) {
      progress = new Progress({
        userId,
        resourceId,
        quizScore: null,
        flashcardScore: null,
        summaryCompletion: false,
      });
    }

    // Update only the fields that were provided
    if (quizScore !== undefined) {
      progress.quizScore = quizScore;
    }
    if (flashcardScore !== undefined) {
      progress.flashcardScore = flashcardScore;
    }
    if (summaryCompletion !== undefined) {
      progress.summaryCompletion = summaryCompletion;
    }

    await progress.save();

    res.status(200).json({
      quizScore: progress.quizScore,
      flashcardScore: progress.flashcardScore,
      summaryCompletion: progress.summaryCompletion,
    });
  } catch (error) {
    console.error("Error updating progress:", error);
    res.status(500).json({ error: "Failed to update progress" });
  }
};

module.exports = {
  updateProgress,
};
