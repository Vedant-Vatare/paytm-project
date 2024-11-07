import React from "react";
import CardHeading from "../components/CardHeading"
import InputField from "../components/InputField"
import SectionText from "../components/SectionText"
import SubmitButton from "../components/SubmitButton";
import RedirectText from "../components/RedirectText";
function Signup() {
  return (
    <div className="w-full h-[100vh] flex items-center justify-center bg-slate-200">
      <div className="shadow w-[90%] max-w-[500px] px-8 md:px-10 py-4 flex items-center flex-col self-center border-2  rounded-2xl bg-white">
        <CardHeading heading="Welcome to payTM"/>
        <form className="w-full">
          <SectionText text="Enter your information to Create an account"/>
          <InputField type="text" name="firstName" placeholder="John" label="First Name"/>
          <InputField type="text" name="lastName" placeholder="Doe" label="Last Name"/>
          <InputField type="email" name="email" placeholder="JohnDoe@example.com" label="Email"/>
          <InputField type="password" name="password" placeholder="" label="Password" isRequired={true}/>
          <SubmitButton text="Sign up"/>
        </form>
        <RedirectText text={"Already have an account?"} buttonText={"login"} to={"/signin"}/>
      </div>
    </div>
  )
}

export default Signup;