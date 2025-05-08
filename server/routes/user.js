const express = require("express");
const { updateUser, getUser } = require("../controllers/userController");

const router = express.Router();

router.post("/update", updateUser);
router.put("/update", updateUser);
router.get("/:email", getUser);

module.exports = router;
