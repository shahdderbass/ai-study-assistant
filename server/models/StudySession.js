const mongoose = require("mongoose");

const studySessionSchema = new mongoose.Schema({
    title: String,
    notes: String,
    summary: String,
    quiz: Array,
    flashcards: Array,
    score: Number
}, {
    timestamps: true
});

const StudySession = mongoose.model("StudySession", studySessionSchema);

module.exports = StudySession;