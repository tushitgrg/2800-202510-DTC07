// import mongoose from 'mongoose';
const mongoose = require("mongoose");

const summarySchema = new mongoose.Schema({
    content: { 
        type: String, 
        required: true },
}, { _id: true, timestamps: true });

const summaryModel = mongoose.model('summary', summarySchema);
// export default summaryModel
module.exports = summaryModel;