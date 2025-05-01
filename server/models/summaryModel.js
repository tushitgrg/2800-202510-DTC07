// import mongoose from 'mongoose';
const mongoose = require("mongoose");

const summarySchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true },
    content: { 
        type: String, 
        required: true },
    tags: [{ type: String }]
}, { _id: true, timestamps: true });

const summaryModel = mongoose.model('summary', summarySchema);
// export default summaryModel
module.exports = summaryModel;