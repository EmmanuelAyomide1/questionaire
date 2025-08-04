import { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const QuestionContext = createContext();
function QuestionProvider({ children }) {
  const [answeredQuestions, setAnsweredQuestions] = useLocalStorage(
    "answeredQuestions",
    [],
  );
  const [{ sectionNumber, questionId, questionNumber }, setQuestion] =
    useLocalStorage("curQuestion", {
      sectionNumber: 0,
      questionId: "",
      questionNumber: 0,
    });
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    function getStoredAnswer() {
      const question = answeredQuestions.find(
        (question) => questionId === question.questionId,
      );

      return question;
    }

    const answer = getStoredAnswer()?.answer;
    setAnswer(answer);
  }, [answeredQuestions, questionId]);

  function handleSubmitAnswer(answeredQuestion) {
    const hasAnsweredQuestionId = answeredQuestions.find(
      (question) => answeredQuestion.questionId === question.questionId,
    )?.questionId;

    if (hasAnsweredQuestionId) {
      const questions = answeredQuestions.map((question) => {
        if (hasAnsweredQuestionId === question.questionId) {
          return { ...question, answer };
        }
        return question;
      });
      setAnsweredQuestions(questions);
    } else {
      setAnsweredQuestions((q) => [...q, { ...answeredQuestion, answer }]);
    }
    setAnswer("");
  }

  return (
    <QuestionContext.Provider
      value={{
        answer,
        answeredQuestions,
        setQuestion,
        questionId,
        questionNumber,
        sectionNumber,
        handleSubmitAnswer,
        setAnswer,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
}
function useQuestionContext() {
  const context = useContext(QuestionContext);
  if (context === undefined)
    throw new Error("question context used out of provider");
  return context;
}

// eslint-disable-next-line
export { QuestionProvider, useQuestionContext };
