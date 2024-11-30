import { useNavigate } from "react-router-dom";
import GoBackArrow from "../icons/GoBack";
import ErrorIndicator from "../icons/ErrorIndicator";

function ErrorModal({ errorMessage, status }) {
  console.log(status, errorMessage);
  let showSignUpButtons = null;
  if (status === 403) {
    showSignUpButtons = true;
  }
  const navigate = useNavigate();

  const goToPreviousPage = () => {
    console.log("navigating...")
    if(window.history.length > 1) {
      navigate(-1);
    }
    else{
      navigate("/signup")
    } 
  };

  return (
    <div className="dark fixed inset-0 bg-primary-black-100  flex items-center justify-center z-50">
      <div className="relative bg-primary-dark-800 dark:text-primary-white-text rounded-lg shadow-lg w-[90%] max-w-[26rem]  min-h-[45vh] text-center outline flex flex-col justify-center gap-6 animate-fade-down">
        <div
          onClick={goToPreviousPage}
          className="m-3 group absolute top-1 left-0 flex items-center h-5 gap-2 self-start opacity-80 cursor-pointer active:scale-95 hover:gap-1 transition-all"
        >
          <GoBackArrow />
          <span>Go back</span>
        </div>
        <div className="flex flex-col gap-2 ">
          <div className="bg-primary-dark-800 p-2 pt-3.5 rounded-lg flex flex-col gap-2 items-center">
            <div className="w-20 h-20">
              <ErrorIndicator />
            </div>
            <span className="text-xl font-Inter tracking-wider font-semibold bg-primary-dark-900 p-3 px-6 rounded-md ">
              Error!
            </span>
          </div>
        </div>
        <p className="font-semibold text-lg capitalize bg-primary-status-red  opacity-90 p-2 px-4  rounded-md w-max mx-auto">
          {errorMessage}
        </p>  
        {showSignUpButtons && (
          <div className="justify-items-end bg-primary-black-100 p-2 py-4 m-2  rounded-md flex justify-evenly">
            <button
              onClick={() => navigate("/signup")}
              className="text-lg active:scale-95 bg-primary-white-100 text-black p-2 px-6 rounded-3xl"
            >
              Sign Up
            </button>
            <button
              onClick={() => navigate("/signin")}
              className="text-lg active:scale-95 bg-primary-black-100 outline p-2 px-6 rounded-3xl"
            >
              Sign In
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ErrorModal;
