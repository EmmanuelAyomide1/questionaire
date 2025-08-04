import { useQuestionContext } from "../../contexts/QuestionContext";

function SlidingOption({ value, ref, visiblePosition = -1 }) {
  const { setAnswer } = useQuestionContext();

  const positionStyles = {
    0: "z-1 w-65 opacity-30",
    1: "z-3 w-70 opcacity-60",
    2: "z-5 w-full underline",
    3: "z-3 w-70 opacity-60",
    4: "z-1 w-65 opacity-30",
  };
  const positionStyle = positionStyles[visiblePosition]
    ? positionStyles[visiblePosition]
    : "opacity-0";

  return (
    <div
      ref={(el) => (ref.current[value] = el)}
      onClick={() => setAnswer(value)}
      style={{
        boxShadow: `
      0 -10px 25px -3px #EAF3FE, 
      0 -4px 6px -2px #EAF3FE,
      0 10px 25px -3px #EAF3FE, 
      0 4px 6px -2px #EAF3FE
    `,
      }}
      className={`relative mx-auto -mt-5 flex h-20 cursor-pointer items-center justify-center rounded-3xl border border-[#EAF3FE] bg-white px-10 shadow-2xl shadow-[#EAF3FE] transition-all duration-500 ease-linear hover:ring-2 hover:ring-[#d9e8fa] ${value - 2 < 0 ? "opacity-0" : `${positionStyle}`}`}
    >
      <p>{value - 2}</p>
    </div>
  );
}

export default SlidingOption;
