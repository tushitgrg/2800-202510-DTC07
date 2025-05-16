const User = require("../models/userModel");

const mongoose = require("mongoose");

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
