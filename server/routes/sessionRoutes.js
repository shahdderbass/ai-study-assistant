const express = require("express");
const StudySession = require("../models/StudySession");

const router = express.Router();

// save a study session (send data)
router.post("/", async (request, response) => {
  try {
    // get what react sends and save it
    const { title, notes, summary, quiz, flashcards, score } = request.body;

   // console.log("Received title:", title);

    // create a database object 
    const session = new StudySession({
      title,
      notes,
      summary,
      quiz,
      flashcards,
      score
    });

    // save object to MongoDB and wait until it finishes
    // then store in 'savedSession" whatever got saved to MongoDB
    const savedSession = await session.save();

     console.log("Received title:", title);

    // tell react it worked, send it back as json
    response.json(savedSession);

  } catch (error) {
    response.status(500).json({
      error: "Could not save study session"
    });
  }
});

// get all saved sessions
router.get("/", async (request, response) => {
  try {
    const sessions = await StudySession.find().sort({ createdAt: -1 });

    response.json(sessions);

  } catch (error) {
    response.status(500).json({
      error: "Could not load study sessions"
    });
  }
});

// delete session
router.delete("/:id", async(request, response) => {
  try{
    await StudySession.findByIdAndDelete(request.params.id);

    response.json({
      message: "Session deleted."
    });

  } catch(error) {
    response.status(500).json({
      error: "Could not delete study session."
    }); 
  }
});

module.exports = router;