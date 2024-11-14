import CardHeading from "../components/CardHeading";
import { lazy } from "react";
const InputField =  lazy(()=> import("../components/InputField"))

export default function SendMoney() {
  return (
    <>
      <div className="w-full h-screen grid place-items-center">
        <div className="shadow w-[90%] max-w-[500px] px-8 md:px-10 py-4 flex items-center flex-col self-center border-2  rounded-2xl bg-white">
          <CardHeading heading={"Send Money"} />
          <form className="w-full">
            <InputField
              label={"Amount (in Rs)"}
              placeholder={"Enter Amount"}
              type={"number"}
              name={"amount"}
              isRequired={true}
            />
          </form>
          <button
            text={"Initiate Transfer"}
            className="w-full my-4 font-Inter font-bold text-2xl py-2 bg-green-500 hover:bg-green-600 transition-colors text-white rounded-md tracking-wide"
          >
            Initiate Transfer
          </button>
        </div>
      </div>
    </>
  );
}
