import { useEffect } from "react";
import { useLoaderData } from "react-router";

import { useQuestionContext } from "../../contexts/QuestionContext";
import Options from "./Options";
import SlidingOptions from "./SlidingOptions";
import Header from "../../ui/Header";
import Button from "../../ui/Button";
import { getQuestion } from "../../utils/getQuestion";
import { postAnswers } from "../../utils/postAnswers";

function Question() {
  const { sections, totalQuestions } = useLoaderData();
  const {
    answer,
    handleSubmitAnswer,
    sectionNumber,
    questionId,
    questionNumber,
    setQuestion,
    answeredQuestions,
    submitted,
    setAnswer,
    setSubmitted,
    buttonDisabled,
  } = useQuestionContext();

  const section = sections[sectionNumber];
  const questions = section.questions;
  const curQuestion = getCurrentQuestion();
  const disableNext =
    curQuestion.type === "interstitial" || curQuestion.type === "number"
      ? false
      : buttonDisabled;

  useEffect(() => {
    const isLastQuestion = questionNumber === totalQuestions - 1;

    if (isLastQuestion) {
      console.log("Last question rendered, sending request...", { submitted });
      if (submitted) return;
      try {
        const submittedSuccessfully = postAnswers(answeredQuestions);
        if (submittedSuccessfully) setSubmitted(true);
      } catch (err) {
        console.error(`"failed", ${err.message}`);
      }
    }
  }, [
    questionNumber,
    totalQuestions,
    answeredQuestions,
    submitted,
    setSubmitted,
  ]);

  function getCurrentQuestion() {
    const id =
      questionId ||
      answeredQuestions.find(
        (question) => question.questionNumber === questionNumber,
      )?.questionId;
    if (!id) return questions[0];
    return questions.find((q) => q.id === id);
  }

  function handleNext() {
    if (!curQuestion.type === "interstitial" && answer === null) return;

    if (totalQuestions - 1 === questionNumber) return;

    if (answer !== null) {
      handleSubmitAnswer({ sectionNumber, questionNumber, questionId });
    }

    if (questions.at(-1).id === questionId) {
      setQuestion((q) => ({
        ...q,
        sectionNumber: sectionNumber + 1,
        questionNumber: questionNumber + 1,
        questionId: "",
      }));
    } else {
      setQuestion((q) => ({
        ...q,
        questionNumber: questionNumber + 1,
        questionId: questions[questions.indexOf(curQuestion) + 1].id,
      }));
    }
  }

  function handlePrevious() {
    if (questionNumber) {
      if (questions.at(0).id === curQuestion.id && sectionNumber) {
        setQuestion((q) => ({
          ...q,
          sectionNumber: sectionNumber - 1,
          questionNumber: questionNumber - 1,
          questionId: answeredQuestions.find(
            (question) => question.questionNumber === questionNumber - 1,
          )?.questionId,
        }));
      } else {
        setQuestion((q) => ({
          ...q,
          questionNumber: questionNumber - 1,
          questionId: questions[questions.indexOf(curQuestion) - 1].id,
        }));
      }
    }
  }

  return (
    <div className="m-auto flex h-dvh max-w-150 flex-col px-10 pt-16 pb-10">
      <Header
        max={totalQuestions}
        value={
          totalQuestions - 1 !== questionNumber
            ? questionNumber
            : totalQuestions
        }
        disableNext={disableNext}
        onClickNext={() => handleNext()}
        onClick={() => handlePrevious()}
      />

      <div className="mt-10 flex h-full flex-col items-center space-y-5 px-4">
        <h1 className="text-center font-[inter] text-2xl font-semibold">
          {section?.meta?.title}
        </h1>

        <div className="flex h-full w-full flex-col justify-between">
          <div className="max-h-110 min-h-55 space-y-7 overflow-y-auto px-2 font-medium">
            {!(curQuestion?.type === "interstitial") && (
              <p className="text-justify">{section.meta.instructions}</p>
            )}

            {curQuestion?.text && (
              <p className="text-justify whitespace-pre-line">
                {curQuestion.text}
              </p>
            )}
          </div>

          {curQuestion?.options && <Options options={curQuestion.options} />}
          {curQuestion.type === "number" && (
            <SlidingOptions min={curQuestion.min} max={curQuestion.max} />
          )}
          {curQuestion.type === "textarea" && (
            <div className="flex flex-col">
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="h-50 w-full rounded-xl border border-stone-300 px-5 py-3 focus:ring focus:ring-stone-300 focus:outline-none"
              />
            </div>
          )}

          {totalQuestions - 1 !== questionNumber && (
            <div className="flex justify-center px-4">
              <Button
                onClick={handleNext}
                type="primary"
                disabled={disableNext}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export async function loader() {
  const sections = await getQuestion();
  const totalQuestions = sections.reduce(
    (acc, cur) => acc + cur.questions.length,
    0,
  );

  return { sections, totalQuestions };
}

export default Question;
