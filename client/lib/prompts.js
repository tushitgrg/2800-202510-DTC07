export const generateQuizPrompt = (s) => `
You are an expert quiz generator.

Return a single JSON object that **MUST** conform exactly to this schema

{
  "quizzes": [
    {
      "question": String,
      "options":  [String],   // 2–6 options
      "correctAnswer": String // must match one of the options
    }
  ]
}

Requirements:
1. Create **${s.questionCount}** quiz items inside "quizzes".
2. Allowed question types: ${s.questionTypes.join(", ")}.
3. Overall difficulty level: “${s.difficulty}”.
4. **Do not** include explanations, markdown code fences, or extra fields.
5. Respond with **only** the JSON—nothing else.`.trim();


export const generateFlashcardPrompt = (s) => `
You are an expert flash‑card creator.

Return one JSON object that fits this schema exactly

{
  "cards": [
    {
      "front": String,
      "back":  String
    }
  ]
}

Rules:
1. Produce **${s.cardCount}** cards.
2. Complexity: **${s.complexity}**.
3. Card style: **${s.style}**  
   • standard   → term on front, definition on back  
   • reversed   → definition on front, term on back  
   • question   → question on front, answer on back  
   • cloze      → sentence with “…{{cloze}}…” on front, full sentence on back
4. Keep each front/back under ~280 characters.
5. Output strictly valid JSON—no code fences, no commentary.`.trim();


export const generateSummaryPrompt = (s) => `
You are an expert summariser.

Return a JSON object matching this schema

{
  "content": String
}

Instructions:
1. Write a **${s.length}‑length** summary (short / medium / long).
2. Focus especially on: ${s.focusAreas.join(", ")}.
3. Use concise, academic language; bullet points are welcome.
4. Place the entire summary in the "content" field.
5. Respond with **only** the JSON object—no markdown fences, no extra keys.`.trim();
