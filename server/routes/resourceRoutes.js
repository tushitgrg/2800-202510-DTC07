const express = require("express");
const router = express.Router();
const multer = require('multer');
const upload = multer({storage: multer.memoryStorage()})
const {
  getResources,
  getResourceById,
  addResource,
} = require("../controllers/resourceController");
router.get("/", getResources);
router.get("/:id", getResourceById);
router.post("/",upload.single("pdf"), addResource);
module.exports = router;
