import Button from "./Button";

function Home() {
  return (
    <div className="m-auto flex h-dvh max-w-150 flex-col items-center justify-between py-10">
      <div className="flex flex-2/3 items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="111"
          height="111"
          viewBox="0 0 111 111"
          fill="none"
          className="-mr-10"
        >
          <circle cx="55.5" cy="55.5" r="55.5" fill="#8883F0" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="111"
          height="111"
          viewBox="0 0 111 111"
          fill="none"
          className="-mr-10"
        >
          <circle
            cx="55.5"
            cy="55.5"
            r="55.5"
            fill="url(#paint0_linear_8_39)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_8_39"
              x1="10"
              y1="51.5"
              x2="111"
              y2="53.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.3" stopColor="#8d88f7" />
              <stop offset="1" stopColor="#F69491" />
            </linearGradient>
          </defs>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="111"
          height="111"
          viewBox="0 0 111 111"
          fill="none"
        >
          <circle cx="55.5" cy="55.5" r="55.5" fill="#F69491" />
        </svg>
      </div>
      <div className="flex flex-col space-y-2">
        <Button to="questions">Start Questionaire</Button>
      </div>
    </div>
  );
}

export default Home;
