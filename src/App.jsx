import "./App.css";
import { useState } from "react";
import Header from "./components/Header";
import NotesInput from "./components/NotesInput"
import SummaryButton from "./components/SummaryButton"
import QuizButton from "./components/QuizButton";
import SummaryOutput from "./components/SummaryOutput"
import QuizOutput from "./components/QuizOutput";

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
  const [score, setScore] = useState(null);
  const [error, setError] = useState("");

  const [selectedAnswers, setSelectedAnswers] = useState({});

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

  return (
    <div className="app-shell">

      {/* sidebar */}
      <aside className="sidebar">
        <div className="logo-card">
          <div className="cloud">☁️</div>
          <h2>StudyAI</h2>
        </div>

        <nav className="nav-menu">
          <button className="nav-item active">⌂ <span>Home</span></button>
          <button className="nav-item">▤ <span>Summary</span></button>
          <button className="nav-item">? <span>Quiz</span></button>
          <button className="nav-item">◷ <span>History</span></button>
          <button className="nav-item">⚙ <span>Settings</span></button>
        </nav>

        <div className="sidebar-decoration">
          🌿
          <p>Better notes<br />Brighter future ♡</p>
        </div>
      </aside>


      {/* main */}
      <main className="main-content">

        {/* header */}
        <header className="top-header">
          <div>
            <h1>✨ AI Study Assistant</h1>
            <p>Turn your notes into study material 💗</p>
          </div>

          <button className="mode-button">☾</button>
        </header>


        {/* top section */}
        <section className="top-grid">

          <div className="card notes-card">
            <h2>📝 1. Paste your notes</h2>

            <NotesInput
              notes={notes}
              setNotes={setNotes}
            />

            <div className="action-buttons">
              <SummaryButton
                onSummarize={handleSummary}
                loading={summaryLoading}
              />

              <QuizButton
                onGenerateQuiz={handleGenerateQuiz}
                loading={quizLoading}
              />
            </div>

            {error && <p className="error-message">{error}</p>}
          </div>


          <div className="card tips-card">
            <h2>💡 Quick Tips</h2>

            <p>✓ Use clear and concise notes</p>
            <p>✓ Include key concepts</p>
            <p>✓ The more detail, the better</p>
            <p>✓ You can edit notes anytime!</p>

            <div className="cute-character">🐱</div>
          </div>

        </section>


        {/* bottom section */}
        <section className="bottom-grid">

          {/* summary */}
          <div className="card summary-card">
            <div className="section-title">
              <h2>📄 Summary</h2>
            </div>

            <SummaryOutput summary={summary} />

            <div className="plant-decoration">
              🌱 ✨
            </div>
          </div>


          {/* quiz */}
          <div className="card quiz-card">
            <div className="section-title">
              <h2>❔ Quiz</h2>

              {quiz.length > 0 && (
                <span>{Object.keys(selectedAnswers).length} / {quiz.length}</span>
              )}
            </div>

            <QuizOutput
              quiz={quiz}
              selectedAnswers={selectedAnswers}
              setSelectedAnswers={setSelectedAnswers}
              quizSubmitted={quizSubmitted}
            />

            {quiz.length > 0 && !quizSubmitted && (
              <button
                className="submit-quiz"
                onClick={handleSubmitQuiz}
              >
                ✈ Submit Quiz
              </button>
            )}

            {score !== null && (
              <div className="score-card">
                <div>
                  <strong>⭐ Great job!</strong>
                  <p>Your score</p>
                </div>

                <h2>{score} / {quiz.length}</h2>

                <div className="score-percent">
                  {Math.round((score / quiz.length) * 100)}%
                </div>
              </div>
            )}
          </div>

        </section>


        <footer>
          💗 Keep learning and stay curious!
        </footer>

      </main>
    </div>
  );
}

export default App