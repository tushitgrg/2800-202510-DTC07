const Resource = require("../models/resourceModel");
const User = require("../models/userModel");

/**
 * Adds a shared resource to the current user's collection.
 * Creates a duplicate entry pointing to the original resource.
 *
 * @async
 * @function addResourceById
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const addResourceById = async function (req, res) {
  if (req.hasResource) {
    return res.status(409).json({ msg: "User already has this resource" });
  }
  try {
    const sharedResource = await Resource.findOne({
      _id: req.params.id,
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
      originalResourceId: sharedResource._id,
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
const updateResourceSchoolInfo = async function (req, res) {
  const resourceId = req.params.id;
  const { newCourse, newSchool } = req.body;

  if (!resourceId) {
    res.status(400).json({ error: "Resource ID is required" });
  }
  try {
    const updatedResource = await Resource.findByIdAndUpdate(
      resourceId,
      {
        school: newSchool,
        course: newCourse,
      },
      { new: true },
    );
    if (!updatedResource) {
      return res.status(404).json({ error: "Resource not found" });
    }
    return res.status(200).json(updatedResource);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Unable to update resource", msg: err.message || err });
  }
};
module.exports = { addResourceById, updateResourceSchoolInfo };
