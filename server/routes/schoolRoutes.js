/**
 * School search route for autocomplete functionality.
 * Searches a local list of school names and returns up to 10 matches.
 * Uses in-memory caching for performance.
 *
 * @module schoolRoutes
 */

const express = require("express");
const router = express.Router();
const schools = require("../data/lowercased-schools.json");
const cache = new Map();


/**
 * @route GET /schools/search
 * @queryParam {string} q - Query string for filtering school names
 * @desc Returns up to 10 school name suggestions
 * @access Public
 */
router.get("/search", (req, res) => {
  const q = (req.query.q || "").toLowerCase();
  if (cache.has(q)) return res.json(cache.get(q));
  const filtered = schools
    .filter((school) => school.includes(q))
    .slice(0, 10)
    .map((n) => {
      return {
        name: n
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
      };
    });
  if (cache.size > 1000) cache.clear();
  cache.set(q, filtered);
  res.json(filtered);
});

module.exports = router;
