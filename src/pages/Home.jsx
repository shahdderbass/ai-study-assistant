import NotesInput from "../components/NotesInput";
import SummaryButton from "../components/SummaryButton";
import QuizButton from "../components/QuizButton";
import SummaryOutput from "../components/SummaryOutput";
import QuizOutput from "../components/QuizOutput";
import FlashcardsButton from "../components/FlashcardsButton";
import FlashcardsOutput from "../components/FlashcardsOutput";

import "./Home.css";

function Home({
  notes,
  setNotes,
  summary,
  quiz,
  flashcards,
  summaryLoading,
  quizLoading,
  flashcardsLoading,
  error,
  selectedAnswers,
  setSelectedAnswers,
  quizSubmitted,
  score,
  handleSummary,
  handleGenerateQuiz,
  handleSubmitQuiz,
  handleSaveSession,
  handleGenerateFlashcards
}) {
  return (
    <>
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

            <FlashcardsButton
                onGenerateFlashcards={handleGenerateFlashcards}
                loading={flashcardsLoading}
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

      <section className="bottom-grid">
        <div className="card summary-card">
          <div className="section-title">
            <h2>📄 Summary</h2>
          </div>

          <SummaryOutput summary={summary} />

          <div className="plant-decoration">
            🌱 ✨
          </div>
        </div>

        <div className="card quiz-card">
          <div className="section-title">
            <h2>❔ Quiz</h2>

            {quiz.length > 0 && (
              <span>
                {Object.keys(selectedAnswers).length} / {quiz.length}
              </span>
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

              <section className="flashcards-section">
            <div className="card flashcards-card">
                <div className="section-title">
                <h2>🧠 Flashcards</h2>
                </div>

                <FlashcardsOutput flashcards={flashcards} />
            </div>
        </section>

        <button
           className="save-session"
           onClick={handleSaveSession}
        >
           💾 Save Study Session
        </button>

        <footer>
            💗 Keep learning and stay curious!
        </footer>
    </>
  );
}

export default Home;