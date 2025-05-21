const mongoose = require("mongoose");

let isConnected = false;

/**
 * Establishes a singleton connection to the MongoDB database.
 * Prevents redundant reconnections if already connected.
 *
 * @async
 * @function connectToDB
 * @returns {Promise<void>}
 */
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
