import { useQuestionContext } from "../../contexts/QuestionContext";

function Option({ option }) {
  const { answer, setAnswer } = useQuestionContext();

  const isSelected = option.value === answer;
  const baseStyle =
    "box-border h-6 w-6 rounded-full border-3 bg-white " +
    `${isSelected ? "border-[#3128ef]" : "border-[#BEBEBE]"}`;

  return (
    <div
      onClick={() => setAnswer(option.value)}
      className="flex h-18 cursor-pointer items-center justify-between rounded-md border border-[#EAF3FE] bg-white px-7 shadow-2xs shadow-[#EAF3FE] hover:ring-2 hover:ring-[#d9e8fa]"
    >
      <p>{option.label}</p>

      <div className={baseStyle}></div>
    </div>
  );
}

export default Option;
