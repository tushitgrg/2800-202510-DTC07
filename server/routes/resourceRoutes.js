const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const {
  getResources,
  getResourceById,
  getResourceInfo,
  addResource,
  deleteResource,
  updateResourceInfo,
} = require("../controllers/resourceController");
const { hasResource } = require("../controllers/sharedResourceMiddleware");
router.get("/", getResources);
router.get("/info", getResourceInfo);
router.get("/:id", hasResource, getResourceById);
router.post("/", upload.single("pdf"), addResource);
router.delete("/:id", deleteResource);
router.put("/:id", updateResourceInfo);
module.exports = router;
