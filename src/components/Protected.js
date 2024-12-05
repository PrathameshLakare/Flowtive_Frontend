import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    return <Navigate to="/" />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);

    if (decodedToken.exp < currentTime) {
      localStorage.removeItem("adminToken");
      return <Navigate to="/" />;
    }
  } catch (error) {
    localStorage.removeItem("adminToken");
    return <Navigate to="/" />;
  }

  return children;
};

export default Protected;
