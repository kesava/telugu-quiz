import { useState } from "react";
import { motion } from "framer-motion";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React from "react";
// import "./QuizApp.css";

type Quiz = {
  question: string;
  options: string[];
  answer: string;
};

type Quizzes = {
  [key: string]: Quiz[];
};

const quizzes: Quizzes = {
    "quiz1": [
      {
        "question": "జుజివి",
        "options": ["trivial", "fruit", "casual"],
        "answer": "trivial"
      },
      {
        "question": "చైవ్రాలు",
        "options": ["handtowel", "signature", "border of a 7 yard saree"],
        "answer": "signature"
      },
      {
        "question": "టూకి",
        "options": ["soundless cinema", "summary", "Turkish citizen"],
        "answer": "summary"
      },
      {
        "question": "దఖిని",
        "options": ["a language", "a mirror", "royal treasury"],
        "answer": "a language"
      },
      {
        "question": "తమాము",
        "options": ["soap", "whole", "restfulness"],
        "answer": "whole"
      },
      {
        "question": "చటాకు",
        "options": ["quickly", "unit of measure", "terrace"],
        "answer": "unit of measure"
      },
      {
        "question": "కొల్లాయి",
        "options": ["public tap", "loin cloth", "bird song"],
        "answer": "loin cloth"
      },
      {
        "question": "కొట్టము",
        "options": ["warehouse", "whip", "valve"],
        "answer": "warehouse"
      },
      {
        "question": "తిరుమణి",
        "options": ["temple pond", "white paste", "temple seva"],
        "answer": "white paste"
      },
      {
        "question": "దుబాసి",
        "options": ["spendthrift", "maniac", "interpreter"],
        "answer": "interpreter"
      }
    ],

  quiz2: [
    {
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      answer: "4",
    },
  {
    question: "What is the boiling point of water?",
    options: ["90°C", "100°C", "110°C", "120°C"],
    answer: "100°C",
  },
  ],
};

function QuizApp({ quizKey }: { quizKey: string }) {
  const quizQuestions = quizzes[quizKey] || [];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const handleAnswerClick = (option: string) => {
    setSelected(option);
    setShowAnswer(true);
    if (option === quizQuestions[currentQuestion].answer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 < quizQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelected(null);
      setShowAnswer(false);
    } else {
      setIsFinished(true);
    }
  };

  return (
    <div className="quiz-container">
      {isFinished ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="quiz-result"
        >
          <h1 className="quiz-title">Quiz Completed!</h1>
          <p className="quiz-score">Your Score: {score} / {quizQuestions.length}</p>
          <Link to="/" className="quiz-next">Back to Home</Link>
        </motion.div>
      ) : (
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          className="quiz-card"
        >
          <h2 className="quiz-question">
            {quizQuestions[currentQuestion].question}
          </h2>
          <div className="quiz-options">
            {quizQuestions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className={`quiz-option ${
                  selected
                    ? option === quizQuestions[currentQuestion].answer
                      ? "correct"
                      : option === selected
                      ? "incorrect"
                      : ""
                    : "hover-effect"
                }`}
                disabled={showAnswer}
                onClick={() => handleAnswerClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
          {showAnswer && (
            <button className="quiz-next" onClick={nextQuestion}>
              Next Question
            </button>
          )}
        </motion.div>
      )}
      <div className="quiz-progress">
        <div
          className="quiz-progress-bar"
          style={{ width: `${(currentQuestion + 1) / quizQuestions.length * 100}%` }}
        />
        <p className="quiz-progress-text">
          {currentQuestion + 1} / {quizQuestions.length}
        </p>
     </div>
     <div className="quiz-footer">
        <p>
          Made by <a href="https://kesava.github.io/telugu2iast">kēśava</a>
        </p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="quiz-container">
              <h1 className="quiz-title">Choose a Telugu Vocabulary Quiz</h1>
              <Link to="/quiz1" className="quiz-next">Quiz 1</Link>
              {/* <Link to="/quiz2" className="quiz-next">Quiz 2</Link> */}
            </div>
          }
        />
        <Route path="/quiz1" element={<QuizApp quizKey="quiz1" />} />
        <Route path="/quiz2" element={<QuizApp quizKey="quiz2" />} />
      </Routes>
    </Router>
  );
}
