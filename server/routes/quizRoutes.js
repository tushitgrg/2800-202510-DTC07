const multer = require('multer');
const upload = multer({storage: multer.memoryStorage()})

const express = require("express");
const router = express.Router();
const {
  createQuiz,
  getQuiz,
  deleteQuiz,
} = require("../controllers/quizController");

router.post("/", upload.single("pdf"), createQuiz); // POST /quiz
router.get("/:id", getQuiz); // GET /quiz/:id
router.delete("/:id", deleteQuiz); // DELETE /quiz/:id

module.exports = router;
