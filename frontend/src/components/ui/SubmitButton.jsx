import Loader from "./Loader";

export default function SubmitButton({ text, loadingState = false }) {
  return (
    <>
      <button
        type="submit"
        className={`w-full min-h-12 my-4 font-Inter font-bold text-2xl py-2 
      bg-primary-brand-color hover:bg-indigo-700 transition-colors text-white  rounded-md tracking-wide`}
      >
        {loadingState ? <Loader /> : text}
      </button>
    </>
  );
}
