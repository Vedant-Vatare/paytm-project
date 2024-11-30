import { useState } from "react";
import platformLogo from "../public/upi.png";
import SubmitButton from "../components/ui/SubmitButton";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const Resetpassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [wrongPassAlert, setWrongPassAlert] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  async function handleFormSubmit() {
    if (password !== confirmPassword) {
      setWrongPassAlert(true);
      return;
    }

    setWrongPassAlert(false);
    const token = searchParams.get("token");
    console.log(token);
    try {
      const response = axios.post(
        `${BACKEND_BASE_URL}/user/reset-password/?token=${token}`,
        {
          password,
        }
      );
      console.log(response.data);
      localStorage.setItem("token", (await response).data.token);
      navigate("/signin");
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div className="w-full min-h-screen relative  m-auto flex flex-col gap-16 items-center bg-gray-950 ">
      <div className="relative top-32 w-full grid place-items-center gap-4">
        <h2 className="w-full py-4  text-center text-2xl font-extralight font-poppins text-white">
          Reset Your Password
        </h2>
        <div className=" w-[90%] max-w-[560px] px-8 md:px-10 py-4 flex items-center flex-col outline outline-gray-700 outline-1  rounded-2xl bg-[#151b23] text-white">
          <form
            className="w-full"
            onSubmit={(e) => {
              e.preventDefault();
              handleFormSubmit();
            }}
          >
            <div className="my-2 font-poppins text-left font-medium text-lg text self-start">
              Enter new password
            </div>
            <input
              className="w-full p-3 px-5 bg-[#151b23] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              type="password"
              name="password"
              required
              placeholder="Enter password"
              onInput={(e) => setPassword(e.target.value)}
            />
            <div className="my-2 mt-5 font-poppins text-left font-medium text-lg text self-start">
              Confirm password
            </div>
            <input
              className="w-full p-3 px-5 mb-3 bg-[#151b23] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              type="password"
              name="password"
              required
              placeholder="confirm password"
              onInput={(e) => setConfirmPassword(e.target.value)}
            />
            {wrongPassAlert && (
              <div className="text-lg font-bold text-red-500 font-Inter">
                Passwords do not match{" "}
              </div>
            )}
            <SubmitButton text={"Submit"} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Resetpassword;
