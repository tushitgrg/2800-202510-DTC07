const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Interacts with the Gemini AI model to get a structured JSON output.
 *
 * @param {Object} filePart - The processed file data (e.g., PDF) to be sent to the model.
 * @param {string} prompt - The text prompt/instruction for the AI model.
 * @returns {Promise<Object>} A Promise that resolves to a JSON object parsed from the AI's response.
 */
const getGeminiOutput = async (filePart, prompt) => {
  const model = genAI.getGenerativeModel({ model: "models/gemini-2.0-flash" });

  const result = await model.generateContent([{ text: prompt }, filePart]);
  const response = await result.response;
  let text = response.text();
  text = text.replace(/```json|```/g, "").trim();
  return JSON.parse(text);
};

module.exports = { getGeminiOutput };
