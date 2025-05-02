const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const express = require("express");
const router = express.Router();
const {
  createFlashcardSet,
  getFlashcardSetById,
  getUserFlashcardSets,
  deleteFlashcardSet,
} = require("../controllers/flashcardController");
//Auth middleware maybe? 

router.post("/", upload.single("pdf"), createFlashcardSet); // POST /flashcards
router.get("/set/:id", getFlashcardSetById); // GET /flashcards/set/:id
router.get("/user", getUserFlashcardSets); // GET /flashcards/user
router.delete("/:id", deleteFlashcardSet); // DELETE /flashcards/:id

module.exports = router;
