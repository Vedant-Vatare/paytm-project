import CardHeading from "../components/CardHeading";
import InputField from "../components/InputField";
import SubmitButton from "../components/SubmitButton";
import User from "../components/Users";

export default function SendMoney() {
  return (
    <>
      <div className="w-full h-screen grid place-items-center">
        <div className="shadow w-[90%] max-w-[500px] px-8 md:px-10 py-4 flex items-center flex-col self-center border-2  rounded-2xl bg-white">
          <CardHeading heading={"Send Money"}/>
          <User name="User 1"/>
          <form  className="w-full">
            <InputField label={"Amount (in Rs)"} placeholder={"Enter Amount"} type={"number"} name={"amount"} isRequired={true} />
          </form>
          <SubmitButton  text={"Initiate Transfer"} bgColor="bg-green-500"/>
        </div>
      </div>
    </>
  )
}