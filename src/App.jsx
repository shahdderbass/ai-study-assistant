import "./App.css";
import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import History from "./pages/History";

/* 
Sample notes to test:
Water exists in three main states: solid, liquid, and gas. 
Ice is the solid form of water. Liquid water takes the shape of i
ts container. Water vapor is the gaseous form of water. 
Water freezes at 0°C and boils at 100°C under normal atmospheric 
pressure. Melting changes a solid into a liquid, while evaporation 
changes a liquid into a gas.
*/

function App() {

  // notes stores what user types and setNotes updates it
  const [notes, setNotes] = useState("");    // "" starts empty
  const [summary, setSummary] = useState("");
  const [quiz, setQuiz] = useState([]);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [quizLoading, setQuizLoading] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [flashcards, setFlashcards] = useState([]);
  const [flashcardsLoading, setFlashcardsLoading] = useState(false);
  const [score, setScore] = useState(null);
  const [error, setError] = useState("");

  const [selectedAnswers, setSelectedAnswers] = useState({});

  const [sessions, setSessions] = useState([]); // save all sessions received from MongoDB
  const [currentPage, setCurrentPage] = useState("home");

  async function handleSummary() {
    if (notes.trim() === ""){
      setError("Please enter some notes first");
      return;
    }

    setSummaryLoading(true);
    setError("");

    try{
      // send an http request to this address and store response
      const response = await fetch("http://localhost:5001/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"  // the information is JSON
        },
        body: JSON.stringify({  // convert js object to json to send
          notes: notes
        })
      });

      // check if the server returned an error
      if(!response.ok){
        throw new Error("Server error");
      }
      
      // convert response to something js can use
      const data = await response.json();

      setSummary(data.summary);

    } catch (error) {
      setError("Something went wrong. Please try again.");

    } finally {
      setSummaryLoading(false);
    } 
  }

  async function handleGenerateQuiz (){
    if (notes.trim() === ""){
      setError("Please enter some notes first");
      return;
    }

    setQuizLoading(true);
    setError("");

        try{
      // send an http request to this address and store response
      const response = await fetch("http://localhost:5001/quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"  // the information is JSON
        },
        body: JSON.stringify({  // convert js object to json to send
          notes: notes
        })
      });

      // check if the server returned an error
      if(!response.ok){
        throw new Error("Server error");
      }
      
      // convert response to something js can use
      const data = await response.json();

      setQuiz(data.quiz);
      setSelectedAnswers({});

      setQuizSubmitted(false);
      setScore(null);

    } catch (error) {
      setError("Something went wrong. Please try again.");

    } finally {
      setQuizLoading(false);
    } 
  }

  function handleSubmitQuiz() {
    // to check if user answered all questions or not
    if (Object.keys(selectedAnswers).length < quiz.length) {
      setError("Please answer all questions before submitting.");
      return;
    }

    let total = 0;

    quiz.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        total++;
      }
    });

    setScore(total);
    setQuizSubmitted(true);
  }

  async function handleSaveSession (){
    if( !notes ){
      setError("Please enter some notes before saving.");
      return;
    }

    try{
      // send an http request to this address and store response
      const titleResponse = await fetch("http://localhost:5001/title", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"  // the information is JSON
        },
        body: JSON.stringify({  // convert js object to json to send
          notes: notes
        })
      });

      // check if the server returned an error
      if(!titleResponse.ok){
        throw new Error("Could not generate title");
      }

      const titleData = await titleResponse.json();

      console.log("Generated title:", titleData);

      const response = await fetch("http://localhost:5001/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: titleData.title,
          notes,
          summary,
          quiz,
          flashcards,
          score
        })
      });
      if(!response.ok){
        throw new Error("Could not save session");
      }

      setError("");
      alert("Study session saved!");

    } catch(error){
      setError("Could not save study session.");
    }
  }

  async function handleLoadSessions(){
    try{
      const response = await fetch("http://localhost:5001/sessions");

      if(!response.ok){
        throw new Error("Could not load saved sessions.")
      }

      const data = await response.json();

      console.log("Loaded sessions:", data);

      setSessions(data);

    } catch (error){
      setError("Could not load study history.");
    }
  }

  function handleOpenSession(session) {
    setNotes(session.notes);
    setSummary(session.summary);
    setQuiz(session.quiz || []);
    setFlashcards(session.flashcards || []);
    setScore(session.score ?? null);

    setSelectedAnswers({});
    setQuizSubmitted(session.score !== null);

    setCurrentPage("home");
  }

  async function handleDeleteSession(id){
    try{
      // delete session fromMongoDB
      const response = await fetch(`http://localhost:5001/sessions/${id}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        throw new Error("Could not delete session");
      }

      // remove session from screen
      setSessions(sessions.filter((session) => session._id !== id));

    } catch(error) {
      setError("Could not delete study session.");
    }
  }

  async function handleGenerateFlashcards() {
    if (notes.trim() === "") {
      setError("Please enter some notes first.");
      return;
    }

    setFlashcardsLoading(true);
    setError("");

    try{
      const response = await fetch("http://localhost:5001/flashcards", {
          method: "POST",
          headers: {
            "Content-Type": "application/json" 
          },
          body: JSON.stringify({
            notes
          })
        });

      if(!response.ok){
        throw new Error("Could not generate flashcards.");
      }
      
      const data = await response.json();

      setFlashcards(data.flashcards);

    } catch(error){
      setError("Could not generate flashcards.");
    } finally {
      setFlashcardsLoading(false);
    }

  }

  return (
    <div className="app-shell">

      {/* sidebar */}
      <Sidebar 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        handleLoadSessions={handleLoadSessions}
      />


      {/* main */}
      <main className="main-content">

      <Header />

      {currentPage === "home" && (
        <Home
          notes={notes}
          setNotes={setNotes}
          summary={summary}
          quiz={quiz}
          flashcards={flashcards}
          summaryLoading={summaryLoading}
          quizLoading={quizLoading}
          flashcardsLoading={flashcardsLoading}
          error={error}
          selectedAnswers={selectedAnswers}
          setSelectedAnswers={setSelectedAnswers}
          quizSubmitted={quizSubmitted}
          score={score}
          handleSummary={handleSummary}
          handleGenerateQuiz={handleGenerateQuiz}
          handleGenerateFlashcards={handleGenerateFlashcards}
          handleSubmitQuiz={handleSubmitQuiz}
          handleSaveSession={handleSaveSession}
        />
      )}

      {currentPage === "history" && (
        <History 
          sessions={sessions} 
          handleOpenSession={handleOpenSession}
          handleDeleteSession={handleDeleteSession}
        />
      )}

      </main>
    </div>
  );
}

export default App