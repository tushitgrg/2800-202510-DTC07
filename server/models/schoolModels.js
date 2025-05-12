const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
            enum: ["United States", "Canada"],
        },
    },
    { timestamps: true }
);

const schoolModel = mongoose.model("school", schoolSchema);
module.exports = schoolModel;
