import { useEffect, useState } from "react";

const LoadingPage = () => {
  const [numberOfDots, setNumberOfDots] = useState(3);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNumberOfDots((prevCount) => (prevCount % 3) + 1);
    }, 300);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="dark w-screen h-screen">
      <div className="dark:bg-primary-black-100 flex flex-col gap-2 items-center justify-center h-full w-full">
        <div className="grid grid-cols-3 place-items-center text-2xl font-thin tracking-wide">
          <span className="col-start-1 col-end-3 dark:text-primary-white-text">Loading</span>
          <span className="flex  ml-2 w-full">
            {Array.from({ length: numberOfDots }).map((e, key) => (
              <span key={key} className="dark:text-primary-white-text">.</span>
            ))}
          </span>
        </div>
        <div className="relative w-[180px] h-[5px] rounded-[30px] bg-black/20">
          <div className="absolute top-0 left-0 h-full w-0 rounded-[30px] bg-blue-400 animate-moving-x-axis"></div>
        </div>
      </div>
    </div>
  );
};
export default LoadingPage;
