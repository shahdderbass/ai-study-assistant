// lets Node read values from .env file and access key
require("dotenv").config(); // load dotenv package 
// .config reads .env file and loads variables inside it

// import google's Gemini tool
const { GoogleGenAI } = require("@google/genai");

// create gemini client object to use and give it API key
const ai = new GoogleGenAI({    
    // ai is the object that will talk to Gemini
    // GoogleGenAI google's AI tool
    apiKey: process.env.GEMINI_API_KEY   // key from .env
});

// express listens to requests from websites and decides what to do with it
// it reirects it to your code

const express = require("express");     // import express libaray

// react app and backend run on different ports
// cors allows communication and requests from another address
const cors = require("cors");

// the actual app, express is like the blueprint
const app = express();
const PORT = 5001;

// allow other websites ( like the react app) to communicate with me
app.use(cors());

// express automatically convers unreadable text to js object
app.use(express.json());

// run when / is visited
// get is an http method which meand read data
// in plain english, when someone gets the homepage, send "Backend is running!"
app.get("/", (request, response) => {
    response.send("Backend is running!");
});

app.post("/summarize", async(request, response) => {    // async lets route wait for Gemini
    const notes = request.body.notes;   // gest notes React sent

    const result = await ai.models.generateContent({    // send prompt to ai
        model: "gemini-3.1-flash-lite",
        contents: `Summarize these study notes clearly and simply:\n\n${notes}`
    });

    response.json({ // send response back to React
        summary: result.text
    });
});

app.post("/quiz", async(request, response) => {
    const notes = request.body.notes;

    const quiz = await ai.models.generateContent({    // send prompt to ai
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

    response.json({ // send response back to React
        quiz: quizData
    });
});

// app.post("/summarize", (request, response) => {
//     console.log(request.body);  // print data it recieves 

//     //send back summary
//     response.json({
//         summary: "This a test summary"
//     });

// });

// start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

