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
import {
  Routes,
  Route,
  useNavigate,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import { ProtectedRoute } from "../protected-route/protected-route";

import { IngredientPage } from "../../pages";
import Preloader from "../preloader/preloader";
import { fetchIngredients } from "../../services/actions/actionsIngredient";
import { Feed } from "../../pages";
import { OrderInfo } from "../order-info/order-info";
import ProfileOrders from "../../pages/profile-orders";
import ProfileOrder from "../../pages/profile-order";
import { infoOrderCloseAction } from "../../services/actions/actionsOrders";
import Modal from "../modal/modal";

export const App: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { ingredientsRequest, loaded } = useSelector(
    (state) => state.ingredients
  );
  const { orders } = useSelector((state) => state.ws);
  const { modalInfoOrderOpen } = useSelector((state) => state.orders);
  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);
  // @ts-ignore
  const background = location.state && location.state.background;

  const action = useNavigationType();

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
          <Route
            path="/profile/orders/:id"
            element={
              modalInfoOrderOpen && orders ? (
                <ProfileOrders>
                  <Modal
                    title=""
                    onClose={() => {
                      dispatch(infoOrderCloseAction());
                      navigate("/profile/orders");
                    }}
                  >
                    <OrderInfo />
                  </Modal>
                </ProfileOrders>
              ) : (
                <OrderInfo />
              )
            }
          />
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
// element={modalInfoOrderOpen && orders ?
//           {/*<Route path="/feed/:id"*/}
//           {/*       element={modalInfoOrderOpen && orders ?*/}
//           {/*         <Feed>*/}
//           {/*           <Modal title='' onClose={() => {*/}
//           {/*             dispatch(infoOrderCloseAction())*/}
//           {/*             navigate('/feed')*/}
//           {/*           }}>*/}
//           {/*             <OrderInfo/>*/}
//           {/*           </Modal>*/}
//           {/*         </Feed> : <OrderInfo/>*/}
//           {/*       }*/}
//           {/*
