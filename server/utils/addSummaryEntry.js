const summaryModel = require("../models/summaryModel");

/**
 * Adds a new summary entry to the database.
 *
 * @async
 * @function addSummaryEntry
 * @param {Object} summary - Summary data object
 * @returns {Promise<string>} Promise resolving to the new summary's document ID
 */
const addSummaryEntry = async (summary) => {
  // Create and save new summary
  const newSummary = await summaryModel.create(summary);

  // Return the id of the summary
  return newSummary._id;
};

module.exports = addSummaryEntry;
