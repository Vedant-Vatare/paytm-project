export default function SubmitButton({ text, handler }) {
  return (
    <>
      <button
        onClick={handler}
        className={`w-full my-4 font-Inter font-bold text-2xl py-2 
      bg-black hover:bg-gray-800 transition-colors text-white rounded-md tracking-wide`}>
        {text}
      </button>
    </>
  );
}   