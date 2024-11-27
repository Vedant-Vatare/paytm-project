import { memo } from "react";

const LoadingUsers = memo(() => {
  const skeletonLoader = () => {
    return (
      <>
        <div className="w-full flex justify-between items-center my-6 lg:p-4 p-2 rounded-lg outline outline-2 outline-primary-black-100 bg-primary-black-100">
          <div className="flex gap-8 items-center">
            <div className="h-12 w-12 rounded-full animate-pulse bg-primary-dark-700"></div>
            <div className="flex gap-4">
              <div className="h-6 w-20 rounded-full animate-pulse delay-50 bg-primary-dark-900"></div>
              <div className="h-6 w-24 rounded-full animate-pulse bg-primary-dark-900"></div>
            </div>
          </div>
          <div className=" h-8  w-28 rounded-md px-3  py-2 animate-pulse bg-primary-dark-900"></div>
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
