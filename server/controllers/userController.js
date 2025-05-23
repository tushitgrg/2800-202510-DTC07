const { connectToDB } = require("../utils/mongodb");
const userModel = require("../models/userModel");

/**
 * Updates user profile information. If user doesn't exist,
 * creates a new record using upsert.
 *
 * @async
 * @function updateUser
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const updateUser = async (req, res) => {
  const { displayName, firstName, lastName, email, school } = req.body;

  try {
    await connectToDB();
    const result = await userModel.updateOne(
      { email },
      {
        $set: {
          name: displayName || "no username",
          firstName,
          lastName,
          school,
        },
      },
      { upsert: true },
    );
    res.status(200).json({ success: true, result });
  } catch (err) {
    res.status(500).json({ success: false, error: "Update failed" });
  }
};

/**
 * Retrieves a user by email.
 *
 * @async
 * @function getUser
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const getUser = async (req, res) => {
  try {
    await connectToDB();
    const user = await userModel.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { updateUser, getUser };
