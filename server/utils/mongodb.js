const mongoose = require("mongoose");

let isConnected = false;

async function connectToDB() {
    if (isConnected) return;

    await mongoose.connect(process.env.MONGO_URI, {
        dbName: "scholiast",
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    isConnected = true;
    console.log("MongoDB connected");
}

module.exports = { connectToDB };
