/**
 * Middleware to check if the user is authenticated.
 * Proceeds to next middleware if authenticated,
 * otherwise responds with a 401 error.
 *
 * @function isAuthenticated
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const isAuthenticated = (req, res, next) => {
  if (req.user) return next();
  res.status(401).json({ error: "Not Authenticated" });
};
module.exports = isAuthenticated;
