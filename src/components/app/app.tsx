import React, { FC, useEffect } from "react";
import styles from "./app.module.css";
import { AppHeader } from "../app-header/app-header";
import { useSelector, useDispatch } from "../../services/hooks";
import Main from "../main/main";
import {
  Register,
  Login,
  NotFound,
  Profile,
  ForgotPassword,
  ResetPassword,
} from "../../pages";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { ProtectedRoute } from "../protected-route/protected-route";

import { IngredientPage } from "../../pages";
import Preloader from "../preloader/preloader";
import { fetchIngredients } from "../../services/actions/actionsIngredient";
import { Feed } from "../../pages";
import { OrderInfo } from "../order-info/order-info";
import ProfileOrders from "../../pages/profile-orders";
import { infoOrderCloseAction } from "../../services/actions/actionsOrders";
import Modal from "../modal/modal";

export const App: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { ingredientsRequest, loaded } = useSelector(
    (state) => state.ingredients
  );

  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);
  // @ts-ignore
  const background = location.state && location.state.background;

  return (
    <div className={styles.page}>
      <AppHeader />
      {ingredientsRequest && <Preloader />}
      {!ingredientsRequest && loaded && (
        <Routes>
          <Route path="/feed" element={<Feed />} />

          {background ? (
            <Route
              path="/feed/:id"
              element={
                <Modal
                  title=""
                  onClose={() => {
                    dispatch(infoOrderCloseAction());
                    navigate("/feed");
                  }}
                >
                  <OrderInfo />
                </Modal>
              }
            />
          ) : (
            <Route path="/feed/:id" element={<OrderInfo />} />
          )}
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
          <Route
            path="/profile/orders"
            element={
              <ProtectedRoute>
                <ProfileOrders />
              </ProtectedRoute>
            }
          />
          {background ? (
            <Route
              path="/profile/orders/:id"
              element={
                <Modal
                  title=""
                  onClose={() => {
                    dispatch(infoOrderCloseAction());
                    navigate("/profile/orders");
                  }}
                >
                  <OrderInfo />
                </Modal>
              }
            />
          ) : (
            <Route path="/profile/orders/:id" element={<OrderInfo />} />
          )}
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="*" element={<NotFound />} />
          <Route
            path="/ingredients/:ingredientId"
            element={<IngredientPage />}
          />
        </Routes>
      )}
    </div>
  );
};
