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

const fetchResource = async (resourceID) => {
  const resource = await Resource.findById(resourceID);
  if (!resource) return null;

  const { quizID, flashcardID, summaryID, title, createdAt } = resource;

  return {
    _id: resource._id,
    title: title,
    createdAt: createdAt,
    quiz: quizID ? await Quiz.findById(quizID) : null,
    flashcard: flashcardID ? await Flashcard.findById(flashcardID) : null,
    summary: summaryID ? await Summary.findById(summaryID) : null,
  };
};

// GET request handler for all resources under the current user
const getResources = async function (req, res) {
  
  const userId = req.user._id;
  try {
    const user = await User.findById(userId);
    const userResources = user.resources;
    const result = await Promise.all(
      userResources.map((resourceID) => fetchResource(resourceID))
    );
    res.status(200).json(result);
  } catch (err) {
    console.error("Failed to fetch user resources:", err);
    res.status(500).json({ error: "Failed to fetch resources" });
  }
};

//GET request handler by resource ID
const getResourceById = async function (req, res) {
  const resourceId = req.params.id;

  const response = {};
  try {
    const resource = await Resource.findById(resourceId);
    if (!resource) {
      return res.status(404).json({ error: "Resource not found" });
    }
    const { quizID, flashcardID, summaryID, title, createdAt } = resource;
    response.title = title;
    response.createdAt = createdAt;
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
  const { title, quizPrompt, flashcardPrompt, summaryPrompt } = req.body;
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const file = await processFile(req.file);

  if (!file) {
    return res.status(500).json({ error: "Failed to process file" });
  }
  const newResource = await Resource.create({
    title: title,
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
    msg: `Successfully created resource with id:${newResource._id}`,
    resourceID: newResource._id,
  });
};

module.exports = { getResources, getResourceById, addResource };
