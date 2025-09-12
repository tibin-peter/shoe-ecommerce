import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("currentUser");
    navigate("/");
  }, [navigate]);

  return null;
};

export default Logout;
