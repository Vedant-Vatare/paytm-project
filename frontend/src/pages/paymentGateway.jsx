import { lazy, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import ProfilePicture from "../components/ProfilePicture";
import Loader from "../components/ui/Loader";
import ErrorModal from "../components/ErrorModal";
const InputField = lazy(() => import("../components/InputField"));
const CardHeading = lazy(() => import("../components/CardHeading"));

export default function SendMoney() {
  const [searchParams] = useSearchParams();
  const recipientUserId = searchParams.get("id");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastName] = useState("");
  const [upiId, setUpiId] = useState("9156863486@ibl");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
  const [Error, setError] = useState(null);
  useEffect(() => {
    axios
      .get(`${BACKEND_BASE_URL}/user/recipient?id=${recipientUserId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setFirstname(res.data.user.firstName);
        setLastName(res.data.user.lastName);
      })
      .catch((e) => {
        setError(e.response || e);
      });
  }, []);

  const initiateTransfter = async () => {
    setIsLoading(true);
    try {
      const paymentResponse = await axios.post(
        `${BACKEND_BASE_URL}/account/transfer`,
        {
          toAccount: recipientUserId,
          amount,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(paymentResponse);
      setIsLoading(false);
    } catch (e) {
      setError(e.response || e);
      console.log("Failed processing the payment", e);
      setIsLoading(false);
    }
  };
  return (
    <>
      {Error && (
        <ErrorModal errorMessage={Error.message} status={Error.status} />
      )}
      <div className="dark dark:text-primary-white-text w-full h-screen grid place-items-center bg-primary-black-100">
        <div className="shadow w-[90%] max-w-[500px] px-8 md:px-10 py-4 flex items-center flex-col self-center  rounded-2xl bg-primary-dark-900">
          <CardHeading heading={"Send Money"} />
          <div className="w-full flex gap-4 my-5 items-center">
            <ProfilePicture text={`${firstName} ${lastName}`} />
            <div className="flex flex-col">
              <span className="dark:text-primary-white-text font-poppins text-lg font-semibold">
                {firstName} {lastName}
              </span>
              <span className="dark:text-primary-white-text font-Inter opacity-65 ">
                {upiId}
              </span>
            </div>
          </div>
          <form className="w-full flex flex-col gap-2">
            <div className="dark:text-primary-white-text text-left font-medium text-lg">
              {"Amount (in Rs)"}
            </div>
            <input
              className="dark:bg-primary-black-100 dark:text-white outline outline-primary-black-100 group rounded-md  w-full p-4 relative focus:outline-none  focus:ring-2 focus:ring-blue-600"
              type={"number"}
              name={"amount"}
              onInput={(e) => setAmount(Number(e.target.value))}
              placeholder={"Enter Amount"}
              required={true}
              min={1}
            />
            <InputField
              label={""}
              placeholder={"Add a note (optional)"}
              type={"text"}
              name={"note"}
              isRequired={false}
              handler={(e) => setNote(e.target.value)}
            />
          </form>
          <button
            onClick={initiateTransfter}
            text={"Initiate Transfer"}
            className="w-full min-h-12 my-4 font-Inter font-bold text-2xl py-2 
      bg-primary-brand-color hover:bg-indigo-700 transition-colors text-white  rounded-md tracking-wide"
          >
            {isLoading ? <Loader /> : "Proceed To Pay"}
          </button>
        </div>
      </div>
    </>
  );
}
