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
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "../protected-route/protected-route";

import { IngredientPage } from "../../pages";
import Preloader from "../preloader/preloader";
import { fetchIngredients } from "../../services/actions/actionsIngredient";
import { Feed } from "../../pages/feed";
import { OrderInfo } from "../order-info/order-info";


export const App: FC = () => {
  const dispatch = useDispatch();

  const { ingredientsRequest, loaded } = useSelector(
    (state) => state.ingredients
  );
  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);

  return (
    <div className={styles.page}>
      <AppHeader />
      {ingredientsRequest && <Preloader />}
      {!ingredientsRequest && loaded && (
        <Routes>
          <Route path="/feed" element={<Feed />} />
          <Route path="/feed/:id" element={<OrderInfo />} />
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
          {/*<Route path="/profile/orders" element={<ProfileOrders />} />*/}
          {/*<Route path="/profile/orders/:id" element={<ProfileOrderInfo />} />*/}
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
