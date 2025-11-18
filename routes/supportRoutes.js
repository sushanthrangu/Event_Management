// routes/supportRoutes.js
const express = require("express");
const router = express.Router();
const { getSupportReply } = require("../services/supportBot");

// Chat page
router.get("/support", (req, res) => {
  res.render("support", { title: "Support Chat" });
});

// API endpoint
router.post("/api/support", (req, res) => {
  const question = (req.body.question || "").trim();
  if (!question) {
    return res.status(400).json({ error: "Question is required" });
  }
  const answer = getSupportReply(question);
  res.json({ answer });
});

module.exports = router;
