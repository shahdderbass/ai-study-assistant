const express = require("express");
const { GoogleGenAI } = require("@google/genai");

const router = express.Router();

// create gemini client object to use and give it API key
const ai = new GoogleGenAI({    
    // ai is the object that will talk to Gemini
    // GoogleGenAI google's AI tool
    apiKey: process.env.GEMINI_API_KEY   // key from .env
});

router.post("/title", async (request, response) => {
  const notes = request.body.notes;

  const result = await ai.models.generateContent({
    model: "gemini-3.1-flash-lite",
    contents: `Generate a descriptive title for these study notes. 
                Return only the title and nothing else :\n\n${notes}`
  });

  response.json({
    title: result.text
  });
});

router.post("/summarize", async (request, response) => {
  const notes = request.body.notes;

  const result = await ai.models.generateContent({
    model: "gemini-3.1-flash-lite",
    contents: `Summarize these study notes clearly and simply:\n\n${notes}`
  });

  response.json({
    summary: result.text
  });
});

router.post("/quiz", async (request, response) => {
  const notes = request.body.notes;

  const quiz = await ai.models.generateContent({
    model: "gemini-3.1-flash-lite",
    contents: `
      Create 5 multiple-choice quiz questions based only on these notes.

      Return ONLY valid JSON in this format:

      [
        {
          "question": "Question text",
          "options": ["Option A", "Option B", "Option C", "Option D"],
          "correctAnswer": 0
        }
      ]

      correctAnswer must be the index of the correct option:
      0 = first option
      1 = second option
      2 = third option
      3 = fourth option

      Study notes:
      ${notes}
      `
  });

  const quizData = JSON.parse(quiz.text);

  response.json({
    quiz: quizData
  });
});

router.post("/flashcards", async(request, response) => {
  const notes = request.body.notes;

  const result = await ai.models.generateContent({
    model: "gemini-3.1-flash-lite",
    contents: `
      Create 5 study flashcards based only on these notes.

      Return ONLY valid JSON in this format:

      [
        {
          "question": "Flashcard question",
          "answer": "Flashcard answer"
        }
      ]

      Study notes:
      ${notes}`
    
  });

  const flashcards = JSON.parse(result.text);

  response.json({
    flashcards
  });

});

module.exports = router;