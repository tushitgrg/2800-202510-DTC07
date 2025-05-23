/**
 * Routes for updating user progress on a resource.
 *
 * @module progressRoutes
 */
const express = require("express");
const router = express.Router();
const { updateProgress } = require("../controllers/progressController");

// POST update progress for a specific resource
/**
 * @route POST /progress/:resourceId
 * @desc Update user's quiz, flashcard, or summary progress
 * @access Protected
 */
router.post("/:resourceId", updateProgress);

module.exports = router;
