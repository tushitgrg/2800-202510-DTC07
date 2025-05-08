const User = require("../models/userModel");
const updateUserTags = async function (userId, newTags) {
  const user = await User.findByIdAndUpdate(
    userId,
    {
      $addToSet: { previousTags: { $each: newTags } },
    },
    { new: true }
  );
};
module.exports = { updateUserTags };
