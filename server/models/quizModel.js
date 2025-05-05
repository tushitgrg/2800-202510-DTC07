// import mongoose from 'mongoose';
const mongoose = require("mongoose");

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
        correctAnswer: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { _id: true, timestamps: true }
);

const quizCollectionModel = mongoose.model(
  "quizCollection",
  quizCollectionSchema
);
// export default userModel
module.exports = quizCollectionModel;
