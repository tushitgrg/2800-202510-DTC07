const Progress = require("../models/progressModel");

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
  req.user.achievements.streak = getLongestStreak(allProgress.map((prog)=>prog.updatedAt))
  req.user = { ...req.user.toObject(), experience: totalXP };
  return next();
};


function getLongestStreak(dates) {
  let longest = 0;
  let current = 1;

  for (let i = 1; i < dates.length; i++) {
    const prev = new Date(dates[i - 1]);
    const curr = new Date(dates[i]);
    
    const diffInDays = (curr - prev) / (1000 * 60 * 60 * 24);
    
    if (diffInDays === 1) {
      current++;
    } else {
      longest = Math.max(longest, current);
      current = 1;
    }
  }

  return Math.max(longest, current); // Catch last streak
}

module.exports = calculateExperience;
