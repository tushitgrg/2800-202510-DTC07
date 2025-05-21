const Progress = require("../models/progressModel");

/**
 * Middleware to calculate total experience (XP) for a user
 * based on resources, shares, streaks, and progress.
 * Attaches XP to req.user and req.experience.
 *
 * @async
 * @function calculateExperience
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware
 * @returns {Promise<void>}
 */
const calculateExperience = async (req, res, next) => {
  let resourceXP = 20;
  let shareXP = 10;
  let streakXP = 5;
  const user = req.user;
  const allProgress = await Progress.find({ userId: req.user._id });
  let progressXP = 0;
  for (progress of allProgress) {
    if (progress.quizScore) {
      progressXP += (progress.quizScore / 100) * 15;
    }
    if (progress.flashcardScore) {
      progressXP += (progress.flashcardScore / 100) * 15;
    }
    if (progress.summaryCompletion) {
      progressXP += 15;
    }
  }
  let totalXP =
    resourceXP * user.resources.length +
    shareXP * user.achievements.totalSharesReceived +
    streakXP * user.achievements.streak +
    progressXP;
  req.experience = totalXP;
  req.user = { ...req.user.toObject(), experience: totalXP };
  return next();
};

module.exports = calculateExperience;
