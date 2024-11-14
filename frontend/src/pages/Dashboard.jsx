import { useEffect, useState } from "react";
import Appbar from "../components/Appbar.jsx";
import BalanceDetails from "../components/BalanceDetails.jsx";
import Users from "../components/Users.jsx";
import axios from "axios";

const Dashboard = () => {
  const [userDetails, setUserDetails] = useState({});
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/user/profile",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      )
      .then((response) => setUserDetails(response.data.user))
      .catch(err => console.log(err));
  }, []);
  return (
    <div className="h-screen overflow-y-scroll">
      <Appbar  userFullname={`${userDetails?.firstName} ${userDetails?.lastName}`}/>
      <div className="w-[95vw] sm:w-full mt-4 px-2 md:px-8 m-auto">
        <BalanceDetails />
        <Users />
      </div>
    </div>
  );
};

export default Dashboard;
