/**
 * Routes for managing resources (create, read, update, delete).
 * Includes routes for public access, info views, and sharing.
 *
 * @module resourceRoutes
 */
const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const {
  getResources,
  getResourceById,
  getResourceInfo,
  getPublicResources,
  addResource,
  deleteResource,
  updateResourceInfo,
} = require("../controllers/resourceController");
const { hasResource } = require("../controllers/sharedResourceMiddleware");
const {
  addResourceById,
  updateResourceSchoolInfo,
} = require("../controllers/shareController");

// Resource retrieval
/**
 * @route GET /resources
 * @desc Fetch all resources owned by the user
 */
router.get("/", getResources);

/**
 * @route GET /resources/info
 * @desc Fetch resource info for the dashboard view
 */
router.get("/info", getResourceInfo);

/**
 * @route GET /resources/public
 * @desc Fetch all public resources with filters
 */
router.get("/public", getPublicResources);

/**
 * @route GET /resources/:id
 * @desc Fetch a single resource by ID (with access check)
 */
router.get("/:id", hasResource, getResourceById);

//POST Routers
// Resource creation
/**
 * @route POST /resources
 * @desc Create a new resource from uploaded file or YouTube
 */
router.post("/", upload.single("pdf"), addResource);

// Resource deletion
/**
 * @route DELETE /resources/:id
 * @desc Delete a resource by ID (ownership required)
 */
router.post("/:id/add", hasResource, addResourceById);

// Resource deletion
/**
 * @route DELETE /resources/:id
 * @
 */
router.delete("/:id", hasResource, deleteResource);

// Resource updates
/**
 * @route PUT /resources/:id/schoolInfo
 * @desc Update school and course info of a resource
 */
router.put("/:id/schoolInfo", updateResourceSchoolInfo);

// Resource updates
/**
 * @route PUT /resources/:id/schoolInfo
 * @desc Update school and course info of a resource
 */
router.put("/:id", updateResourceInfo);

module.exports = router;
