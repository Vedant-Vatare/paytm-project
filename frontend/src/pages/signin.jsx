import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardHeading from "../components/CardHeading";
import InputField from "../components/InputField";
import RedirectText from "../components/RedirectText";
import SectionText from "../components/SectionText";
import SubmitButton from "../components/SubmitButton";
import axios from "axios";

function Signin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();
  async function signInrequest() {
    const response = await axios.post("http://localhost:3000/api/v1/user/signin",
      {
        email: email,
        password: password
      }
    );
    localStorage.setItem("token", response.data.token);
    navigate("/dashboard")
  }
  return (
    <>
      <div className="w-full h-[100vh] flex items-center justify-center ">
        <div className="shadow w-[90%] max-w-[500px] px-8 md:px-10 py-4 flex items-center flex-col self-center border-2  rounded-2xl bg-white">
          <CardHeading heading={"Sign In"} />
          <SectionText text={"Enter your credentials to access your account"} />
          <InputField
            label={"Email"}
            type={"email"}
            name={"email"}
            placeholder={"johndoe@example.com"}
            isRequired={true}
            handler={useCallback(e => {setEmail(e.target.value)}, [email])}
          />
          <InputField
            label={"Password"}
            type={"password"}
            name={"password"}
            isRequired={true}
            handler={useCallback(e => {setPassword(e.target.value)}, [password])}
          />
          <SubmitButton text={"Sign In"} handler={signInrequest} />
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
