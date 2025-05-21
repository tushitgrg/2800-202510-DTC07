// import mongoose from 'mongoose';
const mongoose = require("mongoose");

/**
 * Mongoose schema for a flashcard set.
 * Each set contains an array of cards with front and back content.
 *
 * @typedef {Object} FlashcardSet
 * @property {Array<{ front: string, back: string }>} cards - The flashcards
 * @property {Date} createdAt - Timestamp of creation
 * @property {Date} updatedAt - Timestamp of last update
 */
const flashcardSetSchema = new mongoose.Schema(
  {
    cards: [
      {
        front: { type: String, required: true },
        back: { type: String, required: true },
      },
    ],
  },
  { _id: true, timestamps: true },
);

const flashcardSetModel = mongoose.model("flashcardSet", flashcardSetSchema);
module.exports = flashcardSetModel;
