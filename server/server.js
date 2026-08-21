// lets Node read values from .env file and access key
require("dotenv").config(); // load dotenv package 
// .config reads .env file and loads variables inside it
//console.log("1. dotenv loaded");

// express listens to requests from websites and decides what to do with it
// it reirects it to your code
const express = require("express");     // import express libaray
// react app and backend run on different ports
// cors allows communication and requests from another address
//console.log("2. express loaded");

const cors = require("cors");
//console.log("3. cors loaded");

const mongoose = require("mongoose");
//console.log("4. mongoose loaded");

const aiRoutes = require("./routes/aiRoutes");
const sessionRoutes = require("./routes/sessionRoutes");

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

app.use("/", aiRoutes);
app.use("/sessions", sessionRoutes);

// connect backend to MongoDB Atlas database
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });

// start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

