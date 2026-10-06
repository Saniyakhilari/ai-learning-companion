const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function callAI(prompt) {
  if (!prompt || typeof prompt !== "string") {
    throw new Error("A valid prompt is required.");
  }

  const response = await ai.models.generateContent({
    model: "gemini-3.8-flash",
    contents: prompt,
  });

  return response.text;
}

module.exports = {
  callAI,
};
