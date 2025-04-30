// import mongoose from 'mongoose';
const mongoose = require("mongoose");

const quizCollectionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    quizzes: [{  // renamed 'questions' → 'quizzes' to reflect it's a set
        question: {
            type: String,
            required: true
        },
        options: [{
            type: String,
            required: true
        }],
        correctAnswer: {
            type: String,
            required: true
        }
    }],
    tags: [{
        type: String
    }]  // added tags
}, { _id: true, timestamps: true });

const quizCollectionModel = mongoose.model('quizCollection', quizCollectionSchema);
// export default userModel
module.exports = quizCollectionModel;