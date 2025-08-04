function ProgressBar({ max = 1, value = 1 }) {
  const percentage = (value / max) * 100 + "%";
  return (
    <div className="h-2 w-48 rounded-full bg-gray-200">
      <div
        className="h-2 rounded-full bg-[#00BA88] transition-all duration-500 ease-out"
        style={{ width: percentage }}
      ></div>
    </div>
  );
}

export default ProgressBar;
