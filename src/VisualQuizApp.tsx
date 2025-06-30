import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Example visual quiz data structure
const quizzes: Record<string, Array<{
  question: string;
  image: string;
  options: string[];
    answer: string;
    explanation?: string;
}>> = {
  "vq1": [
    {
      question: "Who is this?",
      image: "/telugu-quiz/hindu-hands/1.png",
      options: ["kesava", "narayana", "madhava", "janardhana"],
      answer: "kesava",
      explanation: "This is a depiction of Kesava. The popular depiction of Vishnu is in fact of Janardhana with chakra and gada in right hands, and shanka and padma in left hands.",
    },
    {
      question: "What weapon is this, thats usually held by Vishnu?",
      image: "/telugu-quiz/hindu-hands/2.png",
      options: ["padma", "gada", "musala"],
      answer: "gada",
      explanation: "This is a depiction of the gada, which is a mace-like weapon traditionally associated with Vishnu.",
    },
    {
      question: "Who had these weapon?",
      image: "/telugu-quiz/hindu-hands/3.png",
      options: ["krishna", "balarama", "shiva", "ganesha"],
      answer: "balarama",
      explanation: "Balarama is often depicted with a musala (pestle) and hala (plough).",
        },
    {
      question: "What is this weapon called?",
      image: "/telugu-quiz/hindu-hands/4.png",
      options: ["tanka", "khetaka", "parasu", "agni"],
      answer: "parasu",
      explanation: "This is a depiction of the Parasu, which is an axe-like weapon associated with Parashurama.",
        },
    {
      question: "What is this oseseous weapon called?",
      image: "/telugu-quiz/hindu-hands/5.png",
      options: ["khetaka", "khatvanga", "ghanta", "pasa"],
      answer: "khatvanga",
      explanation: "This is a depiction of the Khatvanga, which is a staff with a skull at one end, often associated with Shiva.",
        },
    {
      question: "Who holds this weapon?",
      image: "/telugu-quiz/hindu-hands/6.png",
      options: ["rama", "shiva", "ganesha", "vishnu"],
      answer: "ganesha",
      explanation: "This is a depiction of the ankusha, which is a goad traditionally associated with Ganesha.",
        },
    {
      question: "This weapon has a long buddhist history, what is it called?",
      image: "/telugu-quiz/hindu-hands/7.png",
      options: ["pasa", "vajra", "trishula"],
      answer: "vajra",
      explanation: "This is a depiction of the Vajra, which is a thunderbolt and a weapon associated with Indra in Hindu mythology, and also used in Buddhism."
        },
    {
      question: "Who holds this weapon?",
      image: "/telugu-quiz/hindu-hands/8.png",
      options: ["indra", "kartikeya", "bhairava", "ganesha"],
      answer: "kartikeya",
    explanation: "This is a depiction of the Sakti/Vel, which is a divine spear associated with Kartikeya, the god of war."
        },
    {
      question: "What is this held by Pashupati called?",
      image: "/telugu-quiz/hindu-hands/9.png",
      options: ["pasa", "mriga", "trishula"],
      answer: "mriga",
      explanation: "This is a depiction of the Mriga, which is a deer/ram and is often associated with Pashupati, a form of Shiva."
        },
    {
      question: "Who holds this trident?",
      image: "/telugu-quiz/hindu-hands/10.png",
      options: ["shiva", "durga", "kaali", "all of the above"],
        answer: "all of the above",
        explanation: "The Trishula is a trident weapon that is held by Shiva, Durga, and Kaali in various depictions."
    }
  ]
};

export function VisualQuizApp({ quizKey }: { quizKey: string }) {
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
          <h1 className="quiz-title">Can you guess the answer?
            <div className="quiz-subtitle">
              ({quizQuestions.length} questions)
            </div>
          </h1>
          <img
            src={quizQuestions[currentQuestion].image}
            alt="quiz visual"
            className="quiz-image"
            style={{ maxWidth: "300px", margin: "1em auto", display: "block" }}
          />
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
          {showAnswer && quizQuestions[currentQuestion].explanation && (
            <div className="quiz-explanation" style={{ margin: "1em 0", color: "#444" }}>
              <strong>Explanation:</strong> {quizQuestions[currentQuestion].explanation}
            </div>
          )}
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
