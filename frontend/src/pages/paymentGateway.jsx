import { lazy, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios, { Axios } from "axios";
import ProfilePicture from "../components/ProfilePicture";
const InputField = lazy(() => import("../components/InputField"));
const CardHeading = lazy(() => import("../components/CardHeading"));

export default function SendMoney() {
  const [searchParams] = useSearchParams();
  const recipientUserId = searchParams.get("id");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastName] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (!recipientUserId) return;
    axios
      .get(
        `http://localhost:3000/api/v1/user/recipient-details?id=${recipientUserId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        console.log(res.data);
        setFirstname(res.data.user.firstName);
        setLastName(res.data.user.lastName);
      });
  }, []);

  const initiateTransfter = async () => {
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
    } catch (e) {
      console.log("Failed processing the payment", e);
    }
    console.log(paymentResponse);
  };

  return (
    <>
      <div className="w-full h-screen grid place-items-center">
        <div className="shadow w-[90%] max-w-[500px] px-8 md:px-10 py-4 flex items-center flex-col self-center border-2  rounded-2xl bg-white">
          <CardHeading heading={"Send Money"} />
          <div className="w-full flex gap-4 items-center">
            <ProfilePicture text={`${firstName} ${lastName}`} />
            <b className="font-Inter text-lg">
              {firstName} {lastName}
            </b>
          </div>
          <form className="w-full">
            <InputField
              label={"Amount (in Rs)"}
              placeholder={"Enter Amount"}
              type={"number"}
              name={"amount"}
              isRequired={true}
              handler={(e) => setAmount(e.target.value)}
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
            className="w-full my-4 font-poppins font-bold text-xl py-2 bg-purple-700 hover:bg-purple-800  transition-colors text-white rounded-md tracking-wide"
          >
            PROCEED TO PAY
          </button>
        </div>
      </div>
    </>
  );
}
