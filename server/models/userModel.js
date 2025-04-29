// import mongoose from 'mongoose';
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        type: String,
        required: true
    }
})

const userModel =  mongoose.model('user', userSchema);
// export default userModel
module.exports = userModel;
