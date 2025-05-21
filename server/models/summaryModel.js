// import mongoose from 'mongoose';
const mongoose = require("mongoose");

/**
 * Mongoose schema for storing a text-based summary.
 *
 * @typedef {Object} Summary
 * @property {string} content - The summary content
 * @property {Date} createdAt - Timestamp of creation
 * @property {Date} updatedAt - Timestamp of last update
 */
const summarySchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
  },
  { _id: true, timestamps: true },
);


const summaryModel = mongoose.model("summary", summarySchema);
module.exports = summaryModel;
