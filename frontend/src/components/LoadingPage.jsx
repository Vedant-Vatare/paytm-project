const LoadingPage = () => {
  return (
      <div className="flex flex-col gap-5 items-center justify-center w-screen h-screen">
        <div className="text-2xl font-medium">Loading</div>
        <div className="relative block w-[180px] h-[5px] rounded-[30px] bg-black/20">
          <div className="absolute top-0 left-0 h-full w-0 rounded-[30px] bg-[#0071e2] animate-moving"></div>
        </div>
      </div>
  );
};
export default LoadingPage;
