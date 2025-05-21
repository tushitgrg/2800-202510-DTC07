const {
  processUploadedContent,
  createResourceShell,
  handleGeminiTasks,
} = require("./resourceUtils");

const User = require("../models/userModel");
const Progress = require("../models/progressModel");
const Resource = require("../models/resourceModel");
const Quiz = require("../models/quizModel");
const Flashcard = require("../models/flashcardModel");
const Summary = require("../models/summaryModel");
const { isValidObjectId } = require("mongoose");

/**
 * Fetches a resource by its ID and populates its associated content.
 *
 * @async
 * @function fetchResource
 * @param {string} resourceID - The ID of the resource to fetch
 * @returns {Promise<Object|null>} Resolves to the resource object with populated content or null if not found
 */
const fetchResource = async (resourceID) => {
  const resource = await Resource.findById(resourceID);
  if (!resource) return null;

  const { quizID, flashcardID, summaryID, title, createdAt } = resource;

  return {
    _id: resource._id,
    title: title,
    createdAt: createdAt,
    quiz: quizID ? await Quiz.findById(quizID) : null,
    flashcard: flashcardID ? await Flashcard.findById(flashcardID) : null,
    summary: summaryID ? await Summary.findById(summaryID) : null,
  };
};

/**
 * Retrieves detailed information about a user's resources.
 * Feeds the dashboard with resource metadata and progress.
 *
 * @async
 * @function getResourceInfo
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const getResourceInfo = async function (req, res) {
  const userId = req.user._id;
  try {
    const user = await User.findById(userId);
    const userResources = user.resources;

    const result = await Promise.all(
      userResources.map(async (resourceID) => {
        const resource = await Resource.findById(resourceID);
        const progress = await Progress.findOne({
          $and: [{ userId: userId }, { resourceId: resourceID }],
        }).select("-_id -userId -resourceId");
        if (!resource) return null;
        const info = {};
        info.id = resourceID;
        info.originalResourceId = resource.originalResourceId || null;
        info.title = resource.title;
        info.createdAt = resource.createdAt;
        info.tags = resource.tags || [];
        info.progress = progress || {};
        info.isOwner = userId.equals(resource.author);
        info.isPublic = resource.isPublic;
        const author = await User.findById(resource.author);
        info.school = author.school;

        return info;
      })
    );
    return res.status(200).json({ resources: result });
  } catch (err) {
    console.error("Failed to fetch user resources:", err);
    return res.status(500).json({ error: "Failed to fetch resources" });
  }
};

/**
 * Handles GET request for all resources owned by the user.
 * Uses fetchResource to retrieve full resource content.
 *
 * @async
 * @function getResources
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const getResources = async function (req, res) {
  const userId = req.user._id;
  try {
    const user = await User.findById(userId);
    const userResources = user.resources;
    const result = await Promise.all(
      userResources.map((resourceID) => fetchResource(resourceID))
    );
    return res.status(200).json(result);
  } catch (err) {
    console.error("Failed to fetch user resources:", err);
    return res.status(500).json({ error: "Failed to fetch resources" });
  }
};

/**
 * Handles GET request for a single resource by ID.
 * Returns detailed content and progress metadata.
 *
 * @async
 * @function getResourceById
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const getResourceById = async function (req, res) {
  const resourceId = req.params.id;

  const response = { hasResource: req.hasResource };
  try {
    const resource = await Resource.findById(resourceId);
    if (!resource) {
      return res.status(404).json({ error: "Resource not found" });
    }
    const originalResource = await Resource.findById(
      resource.originalResourceId
    );
    console.log("aaaaa", originalResource);
    const { quizID, flashcardID, summaryID, title, createdAt, author } =
      resource;
    const progress = await Progress.findOne({ resourceId: resourceId }).select(
      "-_id -userId -resourceId"
    );
    response.id = resourceId;
    response.title = title;
    response.createdAt = createdAt;
    response.progress = progress || {};
    response.isOwner = author.equals(req.user._id);
    console.log(req.user._id);
    if (originalResource) {
      response.isLiked = originalResource.likes?.includes(req.user._id);
    } else response.isLiked = resource.likes?.includes(req.user._id);
    response.isPublic = resource.isPublic;
    if (quizID) {
      const quiz = await Quiz.findById(quizID);
      response.quiz = quiz;
    }
    if (flashcardID) {
      const flashcard = await Flashcard.findById(flashcardID);
      response.flashcard = flashcard;
    }
    if (summaryID) {
      const summary = await Summary.findById(summaryID);
      response.summary = summary;
    }
    return res.status(200).json(response);
  } catch (error) {
    console.error("Internal server error: ", error);
    return res.status(500).json({ error: "Failed to retrieve resource" });
  }
};

/**
 * Creates a new resource for the user and optionally generates quiz, flashcard, and summary content using AI.
 * @async
 * @function addResource
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const addResource = async function (req, res) {
  const userId = req.user._id;
  const user = await User.findById(userId);

  try {
    const file = await processUploadedContent(req);

    const newResource = await createResourceShell(
      userId,
      req.body.title,
      user.school
    );

    await handleGeminiTasks(file, req.body, newResource._id);

    user.resources.push(newResource._id);
    await user.save();

    await Progress.create({
      userId,
      resourceId: newResource._id,
    });

    return res.status(201).json({
      msg: `Successfully created resource with id:${newResource._id}`,
      resourceID: newResource._id,
    });
  } catch (err) {
    console.error("Resource creation failed:", err);
    if (newResource?._id) {
      await Resource.deleteOne({ _id: newResource._id });
    }

    return res.status(500).json({
      error: "Failed to create resource",
    });
  }
};

/**
 * Deletes a resource by ID if the user is authorized.
 *
 * @async
 * @function deleteResource
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const deleteResource = async function (req, res) {
  const resourceId = req.params.id;
  if (!resourceId) {
    return res.status(400).json({ error: "Resource ID is required" });
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  if (!req.hasResource) {
    return res
      .status(403)
      .json({ msg: "User has no authorization to delete this resource" });
  }

  try {
    await Resource.findByIdAndDelete(resourceId);
    await user.updateOne({ $pull: { resources: resourceId } });
    return res
      .status(200)
      .json({ msg: `Successfully deleted resource with ID: ${resourceId}` });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err, msg: "Unable to delete the provided resource" });
  }
};

/**
 * Updates a resource's metadata and like status.
 *
 * @async
 * @function updateResourceInfo
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const updateResourceInfo = async function (req, res) {
  const resourceId = req.params.id;

  const { newTitle, newTags, newSchool, newCourse, isPublic, isLiked } =
    req.body;
  const updatedFields = {
    ...(newTitle && { title: newTitle }),
    ...(newTags && { tags: newTags }),
    ...(newSchool && { school: newSchool }),
    ...(newCourse && { course: newCourse }),
    ...(isPublic != null && { isPublic: isPublic }),
  };

  if (!resourceId) {
    return res.status(400).json({ error: "Resource ID is required" });
  }
  try {
    console.log(
      "Hello this is emanuel: ",
      isPublic,
      updatedFields.isPublic,
      true
    );
    if (isLiked === true) {
      const currentResource = await Resource.findByIdAndUpdate(resourceId, {
        $addToSet: { likes: req.user._id },
      });
      if (currentResource.originalResourceId)
        await Resource.findByIdAndUpdate(currentResource.originalResourceId, {
          $addToSet: { likes: req.user._id },
        });
    } else if (isLiked === false) {
      const currentResource = await Resource.findByIdAndUpdate(resourceId, {
        $pull: { likes: req.user._id },
      });
      if (currentResource.originalResourceId)
        await Resource.findByIdAndUpdate(currentResource.originalResourceId, {
          $pull: { likes: req.user._id },
        });
    }
    const updatedResource = await Resource.findByIdAndUpdate(
      resourceId,
      updatedFields,
      { new: true }
    );
    if (!updatedResource) {
      return res.status(404).json({ error: "Resource not found" });
    }
    return res.status(200).json(updatedResource);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "Unable to update resource", msg: err.message || err });
  }
};

const getPublicResources = async function (req, res) {
  try {
    let { course, school, q, sort, page } = req.query;
    if (!page) {
      page = 1;
    }
    const limit = 18;

    // Always filter for public resources
    const filters = { isPublic: true };

    // Optional filters
    if (course) filters.course = course;
    if (school) filters.school = { $regex: school, $options: "i" };

    // Text search (title, description, tags)
    if (q) {
      filters.$or = [
        { title: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
        { tags: { $regex: q, $options: "i" } },
      ];
    }

    // Optional sorting
    let sortOption = {};
    if (sort) {
      const [field, order] = sort.split(":");
      sortOption[field] = order === "desc" ? -1 : 1;
    }

    const totalCount = await Resource.countDocuments(filters);

    const publicResources = await Resource.find(filters)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("author", "name");

    const publicResourceInfo = publicResources.map((resource) => ({
      _id: resource._id,
      title: resource.title,
      author: resource.author?.name || null,
      school: resource.school || null,
      course: resource.course,
      createdAt: resource.createdAt,
      shareCount: resource.shareCount || 0,
      likes: resource.likes?.length || 0,
    }));

    // Obtain all unique schools/courses from matching full set
    const allMatchingResources = await Resource.find(filters).select(
      "school course"
    );
    const allSchools = Array.from(
      new Set(allMatchingResources.map((r) => r.school).filter(Boolean))
    );
    const allCourses = Array.from(
      new Set(allMatchingResources.map((r) => r.course).filter(Boolean))
    );

    res.status(200).json({
      data: publicResourceInfo,
      totalCount,
      allSchools,
      allCourses,
    });
  } catch (err) {
    res.status(500).json({
      msg: "Unable to fetch public resources",
      error: err.message || err,
    });
  }
};

module.exports = {
  getResources,
  getResourceInfo,
  getPublicResources,
  getResourceById,
  addResource,
  deleteResource,
  updateResourceInfo,
};
