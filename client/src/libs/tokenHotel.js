import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const getToken = () => {
  const token = localStorage.getItem("token");
  // console.log(token);
  if (!token) {
    return null;
  }
  try {
    const payload = jwtDecode(token);
    return payload;
  } catch (error) {
    console.error(`Token decode error: ${error}`);
    return null;
  }
};

export const useLogout = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return logout;
};
