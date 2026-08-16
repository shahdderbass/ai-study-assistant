function QuizButton ({onGenerateQuiz, loading}) {
    return (
        <button 
            className="quiz-button"
            onClick={onGenerateQuiz} 
            disabled={loading}
        >
            {loading ? "Generating Quiz..." : "Generate Quiz"}
        </button>
    );
}

export default QuizButton;