import React, { useCallback, useEffect } from "react";
import styles from "./app.module.css";
import { AppHeader } from "../app-header/app-header";
import {
  GET_INGREDIENTS_REQUEST,
  GET_USER_INFO_REQUEST,
  REMOVE_CURRENT_INGREDIENT,
  RESET_INGREDIENTS,
  RESET_ITEM_TO_VIEW,
} from "../../services/actions/types";
import { useDispatch, useSelector } from "react-redux";
import Main from "../main/main";
import {
  Register,
  Login,
  NotFound,
  Profile,
  ForgotPassword,
  ResetPassword,
  Ingredient,
} from "../../pages";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
  useNavigationType,
} from "react-router-dom";
import { ProtectedRoute } from "../protected-route/protected-route";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import { IngredientPage } from "../../pages/ingredient-page";

export const App = () => {
  const dispatch = useDispatch();

  const currentIngredient = useSelector(
    (state) => state?.currentIngredient.ingredient
  );
  const ingredientsFailed = useSelector(
    (state) => state?.ingredients.ingredientsFailed
  );
  useEffect(() => {
    dispatch({ type: GET_INGREDIENTS_REQUEST });
  }, []);

  const ModalSwitch = () => {
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location);
    console.log(useLocation().state);
    console.log(navigate);
    const action = useNavigationType();
    console.log(action);
    const background = location.state && location.state.background;
    console.log(background);
    const handleModalClose = useCallback(() => {
      dispatch({ type: REMOVE_CURRENT_INGREDIENT });
      ingredientsFailed && dispatch({ type: RESET_INGREDIENTS });
      navigate(-1);
    }, [currentIngredient, ingredientsFailed]);

    return (
      <div className={styles.page}>
        <AppHeader />
        <Routes location={background || location}>
          <Route path="/" element={<Main />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route
            path="/profile/*"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="*" element={<NotFound />} />
          {background && action === "PUSH" && (
            <Route
              path="/ingredients/:ingredientId"
              element={
                <Modal onClose={handleModalClose} title="Детали ингредиента">
                  <IngredientDetails currentIngredient={currentIngredient} />
                </Modal>
              }
            />
          )}
          {!background && (
            <Route
              path="/ingredients/:ingredientId"
              element={
                <IngredientDetails currentIngredient={currentIngredient} />
              }
            />
          )}
        </Routes>
        {/*{background && (*/}
        {/*  <ProtectedRoute*/}
        {/*    path='/profile/orders/:orderNumber'*/}
        {/*    children={*/}
        {/*      <Modal onClose={handleModalClose}>*/}
        {/*        <IngredientPage />*/}
        {/*      </Modal>*/}
        {/*    }*/}
        {/*  />*/}
        {/*)}*/}
      </div>
    );
  };

  return <ModalSwitch />;
};
