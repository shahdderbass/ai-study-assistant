function FlashcardsButton({ onGenerateFlashcards, loading }){
    return (
        <button
            className="flashcards-button"
            onClick={onGenerateFlashcards}
            disabled={loading}
        >
            {loading ? "Generating..." : "Generate Flashcards"}
        </button>
    );
}

export default FlashcardsButton;