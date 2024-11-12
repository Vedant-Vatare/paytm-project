  import React, { useCallback, useState } from "react";
  import CardHeading from "../components/CardHeading";
  import InputField from "../components/InputField";
  import SectionText from "../components/SectionText";
  import SubmitButton from "../components/SubmitButton";
  import RedirectText from "../components/RedirectText";
  import axios from "axios";
  import { useNavigate } from "react-router-dom";
  function Signup() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
    async function sendData(e) {
      e.preventDefault();
      try { 
        const response = await axios.post(
          "http://localhost:3000/api/v1/user/signup",
          {
            firstName,
            lastName,
            email,
            password,
          }
        );
        localStorage.setItem("token", response.data.token)
        navigate("/dashboard");
      } catch (error) {
        console.log(error.response.data.message);
      }
    }

    return (
      <div className="w-full h-[100vh] flex items-center justify-center bg-slate-200">
        <div className="shadow w-[90%] max-w-[500px] px-8 md:px-10 py-4 flex items-center flex-col self-center border-2  rounded-2xl bg-white">
          <CardHeading heading="Welcome to payTM" />
          <form className="w-full">
            <SectionText text="Enter your information to Create an account" />
            <InputField
              handler={useCallback((e) => {
                setFirstName(e.target.value);
              }, [firstName])}
              type="text"
              name="firstName"
              placeholder="John"
              label="First Name"
            />
            <InputField
              handler={useCallback((e) => {
                setlastName(e.target.value);
              }, [lastName])}
              type="text"
              name="lastName"
              placeholder="Doe"
              label="Last Name"
            />
            <InputField
              handler={useCallback((e) => {
                setEmail(e.target.value);
              }, [email])}
              type="email"
              name="email"
              placeholder="JohnDoe@example.com"
              label="Email"
            />
            <InputField
              handler={useCallback((e) => {
                setPassword(e.target.value);
              }, [password])}
              type="password"
              name="password"
              placeholder=""
              label="Password"
              isRequired={true}
            />
            <SubmitButton text={"Sign up"} handler={(e) => sendData(e)} />
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
