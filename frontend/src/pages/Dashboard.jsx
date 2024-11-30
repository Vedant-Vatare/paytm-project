import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashBoardHeader from "../components/DashBoardHeader.jsx";
import BalanceDetails from "../components/BalanceDetails.jsx";

import axios from "axios";
const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const Dashboard = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const isToken = localStorage.getItem("token");
    !isToken && navigate("/signin", { replace: true });
    axios
      .get(`${BACKEND_BASE_URL}/user/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => setUserDetails(response.data.user))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="dark h-screen bg-primary-dark-900">
      <DashBoardHeader />
      <div className="bg-primary-dark-900 dark:text-primary-white-text w-[95vw] sm:w-full px-2 md:px-8 m-auto mt-10">
        <BalanceDetails />
      </div>
    </div>
  );
};

export default Dashboard;
