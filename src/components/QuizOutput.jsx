function QuizOutput({
  quiz,
  selectedAnswers,
  setSelectedAnswers,
  quizSubmitted
}) {

  function handleAnswer(questionIndex, optionIndex) {
    if (quizSubmitted) return;

    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: optionIndex
    });
  }

  return (
    <div className="quiz-output">

      {quiz.map((item, index) => (

        <div className="question-card" key={index}>

          <h3>
            {index + 1}. {item.question}
          </h3>

          <div className="options">

            {item.options.map((option, optionIndex) => {

              let className = "answer-option";

              if (quizSubmitted) {
                if (optionIndex === item.correctAnswer) {
                  className += " correct";
                }
                else if (
                  selectedAnswers[index] === optionIndex
                ) {
                  className += " wrong";
                }
              }
              else if (
                selectedAnswers[index] === optionIndex
              ) {
                className += " selected";
              }

              return (
                <button
                  key={optionIndex}
                  className={className}
                  onClick={() =>
                    handleAnswer(index, optionIndex)
                  }
                  disabled={quizSubmitted}
                >
                  <span className="radio-circle"></span>
                  {option}
                </button>
              );

            })}

          </div>
        </div>

      ))}

    </div>
  );
}

export default QuizOutput;