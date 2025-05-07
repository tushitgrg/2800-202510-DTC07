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
} = require("../controllers/resourceController");
router.get("/", getResources);
router.get("/info", getResourceInfo);
router.get("/:id", getResourceById);
router.post("/", upload.single("pdf"), addResource);
router.delete("/:id", deleteResource);
module.exports = router;
