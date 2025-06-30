
export type Quiz = {
    question: string;
    options: string[];
    answer: string;
  };

  export type Quizzes = {
    [key: string]: Quiz[];
  };

  export const quizzes: Quizzes = {
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
