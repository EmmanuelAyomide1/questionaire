import Option from "./Option";

function Options({ options }) {
  return (
    <div className="mb-5 h-full w-full space-y-2 py-5">
      {options.map((option) => (
        <Option key={option.value} option={option} />
      ))}
    </div>
  );
}

export default Options;
