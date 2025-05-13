const Resource = require("../models/resourceModel");
const User = require("../models/userModel");
const addResourceById = async function (req, res) {
  if (req.hasResource) {
    return res.status(409).json({ msg: "User already has this resource" });
  }
  try {
    const sharedResource = await Resource.findOne({
      _id: req.params._id,
    });
    if (!sharedResource) {
      return res.status(404).json({ message: "Resource not found" });
    }
    sharedResource.shareCount += 1;
    await sharedResource.save();
    await User.findByIdAndUpdate(sharedResource.author, {
      $inc: { "achievements.totalSharesRecieved": 1 },
    });
    const { quizID, flashcardID, summaryID, title, author } = sharedResource;
    const newResource = await Resource.create({
      quizID: quizID,
      flashcardID: flashcardID,
      summaryID: summaryID,
      title: title,
      author: author,
    });
    await User.findByIdAndUpdate(req.user._id, {
      $push: { resources: newResource._id },
    });
    res.status(201).json({ msg: "Resource Created" });
  } catch (err) {
    res.status(500).json({
      error: err.message || err,
      msg: "Could not add the resource to user",
    });
  }
};
module.exports = { addResourceById };
