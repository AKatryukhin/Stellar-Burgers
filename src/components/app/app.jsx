import React, { useEffect } from "react";
import styles from "./app.module.css";
import { AppHeader } from "../app-header/app-header";
import { GET_INGREDIENTS_REQUEST, GET_USER_INFO_REQUEST, RESET_ITEM_TO_VIEW } from "../../services/actions/types";
import { useDispatch, useSelector } from "react-redux";
import Main from "../main/main";
import { Register, Login, NotFound, Profile, ForgotPassword, ResetPassword, Ingredient } from "../../pages";
import { Routes, Route, useLocation, useNavigate, Router } from "react-router-dom";
import { ProtectedRoute } from "../protected-route/protected-route";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import { IngredientPage } from "../../pages/ingredient-page";

export const App = () => {
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch({ type: GET_INGREDIENTS_REQUEST });
  }, []);

  const ModalSwitch = () => {
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location)
    console.log(location.state)
    console.log(navigate)
    let background = location.state && location.state.background;

    const handleModalClose = () => {
      dispatch({
        type: RESET_ITEM_TO_VIEW,
      });
      navigate(-1);
    };


  return (
    <div className={styles.page}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<Main />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="/profile/*" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }/>
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
        {/*<Route path="ingredients/:id" element={<Ingredient />} />*/}
        <Route path='/ingredients/:ingredientId' element={<IngredientDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {background && (
        <Route
          path='/ingredients/:ingredientId'
          children={
            <Modal onClose={handleModalClose}>
              <IngredientDetails />
            </Modal>
          }
        />
      )}
      {background && (
        <ProtectedRoute
          path='/profile/orders/:orderNumber'
          children={
            <Modal onClose={handleModalClose}>
              <IngredientPage />
            </Modal>
          }
        />
      )}
    </div>
  );
  };

  return (
      <ModalSwitch />
  );
}

