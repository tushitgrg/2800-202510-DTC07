const express = require("express");
const router = express.Router();
const { updateProgress } = require("../controllers/progressController");

// POST update progress for a specific resource
router.post("/:resourceId", updateProgress);

module.exports = router;
