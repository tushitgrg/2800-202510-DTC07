const User = require("../models/userModel");

const mongoose = require("mongoose");

/**
 * Middleware to check if the user owns or duplicated the resource.
 * Sets `req.hasResource` to true if the user has access.
 *
 * @async
 * @function hasResource
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Promise<void>}
 */
const hasResource = async function (req, res, next) {
  try {
    const targetId = new mongoose.Types.ObjectId(req.params.id);
    const user = await User.findById(req.user._id).populate("resources");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const alreadyHas = user.resources.some(
      (r) => r._id.equals(targetId) || r.originalResourceId?.equals(targetId),
    );

    req.hasResource = alreadyHas;
    next();
  } catch (err) {
    console.error("Error in hasResource middleware:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { hasResource };
