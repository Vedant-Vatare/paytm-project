import { useState } from "react";
import platformLogo from "../public/upi.svg";
import SubmitButton from "../components/SubmitButton";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const Resetpassword = ()=> {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [wrongPassAlert, setWrongPassAlert] = useState(false);
  const [searchParams]  = useSearchParams()

  async function handleFormSubmit() {
    if (password !== confirmPassword) {
      setWrongPassAlert(true)
      return;
    }
    
    setWrongPassAlert(false)
    const token = searchParams.get("token")
    console.log(token)
    try {

      const response = axios.post(`http://localhost:3000/api/v1/user/reset-password/?token=${token}`,{
        password
      })
      console.log(response.data);
    } catch(e){
      console.log(e);;
    }

  }
  return (
    <div className="w-full min-h-screen flex flex-col gap-4  items-center  bg-gray-950 relative pt-14">
      <div className="bg-white rounded-full aspect-square grid place-items-center">
        <img
          src={platformLogo}
          className="h-10 object-cover"
          alt="UPI App Logo"
        />
      </div>
      <h2 className="w-full py-4  text-center text-2xl font-extralight font-poppins text-white">
        Reset Your Password
      </h2>
      <div className=" w-[90%] max-w-[560px] px-8 md:px-10 py-4 flex items-center flex-col outline outline-gray-700 outline-1  rounded-2xl bg-[#151b23] text-white">
      <div className="my-2 font-poppins text-left font-medium text-lg text self-start">Enter new password</div>
        <input
          className="w-full p-3 px-5 bg-[#151b23] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          type="password"
          name="password"
          required
          placeholder="Enter password"
          onInput={(e) => setPassword(e.target.value)}
        />
      <div className="my-2 mt-5 font-poppins text-left font-medium text-lg text self-start">Confirm password</div>
        <input
          className="w-full p-3 px-5 mb-3 bg-[#151b23] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          type="password"
          name="password"
          required
          placeholder="confirm password"
          onInput={(e) => setConfirmPassword(e.target.value)}
        />
        {wrongPassAlert && (<div className="text-lg font-bold text-red-500 font-Inter">Passwords do not match </div>)}
        <SubmitButton text={"Submit"} handler={handleFormSubmit} />
      </div>
    </div>
  );
}

export default Resetpassword;