import { useNavigate } from "react-router";
import ProgressBar from "./ProgressBar";

function Header({ max, value, onClick, onClickNext, disableNext }) {
  const navigate = useNavigate();

  return (
    <header className="flex w-full items-center justify-between">
      <button onClick={onClick ? onClick : () => navigate(-1)}>
        <svg
          className="cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="16"
          viewBox="0 0 15 16"
          fill="none"
        >
          <path
            d="M0.292893 7.29289C-0.0976315 7.68342 -0.0976315 8.31658 0.292893 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292893 7.29289ZM15 8L15 7L1 7L1 8L1 9L15 9L15 8Z"
            fill="#828282"
          />
        </svg>
      </button>
      <ProgressBar max={max} value={value} />
      <button disabled={disableNext} onClick={onClickNext}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="16"
          viewBox="0 0 15 16"
          fill="none"
        >
          <path
            d="M14.7071 8.70711C15.0976 8.31658 15.0976 7.68342 14.7071 7.29289L8.34315 0.928932C7.95262 0.538408 7.31946 0.538408 6.92893 0.928932C6.53841 1.31946 6.53841 1.95262 6.92893 2.34315L12.5858 8L6.92893 13.6569C6.53841 14.0474 6.53841 14.6805 6.92893 15.0711C7.31946 15.4616 7.95262 15.4616 8.34315 15.0711L14.7071 8.70711ZM0 8L0 9L14 9L14 8L14 7L0 7L0 8Z"
            fill={`${disableNext ? "#BEBEBE" : "#828282"}`}
          />
        </svg>
      </button>
    </header>
  );
}

export default Header;
