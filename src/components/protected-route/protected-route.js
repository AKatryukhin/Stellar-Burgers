import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";


export const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const token = useSelector(state => state?.auth.accessToken)
  console.log(location.pathname)
  return !token ? <Navigate to="/login" state={{ from: location.pathname } } replace/> : children;
};


