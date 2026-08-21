import "./FlashcardsOutput.css";
import { useState } from "react";

function FlashcardsOutput({ flashcards }) {
  const [flippedCards, setFlippedCards] = useState({});

  if (flashcards.length === 0) {
    return <p>No flashcards generated yet.</p>;
  }

  function handleFlip(index) {
    setFlippedCards({
      ...flippedCards,
      [index]: !flippedCards[index]
    });
  }

  return (
    <div className="flashcards-grid">
      {flashcards.map((card, index) => (
        <div
          key={index}
          className="flashcard"
          onClick={() => handleFlip(index)}
        >
          <div className="flashcard-content">
            {flippedCards[index] ? (
              <>
                <span className="flashcard-label">Answer</span>
                <p>{card.answer}</p>
              </>
            ) : (
              <>
                <span className="flashcard-label">Question</span>
                <h3>{card.question}</h3>
              </>
            )}
          </div>

          <small>
            {flippedCards[index]
              ? "Click to see question"
              : "Click to reveal answer"}
          </small>
        </div>
      ))}
    </div>
  );
}

export default FlashcardsOutput;