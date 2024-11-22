import { lazy, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import ProfilePicture from "../components/ProfilePicture";
import Loader from "../components/Loader";
const InputField = lazy(() => import("../components/InputField"));
const CardHeading = lazy(() => import("../components/CardHeading"));

export default function SendMoney() {
  const [searchParams] = useSearchParams();
  const recipientUserId = searchParams.get("id");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastName] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!recipientUserId) return;
    axios
      .get(
        `http://localhost:3000/api/v1/user/recipient?id=${recipientUserId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        setFirstname(res.data.user.firstName);
        setLastName(res.data.user.lastName);
      });
  }, []);

  const initiateTransfter = async () => {
    setIsLoading(true)
    try {
      const paymentResponse = await axios.post(
        "http://localhost:3000/api/v1/account/transfer",
        {
          toAccount: recipientUserId,
          amount,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      await new Promise((resolve)=> setTimeout(resolve, 2000))
      console.log(paymentResponse)
      setIsLoading(false)
    } catch (e) {
      console.log("Failed processing the payment", e);
      setIsLoading(false)
    }

  };

  return (
    <>
      <div className="w-full h-screen grid place-items-center">
        <div className="shadow w-[90%] max-w-[500px] px-8 md:px-10 py-4 flex items-center flex-col self-center border-2  rounded-2xl bg-white">
          <CardHeading heading={"Send Money"} />
          <div className="w-full flex gap-4 my-3 items-center">
            <ProfilePicture text={`${firstName} ${lastName}`} />
            <b className="font-Inter text-lg">
              {firstName} {lastName}
            </b>
          </div>
          <form className="w-full">
            <div className="text-left font-medium text-lg">{"Amount (in Rs)"}</div>
            <input
              className="rounded-sm outline outline-1 w-full p-2 px-4 relative"
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
            className="w-full min-h-12 my-4 font-poppins font-bold text-xl py-2 bg-purple-700 hover:bg-purple-800  transition-colors text-white rounded-md tracking-wide"
          >
           {isLoading ? <Loader/> : "Proceed To Pay"}
          </button>
        </div>
      </div>
    </>
  );
}
