// import mongoose from 'mongoose';
const mongoose = require("mongoose");

/**
 * Mongoose schema for a quiz collection.
 * Each quiz contains a list of multiple-choice questions.
 *
 * @typedef {Object} QuizCollection
 * @property {Array<{
 *   question: string,
 *   options: string[],
 *   answer: string
 * }>} questions - List of quiz questions
 * @property {Date} createdAt - Timestamp of creation
 * @property {Date} updatedAt - Timestamp of last update
 */
const quizCollectionSchema = new mongoose.Schema(
  {
    questions: [
      {
        question: {
          type: String,
          required: true,
        },
        options: [
          {
            type: String,
            required: true,
          },
        ],
        answer: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { _id: true, timestamps: true },
);

const quizCollectionModel = mongoose.model(
  "quizCollection",
  quizCollectionSchema,
);


module.exports = quizCollectionModel;
