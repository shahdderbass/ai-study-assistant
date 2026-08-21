function FlashcardsButton({ onGenerateFlashcards, loading }){
    return (
        <button
            onClick={onGenerateFlashcards}
            disabled={loading}
        >
            {loading ? "Generating..." : "Generate Flashcards"}
        </button>
    );
}

export default FlashcardsButton;