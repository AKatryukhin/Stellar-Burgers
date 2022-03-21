import React, { FC, useEffect } from "react";
import styles from "./feed.module.css";
import { OrderList } from "../components/order-list/order-list";
import { OrderStatus } from "../components/order-status/order-status";
import { useSelector, useDispatch } from "../services/hooks";
import { useLocation } from "react-router-dom";
import {
  wsConnectionClosed,
  wsConnectionStart,
} from "../services/actions/actionsWS";

export const Feed: FC = () => {
  const { orders, wsConnected } = useSelector((state) => state.ws);
  console.log(orders)
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    if (location.pathname === "/feed") {
      dispatch(wsConnectionStart());
    } else {
      dispatch(wsConnectionClosed());
    }
  }, []);
  return (
    <section>
      <h2 className={`text text_type_main-large ${styles.header}`}>
        Лента заказов
      </h2>
      {!wsConnected && "Произошла ошибка"}
      {wsConnected && orders.length && (
        <div className={styles.main}>
          <OrderList link="feed" orders={orders} />
          <OrderStatus />
        </div>
      )}
    </section>
  );
};
