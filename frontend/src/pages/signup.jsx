import React, { useCallback, useState } from "react";
import CardHeading from "../components/ui/CardHeading";
import InputField from "../components/ui/InputField";
import SectionText from "../components/ui/SectionText";
import SubmitButton from "../components/ui/SubmitButton";
import RedirectText from "../components/ui/RedirectText";
import InputFieldWithToggle from "../components/ui/inputFieldWithToggle";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formInputsError, setFormInputsError] = useState();
  const navigate = useNavigate();
  async function sendData() {
    setIsLoading(true);
    try {
      const response = await axios.post(`${BACKEND_BASE_URL}/user/signup`, {
        firstName,
        lastName,
        email,
        password,
      });
      setIsLoading(false);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.log(error?.response?.data.message);
      setFormInputsError(error?.response?.data.message);
      setIsLoading(false);
    }
  }

  return (
    <div className="dark w-full h-[100vh] flex items-center justify-center bg-primary-black-100">
      <div className="shadow w-[90%] max-w-[500px] px-8 md:px-10 py-4 flex items-center flex-col self-center rounded-2xl bg-primary-dark-900">
        <CardHeading heading="Get Started With PayEase" />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendData();
          }}
          className="w-full"
        >
          <InputField
            handler={useCallback(
              (e) => {
                setFirstName(e.target.value);
              },
              [firstName]
            )}
            type="text"
            name="firstName"
            placeholder="John"
            label="First Name"
            isRequired={true}
          />
          <InputField
            handler={useCallback(
              (e) => {
                setlastName(e.target.value);
              },
              [lastName]
            )}
            type="text"
            name="lastName"
            placeholder="Doe"
            label="Last Name"
            isRequired={true}
          />
          <InputField
            handler={useCallback(
              (e) => {
                setEmail(e.target.value);
              },
              [email]
            )}
            type="email"
            name="email"
            placeholder="JohnDoe@example.com"
            label="Email"
            isRequired={true}
          />
          <InputFieldWithToggle
            handler={useCallback(
              (e) => {
                setPassword(e.target.value);
              },
              [password]
            )}
            placeholder={"Enter password"}
            label="Password"
          />
          {formInputsError && (
            <div className="font-bold text-base text-primary-black-100 p-3 px-5 mt-5 bg-primary-status-red rounded-md text-center capitalize">
              {"Invalid Input"}
            </div>
          )}
          <SubmitButton text={"Sign up"} loadingState={isLoading} />
        </form>
        <RedirectText
          label={"Already have an account?"}
          buttonText={"login"}
          to={"/signin"}
        />
      </div>
    </div>
  );
}

export default Signup;
