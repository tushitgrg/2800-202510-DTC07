const express = require("express");
const router = express.Router();
const {
  getResources,
  getResourceById,
  addResource,
} = require("../controllers/resourceController");
router.get("/", getResources);
router.get("/:id", getResourceById);
router.post("/", addResource);
module.exports = router;
