import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";


export const ProtectedRoute = ({ children }) => {
  const token = useSelector(state => state?.auth.accessToken)
  return !token ? <Navigate to="/login" replace /> : children;
};

