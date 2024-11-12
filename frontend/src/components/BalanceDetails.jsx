import axios from "axios";
import { useEffect, useState } from "react";

const BalanceDetails = () => {
  const [balance, setbalance] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/account/balance", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => setbalance(response.data.balance))
      .catch((e) => console.log(e));
  }, []);
  return (
    <>
      <div className="text-xl font-medium font-opensans">
        Your balance: Rs. {balance}
      </div>
    </>
  );
};

export default BalanceDetails;
