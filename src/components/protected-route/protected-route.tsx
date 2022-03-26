import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "../../services/hooks";
import { ProtectedRouteProps } from "./protected-route.props";
import React, { FC } from "react";

export const ProtectedRoute: FC<ProtectedRouteProps> = React.memo(({children}) => {
  const location = useLocation();
  const token = useSelector(state => state?.auth.accessToken);
  return !token ? <Navigate to="/login" state={{ from: location.pathname }} replace/> : children;
});


