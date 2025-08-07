import { useEffect, useRef, useState } from "react";
import SlidingOption from "./SlidingOption";
import { useQuestionContext } from "../../contexts/QuestionContext";

function SlidingOptions({ min, max }) {
  const optionContainerRef = useRef(null);
  const optionsRef = useRef([]);
  const [visibleOptions, setVisibleOptions] = useState([]);
  const { answer, setAnswer, questionId } = useQuestionContext();
  const answerRef = useRef(answer || 0);

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
  };

  const updateVisibleItems = debounce(() => {
    if (!optionContainerRef.current) return;

    const containerRect = optionContainerRef.current.getBoundingClientRect();
    const visible = new Set();

    optionsRef.current.forEach((optionRef) => {
      if (optionRef) {
        const optionRect = optionRef.getBoundingClientRect();
        const optionValue = Number(optionRef.textContent);

        if (
          optionRect.top <= containerRect.bottom &&
          optionRect.bottom - 37 >= containerRect.top
        ) {
          visible.add(optionValue + 2);
        }
      }
    });

    const visibleArray = [...visible];
    setVisibleOptions(visibleArray);

    answerRef.current = visibleArray[2] - 2;
    setAnswer(answerRef.current);
  }, 10);

  useEffect(() => {
    console.log("runnns");
    updateVisibleItems();

    setAnswer(0);
    const timer = setTimeout(() => {
      if (optionContainerRef.current) {
        optionContainerRef.current.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [setAnswer, questionId]);

  const values = [];
  for (let num = min; num <= max + 2; num++) {
    values.push(num);
  }
  return (
    <div
      className="mt-2 h-71 w-full overflow-y-auto pb-17"
      ref={optionContainerRef}
      onScroll={updateVisibleItems}
      key={questionId}
    >
      {values.map((value) => {
        const visiblePosition = visibleOptions.indexOf(value);

        return (
          <SlidingOption
            ref={optionsRef}
            key={value}
            value={value}
            visiblePosition={visiblePosition}
          />
        );
      })}
    </div>
  );
}

export default SlidingOptions;
