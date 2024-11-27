import { useState } from "react";
import SubmitButton from "../components/SubmitButton";
import platformLogo from "../public/upi.svg";
import axios from "axios";
const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState(null);
  const CheckEmailWarning = () => {
    return (
      <>
        <div className="font-lg font-bold p-4 bg-green-500 rounded-lg">
          Check your email for a link to reset your password.
        </div>
      </>
    );
  };
  const EmailNotExistsWarning = () => {
    return (
      <>
        <div className="font-lg font-bold p-4 bg-red-500 text-white rounded-lg">
          Email does not exists or invalid email
        </div>
      </>
    );
  };
  const handleFormSubmit = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_BASE_URL}/user/forgot-password`,
        {
          email: email,
        }
      );
      if (response.data) {
        setEmailStatus(true);
        sendEmail();
      } else {
        setEmailStatus(false);
      }
    } catch (error) {
      console.log("Password reset error:", error);
      setEmailStatus(false);
    }
  };
  return (
    <div className="w-full min-h-screen flex flex-col gap-4  items-center  bg-gray-950 relative pt-14">
      <div className="bg-white rounded-full aspect-square flex items-center justify-center">
        <img
          src={platformLogo}
          className="h-10 object-cover"
          alt="UPI App Logo"
        />
      </div>
      <h2 className="w-full py-4  text-center text-2xl font-extralight font-poppins text-white">
        Reset Your Password
      </h2>
      <div className="my-3">
        {emailStatus === false && <EmailNotExistsWarning />}
        {emailStatus === true && <CheckEmailWarning />}
      </div>
      <div className=" w-[90%] max-w-[560px] px-8 md:px-10 py-4 flex items-center flex-col outline outline-gray-700 outline-1  rounded-2xl bg-[#151b23] text-white">
        <div className="font-poppins font-semibold my-2">
          Enter your user account's verified email address and we will send you
          a password reset link.
        </div>
        <input
          className="w-full p-3 px-5 bg-[#151b23] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          type="email"
          name="email"
          required
          placeholder="Enter your email address"
          onInput={(e) => setEmail(e.target.value)}
        />
        <SubmitButton text={"Submit"} handler={handleFormSubmit} />
      </div>
    </div>
  );
};

function sendEmail() {}

export default ForgotPassword;
