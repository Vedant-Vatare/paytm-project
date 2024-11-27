import Loader from "./Loader";

export default function SubmitButton({ text, handler, loadingState = false }) {
  return (
    <>
      <button
        type="submit"
        // onClick={(e)=> {
        //   e.preventDefault();
        // }}
        className={`w-full min-h-12 my-4 font-Inter font-bold text-2xl py-2 
      bg-indigo-600 hover:bg-indigo-700 transition-colors text-white  rounded-md tracking-wide`}>
        { loadingState ? <Loader/> : text}
      </button>
    </>
  );
}   