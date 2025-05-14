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
const { addResourceById, updateResourceSchoolInfo } = require("../controllers/shareController");

//GET Routers
router.get("/", getResources);
router.get("/info", getResourceInfo);
router.get("/public", getPublicResources);
router.get("/:id", hasResource, getResourceById);

//POST Routers
router.post("/", upload.single("pdf"), addResource);
router.post("/:id/add", hasResource, addResourceById);

router.delete("/:id", hasResource, deleteResource);
router.put("/:id/schoolInfo", updateResourceSchoolInfo);
router.put("/:id", updateResourceInfo);

module.exports = router;
