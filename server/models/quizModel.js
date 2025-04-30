// import mongoose from 'mongoose';
const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    questions: [{
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

const quizModel = mongoose.model('quiz', quizSchema);
// export default userModel
module.exports = quizModel;