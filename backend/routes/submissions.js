const express = require("express");
const router = express.Router();

const { getSubmissions, setSubmission } = require("../controllers/submissionController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, setSubmission);
router.get("/:id", authMiddleware, getSubmissions);

module.exports = router;

