// const FlashcardSet = require("../models/FlashcardSet");
const { processFile } = require("../utils/fileHandler");
const { getGeminiOutput } = require("../utils/geminiClient");

const createFlashcardSet = async (req, res) => {
  const { title, topic, difficulty } = req.body;
  const resourceType = "flashcard";

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const file = await processFile(req.file);
  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const promptMessage = `
  I am uploading a study material document (PDF). Based on the content, generate a set of flashcards in JSON format. Each flashcard should have:
  IMPORTANT: Your response MUST be ONLY the JSON object with no additional text, explanations, or commentary before or after. Return ONLY valid JSON.
  DONOT ADD anything extra, return the JSON as PLAIN TEXT NO FORMATING NO NEWLINE CHARACTERS ETC

  A "front" string containing the question or concept
  A "back" string containing the answer or explanation

  Please generate 10 flashcards only.
  `;

  try {
    const flashcardsData = await getGeminiOutput(file, promptMessage);
    res.json(flashcardsData);
    // const savedFlashcardSet = await FlashcardSet.create({
    //   cards: flashcardsData.cards,
    //   title,
    //   topic,
    //   difficulty,
    //   userId: req.user.id
    // });
    //
    // // Update user model to include this flashcard set
    // // await User.findByIdAndUpdate(
    // //   req.user.id,
    // //   { $push: { flashcardSets: savedFlashcardSet._id } }
    // // );
    //
    // res.status(201).json(savedFlashcardSet);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to process flashcards!" });
  }
};

const getFlashcardSetById = async (req, res) => {
  try {
    // const flashcardSet = await FlashcardSet.findById(req.params.id);
    //
    // // Check if flashcard set exists and belongs to the user
    // if (!flashcardSet) {
    //   return res.status(404).json({ error: "Flashcard set not found" });
    // }
    //
    // if (flashcardSet.userId.toString() !== req.user.id) {
    //   return res.status(403).json({ error: "Not authorized to access this flashcard set" });
    // }
    //
    // res.json(flashcardSet);
    res.send("get flashcard set by id");
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to retrieve flashcard set" });
  }
};

const getUserFlashcardSets = async (req, res) => {
  try {
    // const flashcardSets = await FlashcardSet.find({ userId: req.user.id })
    //   .select('title topic difficulty createdAt');
    // res.json(flashcardSets);
    res.send("get all user's flashcard sets");
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to retrieve flashcard sets" });
  }
};

const deleteFlashcardSet = async (req, res) => {
  try {
    // const result = await FlashcardSet.findOneAndDelete({
    //   _id: req.params.id,
    //   userId: req.user.id
    // });
    //
    // if (!result) {
    //   return res.status(404).json({ error: "Flashcard set not found or not authorized" });
    // }
    //
    // // Remove reference from user model
    // // await User.findByIdAndUpdate(
    // //   req.user.id,
    // //   { $pull: { flashcardSets: req.params.id } }
    // // );
    //
    // res.json({ message: "Flashcard set deleted successfully" });
    res.send("delete flashcard set");
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to delete flashcard set" });
  }
};

module.exports = {
  createFlashcardSet,
  getFlashcardSetById,
  getUserFlashcardSets,
  deleteFlashcardSet,
};
