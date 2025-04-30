const express = require("express");
const router = express.Router();
const {
  createQuiz,
  getQuiz,
  deleteQuiz,
} = require("../controllers/quizController");

router.post("/", createQuiz); // POST /api/quiz
router.get("/:id", getQuiz); // GET /api/quiz/:id
router.delete("/:id", deleteQuiz); // DELETE /api/quiz/:id

module.exports = router;
