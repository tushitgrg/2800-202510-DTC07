const User = require("../models/userModel");
const updateUserTags = async function (userId, newTags) {
  const user = await User.findByIdAndUpdate(
    userId,
    {
      $addToSet: { previousTags: newTags },
    },
    { new: true }
  );
};
module.exports = { updateUserTags };
