import { memo } from "react";

const LoadingUsers = memo(() => {
  const skeletonLoader = () => {
    return (
      <>
        <div className="w-full flex justify-between items-center my-6 p-3 rounded-sm outline outline-2 outline-gray-200 bg-slate-50">
          <div className="flex gap-8 items-center">
            <div className="h-12 w-12 rounded-full animate-pulse bg-gray-300"></div>
            <div className="flex gap-4">
              <div className="h-6 w-20 rounded-full animate-pulse delay-50 bg-gray-300"></div>
              <div className="h-6 w-24 rounded-full animate-pulse bg-gray-300"></div>
            </div>
          </div>
          <div className=" h-8  w-28 rounded-md px-3  py-2 animate-pulse bg-gray-300"></div>
        </div>
      </>
    );
  };
  return (
    <>
       {Array.from({ length: 7 }).map((_, index) => (
        <div key={index}>{skeletonLoader()}</div>
      ))}
    </>
  )
});

export default LoadingUsers;
