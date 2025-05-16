const isAuthenticated = (req, res, next) => {
  if (req.user) return next();
  res.status(401).json({ error: "Not Authenticated" });
};
module.exports = isAuthenticated;
