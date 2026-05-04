const express = require("express");
const router = express.Router();

const { getProblems, getProblemById} = require("../controllers/problemsController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, getProblems);
router.get("/:id", authMiddleware, getProblemById );

module.exports = router;