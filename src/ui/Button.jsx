import { Link } from "react-router";

function Button({ children, type = "primary", to, onClick, disabled = false }) {
  const disableStyle = "opacity-60";
  const base = `w-full cursor-pointer rounded-full  px-27 py-4 font-[inter] font-bold text-[#F7FAFE] ${disabled ? disableStyle : ""} text-nowrap flex justify-center  `;
  const style = {
    primary: base + "bg-[#8883F0]",
    secondary: base + "bg-[#F69491]",
  };
  if (!to)
    return (
      <button disabled={disabled} onClick={onClick} className={style[type]}>
        {children}
      </button>
    );
  return (
    <Link className={style[type]} to={to}>
      {children}
    </Link>
  );
}

export default Button;
