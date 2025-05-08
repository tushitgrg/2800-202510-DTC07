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

const getResourceInfo = async function (req, res) {
  const userId = req.user._id;
  try {
    const user = await User.findById(userId);
    const userResources = user.resources;
    const result = await Promise.all(
      userResources.map(async (resourceID) => {
        const resource = await Resource.findById(resourceID);
        if (!resource) return null;
        const info = {};
        info.id = resourceID;
        info.title = resource.title;
        info.createdAt = resource.createdAt;
        info.tags = resource.tags || [];
        return info;
      })
    );
    res.status(200).json({ resources: result });
  } catch (err) {
    console.error("Failed to fetch user resources:", err);
    res.status(500).json({ error: "Failed to fetch resources" });
  }
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

  const response = { hasResource: req.hasResource };
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
    title: title || "Untitled Resource",
    quizID: null,
    flashcardID: null,
    summaryID: null,
  });

  try {
    const tasks = [];

    if (quizPrompt) {
      const quizTask = (async () => {
        const quiz = await getGeminiOutput(file, quizPrompt);
        const quizId = await addQuizEntry(quiz);
        await Resource.findByIdAndUpdate(newResource._id, { quizID: quizId });
      })();
      tasks.push(quizTask);
    }

    if (flashcardPrompt) {
      const flashcardTask = (async () => {
        const flashcard = await getGeminiOutput(file, flashcardPrompt);
        const flashcardId = await addFlashcardEntry(flashcard);
        await Resource.findByIdAndUpdate(newResource._id, {
          flashcardID: flashcardId,
        });
      })();
      tasks.push(flashcardTask);
    }

    if (summaryPrompt) {
      const summaryTask = (async () => {
        const summary = await getGeminiOutput(file, summaryPrompt);
        const summaryId = await addSummaryEntry(summary);
        await Resource.findByIdAndUpdate(newResource._id, {
          summaryID: summaryId,
        });
      })();
      tasks.push(summaryTask);
    }

    await Promise.all(tasks);
  } catch (err) {
    console.error("Failed to create resource data:", err);
    res
      .status(500)
      .json({ error: "Failed to create one or more parts of the resource." });
  }

  const user = await User.findById(userId);
  user.resources.push(newResource._id);
  await user.save();
  res.status(201).json({
    msg: `Successfully created resource with id:${newResource._id}`,
    resourceID: newResource._id,
  });
};

const deleteResource = async function (req, res) {
  const resourceId = req.params.id;
  if (!resourceId) {
    res.status(400).json({ error: "Resource ID is required" });
  }
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404).json({ error: "User not found" });
  }
  try {
    await Resource.findByIdAndDelete(resourceId);
    await user.updateOne({ $pull: { resources: resourceId } });
    res
      .status(200)
      .json({ msg: `Successfully deleted resource with ID: ${resourceId}` });
  } catch (err) {
    res
      .status(500)
      .json({ error: err, msg: "Unable to delete the provided resource" });
  }
};

const updateResourceInfo = async function (req, res) {
  const resourceId = req.params.id;
  const { newTitle, newTags } = req.body;

  if (!resourceId) {
    res.status(400).json({ error: "Resource ID is required" });
  }
  try {
    const updatedResource = await Resource.findByIdAndUpdate(
      resourceId,
      {
        title: newTitle,
        tags: newTags,
      },
      { new: true }
    );
    if (!updatedResource) {
      return res.status(404).json({ error: "Resource not found" });
    }
    return res.status(200).json(updatedResource);
  } catch (err) {}
};

module.exports = {
  getResources,
  getResourceInfo,
  getResourceById,
  addResource,
  deleteResource,
  updateResourceInfo,
};
