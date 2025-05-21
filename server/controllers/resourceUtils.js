const { processFile } = require("../utils/fileHandler");
const { getGeminiOutput } = require("../utils/geminiClient");
const addQuizEntry = require("../utils/addQuizEntry");
const addFlashcardEntry = require("../utils/addFlashcardEntry");
const addSummaryEntry = require("../utils/addSummaryEntry");
const { getTranscriptAsFilePart } = require("../utils/GetYoutubeTranscript");

const Resource = require("../models/resourceModel");

const processUploadedContent = async (req) => {
  if (!req.file && !req.body.youtubeUrl) {
    throw new Error("No file or YouTube URL uploaded");
  }

  return req.file
    ? processFile(req.file)
    : await getTranscriptAsFilePart(req.body.youtubeUrl);
};

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
