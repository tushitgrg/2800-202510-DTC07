const Progress = require("../models/progressModel");

/**
 * Updates a user's progress for a specific resource.
 * Creates a new progress entry if none exists.
 *
 * @async
 * @function updateProgress
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const updateProgress = async (req, res) => {
  try {
    const userId = req.user._id;
    const resourceId = req.params.resourceId;
    const { quizScore, flashcardScore, summaryCompletion } = req.body;

    // Find existing progress or create a new one
    let progress = await Progress.findOne({ resourceId: resourceId });

    if (!progress) {
      progress = new Progress({
        userId: userId,
        resourceId: resourceId,
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
