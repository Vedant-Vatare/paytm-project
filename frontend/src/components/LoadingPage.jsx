import { useEffect, useState } from "react";

const LoadingPage = () => {
  const [numberOfDots, setNumberOfDots] = useState(3);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNumberOfDots((prevCount) => (prevCount % 3) + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="flex flex-col gap-2 items-center justify-center w-screen h-screen">
      <div className="grid grid-cols-3 place-items-center text-2xl font-thin tracking-wide">
        <span className="col-start-1 col-end-3 ">Loading</span>
        <span className="flex  ml-2 w-full">
          {Array.from({ length: numberOfDots }).map((e, key) => (
            <span key={key}>.</span>
          ))}
        </span>
      </div>
      <div className="relative w-[180px] h-[5px] rounded-[30px] bg-black/20">
        <div className="absolute top-0 left-0 h-full w-0 rounded-[30px] bg-blue-400 animate-moving-x-axis"></div>
      </div>
    </div>
  );
};
export default LoadingPage;
