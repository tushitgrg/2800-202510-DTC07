import mongoose from "mongoose";

// Flag to track if the database is already connected
let isConnected = false;

/**
 * Establishes a connection to the MongoDB database using Mongoose.
 *
 * This function uses the environment variable `MONGODB_URI` to connect
 * to the "scholiast" database. It avoids redundant connections by checking
 * the `isConnected` flag before initiating a new connection.
 *
 * @async
 * @function connectToDB
 * @returns {Promise<void>} Resolves when the database is successfully connected.
 */
export async function connectToDB() {
  // Avoid reconnecting if already connected
  if (isConnected) return;

  // Connect to MongoDB with options to avoid deprecation warnings
  await mongoose.connect(process.env.MONGODB_URI, {
    dbName: "scholiast",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  isConnected = true;
  console.log("MongoDB connected");
}
