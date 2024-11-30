import axios from "axios";
import { memo, useEffect, useState } from "react";
const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
const BalanceDetails = memo(() => {
  const [balance, setbalance] = useState();
  useEffect(() => {
    axios
      .get(`${BACKEND_BASE_URL}/account/balance`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => setbalance(response.data.balance))
      .catch((e) => console.log(e));
  }, []);
  return (
    <>
      <div
        style={{
          background: `linear-gradient(to right, hsl(220, 7%,13%),hsl(225, 6%, 10%))`,
        }}
        className="text-base font-Inter my-5 bg-primary-black-100 rounded-md w-max p-6 py-4"
      >
        <span className="">
          Account Balance
          <span className="font-semibold block font-poppins text-lg tracking-wide">
            Rs.{balance?.toLocaleString("en-IN")}
          </span>
        </span>
      </div>
    </>
  );
});

export default BalanceDetails;
