import { useEffect } from "react";
import { replace, useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  useEffect(()=> {
    const isUserSigned = checkUserStatus();
    isUserSigned ? navigate("/dashboard", replace) : navigate("/signup", replace);
  }, [])

};

function checkUserStatus() {
  return localStorage.getItem("token");
}

export default LandingPage;
