import { useEffect } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const { removeToken } = useUser();

  useEffect(() => {
    removeToken();
    navigate("/login");
  }, []);

  return;
};

export default Logout;
