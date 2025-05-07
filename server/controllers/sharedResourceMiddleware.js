const User = require("../models/userModel");

const hasResource = async function (req, res, next) {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.hasResource = user.resources.includes(req.params.id);
    next();
  } catch (err) {
    console.error("Error in hasResource middleware:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { hasResource };
