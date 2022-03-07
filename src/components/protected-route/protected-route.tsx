import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { ProtectedRouteProps } from "./protected-route.props";
import React, { FC } from "react";

export const ProtectedRoute: FC<ProtectedRouteProps> = React.memo(({children}) => {
  const location = useLocation();
  // @ts-ignore
  const token = useSelector(state => state?.auth.accessToken) // state пока не типизируем
  return !token ? <Navigate to="/login" state={{ from: location.pathname }} replace/> : children;
});


