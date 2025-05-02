const summaryModel = require("../models/summaryModel");

const addSummaryEntry = async (summary) => {
  // Create and save new summary
  const newSummary = await summaryModel.create(summary);

  // Return the id of the summary
  return newSummary._id;
};

module.exports = addSummaryEntry