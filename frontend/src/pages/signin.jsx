import { useCallback, useEffect, useState } from "react";
import { Link, replace, useNavigate } from "react-router-dom";
import CardHeading from "../components/CardHeading";
import InputField from "../components/InputField";
import RedirectText from "../components/RedirectText";
import SectionText from "../components/SectionText";
import SubmitButton from "../components/SubmitButton";
import platformLogo from "../public/upi.svg"

import axios from "axios";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isUserSigned = checkUserStatus();
    isUserSigned && navigate("/dashboard", replace);
  }, []);

  function checkUserStatus() {
    return localStorage.getItem("token");
  }

  async function signInrequest() {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/signin",
        {
          email: email,
          password: password,
        }
      );
      setIsLoading(false);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  }
  return (
    <>
      <div className="w-full h-[100vh] flex flex-col gap-8 items-center justify-center bg-gray-100">
        <div>
          <img src={platformLogo} className="h-14" alt="UPI App Logo" />
        </div>
        <div className="shadow w-[90%] max-w-[500px] px-8 md:px-10 py-4 flex items-center flex-col  border-2  rounded-2xl bg-white">
          <CardHeading heading={"Sign In"} />
          <SectionText text={"Enter your credentials to access your account"} />
          <InputField
            label={"Email"}
            type={"email"}
            name={"email"}
            placeholder={"johndoe@example.com"}
            isRequired={true}
            handler={useCallback(
              (e) => {
                setEmail(e.target.value);
              },
              [email]
            )}
          />
          <InputField
            label={"Password"}
            type={"password"}
            name={"password"}
            isRequired={true}
            handler={useCallback(
              (e) => {
                setPassword(e.target.value);
              },
              [password]
            )}
          />
          <div className="flex self-start gap-1 mb-2">
            <Link
              className="  underline underline-offset-3 text-blue-600 font-bold"
              to={"/forgot-password"}
            >
              Forgot Password?
            </Link>
          </div>
          <SubmitButton
            text={"Sign In"}
            loadingState={isLoading}
            handler={signInrequest}
          />
          <RedirectText
            label={"Don't have an account?"}
            buttonText="Sign Up"
            to={"/signup"}
          />
        </div>
      </div>
    </>
  );
}
export default Signin;
