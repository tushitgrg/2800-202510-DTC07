const express = require("express"); // Import the Express.js framework.
const passport = require("passport"); // Import Passport.js for authentication.
require("dotenv").config(); // Load environment variables from a .env file.
const router = express.Router(); // Create a new Express router instance.

/**
 * Route to initiate Google OAuth authentication.
 * Redirects the user to Google's consent screen using Passport.js.
 *
 * @name GET /auth/google
 * @function
 * @memberof module:authRoutes
 */
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"], // Request access to the user's profile and email.
  }),
);

// Callback route after Google authentication.
// If authentication fails, redirects to the homepage.
// If successful, redirects to the client's dashboard.
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/", // Redirect on authentication failure.
  }),
  (req, res) => {
    // On successful authentication, redirect the user to the client-side dashboard.
    res.redirect(`${process.env.CLIENT_URL}/dashboard`);
  },
);

// Route to log out the user.
// Clears the user's session and redirects to the client's homepage.
router.get("/logout", function (req, res, next) {
  // Use req.logout() to terminate the login session.
  req.logout(function (err) {
    if (err) return next(err); // Pass any error to the next middleware.
    // Redirect to the client-side homepage after successful logout.
    res.redirect(`${process.env.CLIENT_URL}`);
  });
});

module.exports = router; // Export the router to be used by the main Express app.