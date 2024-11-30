import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CardHeading from "../components/ui/CardHeading";
import InputField from "../components/ui/InputField";
import RedirectText from "../components/ui/RedirectText";
import SectionText from "../components/ui/SectionText";
import SubmitButton from "../components/ui/SubmitButton";
import InputFieldWithToggle from "../components/ui/inputFieldWithToggle";
import axios from "axios";
const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

function Signin() {
  const [email, seEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inputError, setInputError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function checkUserStatus() {
    return localStorage.getItem("token");
  }

  useEffect(() => {
    const isUserSigned = checkUserStatus();
    isUserSigned && navigate("/dashboard", { replace: true });
  }, []);

  async function sendSignInRequest() {
    setIsLoading(true);
    try {
      const response = await axios.post(`${BACKEND_BASE_URL}/user/signin`, {
        email: email,
        password: password,
      });
      console.log(response.data);
      setIsLoading(false);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.log(error?.response?.data.message || error.message);
      setInputError(error?.response?.data.message || error.message);
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="dark relative pt-8 w-full h-[100vh] flex flex-col gap-4 items-center bg-primary-black-100">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendSignInRequest();
          }}
          className="w-full grid place-items-center relative top-20"
        >
          <div className="shadow w-[90%] max-w-[500px] px-8 md:px-10 py-4 gap-1.5 flex items-center flex-col rounded-2xl bg-primary-dark-900">
            <CardHeading heading={"Sign In"} />
            <SectionText
              text={"Enter your credentials to access your account"}
            />
            <InputField
              label={"Email"}
              type={"email"}
              name={"email"}
              placeholder={"johndoe@example.com"}
              isRequired={true}
              handler={useCallback(
                (e) => {
                  seEmail(e.target.value);
                },
                [email]
              )}
            />
            <InputFieldWithToggle
              label={"Password"}
              placeholder={"Enter password"}
              handler={useCallback(
                (e) => {
                  setPassword(e.target.value);
                },
                [password]
              )}
            />
            <div className="flex self-start gap-1 mb-2">
              <Link
                className="group  underline underline-offset-3 text-primary-brand-color font-bold"
                to={"/forgot-password"}
              >
                Forgot Password?
              </Link>
            </div>
            {inputError && (
              <div className="font-bold text-base text-primary-black-100 p-3 px-5 my-2 bg-primary-status-red rounded-md text-center capitalize">
                {inputError}
              </div>
            )}
            <SubmitButton text={"Sign In"} loadingState={isLoading} />
            <RedirectText
              label={"Don't have an account?"}
              buttonText="Sign Up"
              to={"/signup"}
            />
          </div>
        </form>
      </div>
    </>
  );
}
export default Signin;
