const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const { callAI } = require("./src/services/ai.service");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// GET /api/health — Server liveness check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// POST /api/chat — Send a message to Gemini AI and return the reply
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  // Validate input
  if (!message || typeof message !== "string" || message.trim() === "") {
    return res.status(400).json({ error: "A valid message is required." });
  }

  try {
    const reply = await callAI(message.trim());
    return res.status(200).json({ reply });
  } catch (err) {
    // Log internally — do not expose error details to client
    console.error("[/api/chat] Gemini error:", err.message);
    return res.status(500).json({ error: "Failed to get AI response." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
