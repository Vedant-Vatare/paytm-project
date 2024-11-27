import axios from "axios";
import { memo, useEffect, useState } from "react";
const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL
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
      <div className="text-xl font-medium font-opensans text-right">
        Your balance: Rs. {balance}
      </div>
    </>
  );
});

export default BalanceDetails;
