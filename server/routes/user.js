/**
 * Routes for user-related operations.
 *
 * @module userRoutes
 */
const express = require("express");
const { updateUser, getUser } = require("../controllers/userController");

const router = express.Router();

/**
 * @route POST /users/update
 * @desc Create or update user information
 * @access Public or protected (depending on implementation)
 */
router.post("/update", updateUser);

/**
 * @route PUT /users/update
 * @desc Update existing user information
 * @access Public or protected
 */
router.put("/update", updateUser);

/**
 * @route GET /users/:email
 * @desc Retrieve a user by email
 * @access Public or protected
 */
router.get("/:email", getUser);

module.exports = router;
