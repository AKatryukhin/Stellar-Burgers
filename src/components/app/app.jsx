import React, { useEffect } from "react";
import styles from "./app.module.css";
import { AppHeader } from "../app-header/app-header";
import { GET_INGREDIENTS_REQUEST, GET_USER_INFO_REQUEST } from "../../services/actions/types";
import { useDispatch, useSelector } from "react-redux";
import Main from "../main/main";
import { Register, Login, NotFound, Profile, ForgotPassword, ResetPassword, Ingredient } from "../../pages";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "../protected-route/protected-route";

export const App = () => {
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch({ type: GET_INGREDIENTS_REQUEST });
  }, []);


  return (
    <div className={styles.page}>
      <AppHeader />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="/profile/*" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }/>
        <Route path="*" element={<NotFound />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="ingredients/:id" element={<Ingredient />} />
      </Routes>
    </div>
  );
};

