import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const quizQuestions = [
  {
    question: "What is the capital of France?",
  },
  {
    question: "Which planet is known as the Red Planet?",
  },
  {
    question: "What is 5 + 3?",
  },
];

export default function QuizApp() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isFinished, setIsFinished] = useState(false);
  const [revealedIndex, setRevealedIndex] = useState(-1);

  useEffect(() => {
    if (isFinished) {
      let index = 0;
      const interval = setInterval(() => {
        setRevealedIndex((prev) => {
          if (prev < quizQuestions.length - 1) {
            return prev + 1;
          } else {
            clearInterval(interval);
            return prev;
          }
        });
      }, 1000);
    }
  }, [isFinished]);

  const handleNextQuestion = () => {
    setAnswers([...answers, userInput]);
    setUserInput("");
    if (currentQuestion + 1 < quizQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsFinished(true);
    }
  };

  return (
    <div className="quiz-container">
      <style>
        {`
          .quiz-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            background-color: #f5f5f5;
            padding: 20px;
          }
          .quiz-card {
            background: white;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            text-align: center;
            width: 90%;
            max-width: 400px;
          }
          .quiz-question {
            font-size: 1.25rem;
            font-weight: bold;
            margin-bottom: 15px;
          }
          .quiz-input {
            width: 100%;
            padding: 10px;
            margin-top: 10px;
            border-radius: 8px;
            border: 1px solid #ccc;
            font-size: 1rem;
          }
          .quiz-next {
            margin-top: 15px;
            width: 100%;
            background-color: #007bff;
            color: white;
            padding: 12px;
            border-radius: 8px;
            border: none;
            cursor: pointer;
            transition: background 0.3s;
            font-size: 1rem;
          }
          .quiz-next:hover {
            background-color: #0056b3;
          }
          .quiz-result {
            text-align: center;
            width: 90%;
            max-width: 400px;
          }
          .quiz-title {
            font-size: 1.75rem;
            font-weight: bold;
            margin-bottom: 10px;
          }
          .quiz-answer {
            font-size: 1.2rem;
            color: #333;
            margin-top: 5px;
          }
        `}
      </style>
      {isFinished ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="quiz-result"
        >
          <h1 className="quiz-title">Quiz Completed!</h1>
          <div>
            {quizQuestions.map((q, index) => (
              <motion.p
                key={index}
                className="quiz-answer"
                initial={{ opacity: 0 }}
                animate={{ opacity: index <= revealedIndex ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              >
                <strong>{q.question}</strong> <br /> Your Answer: {answers[index] || "Not answered"}
              </motion.p>
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          className="quiz-card"
        >
          <h2 className="quiz-question">{quizQuestions[currentQuestion].question}</h2>
          <input
            type="text"
            className="quiz-input"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your answer here..."
          />
          <button className="quiz-next" onClick={handleNextQuestion}>
            {currentQuestion + 1 < quizQuestions.length ? "Next Question" : "Finish Quiz"}
          </button>
        </motion.div>
      )}
    </div>
  );
}
