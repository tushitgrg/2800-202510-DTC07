const { processFile } = require("../utils/fileHandler");
const { getGeminiOutput } = require("../utils/geminiClient");
const addQuizEntry = require("../utils/addQuizEntry");
const addFlashcardEntry = require("../utils/addFlashcardEntry");
const addSummaryEntry = require("../utils/addSummaryEntry");

const User = require("../models/userModel");
const Resource = require("../models/resourceModel");
const Quiz = require("../models/quizModel");
const Flashcard = require("../models/flashcardModel");
const Summary = require("../models/summaryModel");

const getResources = async function (req, res) {
  const userId = req.user._id;
};
const getResourceById = async function (req, res) {
  const resourceId = req.params.id;

  const response = {};
  try {
    const resource = await Resource.findById(resourceId);
    if (!resource) {
      return res.status(404).json({ error: "Resource not found" });
    }
    const { quizID, flashcardID, summaryID } = resource;
    if (quizID) {
      const quiz = await Quiz.findById(quizID);
      response.quiz = quiz;
    }
    if (flashcardID) {
      const flashcard = await Flashcard.findById(flashcardID);
      response.flashcard = flashcard;
    }
    if (summaryID) {
      const summary = await Summary.findById(summaryID);
      response.summary = summary;
    }
    res.status(200).json(response);
  } catch (error) {
    console.error("Internal server error: ", error);
    res.status(500).json({ error: "Failed to retrieve resource" });
  }
};

//POST request handler for creating a resource
const addResource = async function (req, res) {
  const userId = req.user._id;
  const { quizPrompt, flashcardPrompt, summaryPrompt } = req.body;
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const file = await processFile(req.file);

  if (!file) {
    return res.status(500).json({ error: "Failed to process file" });
  }
  const newResource = await Resource.create({
    quizID: null,
    flashcardID: null,
    summaryID: null,
  });

  if (quizPrompt) {
    try {
      const quiz = await getGeminiOutput(file, quizPrompt);
      const quizId = await addQuizEntry(quiz);
      await Resource.findByIdAndUpdate(newResource._id, { quizID: quizId });
    } catch (err) {
      console.error("Failed to create quiz:", err);
      return res.status(500).json({ error: "Failed to create quiz." });
    }
  }

  if (flashcardPrompt) {
    try {
      const flashcard = await getGeminiOutput(file, flashcardPrompt);
      const flashcardId = await addFlashcardEntry(flashcard);
      await Resource.findByIdAndUpdate(newResource._id, {
        flashcardID: flashcardId,
      });
    } catch (err) {
      console.error("Failed to create flashcard:", err);
      return res.status(500).json({ error: "Failed to create flashcard." });
    }
  }

  if (summaryPrompt) {
    try {
      const summary = await getGeminiOutput(file, summaryPrompt);
      const summaryId = await addSummaryEntry(summary);
      await Resource.findByIdAndUpdate(newResource._id, {
        summaryID: summaryId,
      });
    } catch (err) {
      console.error("Failed to create summary:", err);
      return res.status(500).json({ error: "Failed to create summary." });
    }
  }
  const user = await User.findById(userId);
  user.resources.push(newResource._id);
  await user.save();
  res.status(201).json({
    msg: `Succes fully created resource with id:${newResource._id}`,
    resourceID: newResource._id,
  });
};

module.exports = { getResources, getResourceById, addResource };
