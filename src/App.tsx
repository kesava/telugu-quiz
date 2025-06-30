
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import React from "react";
import { VerbalQuizApp } from "./VerbalQuizApp";
import { VisualQuizApp } from "./VisualQuizApp";


export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="quiz-container">
              <h2 className="quiz-title">Choose a Telugu Vocabulary Quiz</h2>
              <Link to="/quiz1" className="quiz-next">Quiz 1</Link>
              <Link to="/quiz2" className="quiz-next">Quiz 2</Link>
              <h2>Choose a Visual Quiz</h2>
              <Link to="/vq1" className="quiz-next">Hindu Gods' Weapons Quiz</Link>
            </div>
          }
        />
        <Route path="/quiz1" element={<VerbalQuizApp quizKey="quiz1" />} />
        <Route path="/quiz2" element={<VerbalQuizApp quizKey="quiz2" />} />
        <Route path="/vq1" element={<VisualQuizApp quizKey="vq1" />} />
      </Routes>
    </Router>
  );
}
