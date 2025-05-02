// import mongoose from 'mongoose';
const mongoose = require("mongoose");

const flashcardSetSchema = new mongoose.Schema({
    cards: [
        {
            front: { type: String, required: true },
            back: { type: String, required: true }
        }
    ]}, { _id: true, timestamps: true }
);

const flashcardSetModel = mongoose.model('flashcardSet', flashcardSetSchema);
module.exports = flashcardSetModel;
