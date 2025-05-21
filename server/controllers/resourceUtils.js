const { processFile } = require("../utils/fileHandler");
const { getGeminiOutput } = require("../utils/geminiClient");
const addQuizEntry = require("../utils/addQuizEntry");
const addFlashcardEntry = require("../utils/addFlashcardEntry");
const addSummaryEntry = require("../utils/addSummaryEntry");
const { getTranscriptAsFilePart } = require("../utils/GetYoutubeTranscript");

const Resource = require("../models/resourceModel");

/**
 * Processes uploaded content by checking for either a file
 * upload or a YouTube URL. Returns a processed file-like object.
 *
 * @async
 * @function processUploadedContent
 * @param {Object} req - Express request object
 * @throws Will throw an error if neither file nor YouTube URL is provided
 * @returns {Promise<Object>} Processed file content for AI generation
 */
const processUploadedContent = async (req) => {
  if (!req.file && !req.body.youtubeUrl) {
    throw new Error("No file or YouTube URL uploaded");
  }

  return req.file
    ? processFile(req.file)
    : await getTranscriptAsFilePart(req.body.youtubeUrl);
};

/**
 * Creates a new resource document in the database with basic metadata.
 * This resource will later be populated with AI-generated content.
 *
 * @async
 * @function createResourceShell
 * @param {string} userId - The ID of the user creating the resource
 * @param {string} title - Title of the resource
 * @param {string|null} school - User's school name, if available
 * @returns {Promise<Object>} The newly created resource document
 */
const createResourceShell = async (userId, title, school) => {
  return await Resource.create({
    title: title || "Untitled Resource",
    quizID: null,
    flashcardID: null,
    summaryID: null,
    author: userId,
    school: school || null,
  });
};

/**
 * Handles parallel generation of quiz, flashcard, and summary content
 * using Gemini AI based on the provided prompts and source file.
 *
 * @async
 * @function handleGeminiTasks
 * @param {Object} file - Processed file or transcript used for content generation
 * @param {Object} prompts - Object containing quizPrompt, flashcardPrompt, and summaryPrompt
 * @param {string} resourceId - ID of the resource to update with generated content
 * @returns {Promise<void>}
 */

const handleGeminiTasks = async (file, prompts, resourceId) => {
  const tasks = [];

  if (prompts.quizPrompt) {
    tasks.push(
      (async () => {
        const quiz = await getGeminiOutput(file, prompts.quizPrompt);
        const quizId = await addQuizEntry(quiz);
        await Resource.findByIdAndUpdate(resourceId, { quizID: quizId });
      })()
    );
  }

  if (prompts.flashcardPrompt) {
    tasks.push(
      (async () => {
        const flashcard = await getGeminiOutput(file, prompts.flashcardPrompt);
        const flashcardId = await addFlashcardEntry(flashcard);
        await Resource.findByIdAndUpdate(resourceId, {
          flashcardID: flashcardId,
        });
      })()
    );
  }

  if (prompts.summaryPrompt) {
    tasks.push(
      (async () => {
        const summary = await getGeminiOutput(file, prompts.summaryPrompt);
        const summaryId = await addSummaryEntry(summary);
        await Resource.findByIdAndUpdate(resourceId, {
          summaryID: summaryId,
        });
      })()
    );
  }

  await Promise.all(tasks);
};

module.exports = {
  processUploadedContent,
  createResourceShell,
  handleGeminiTasks,
};
