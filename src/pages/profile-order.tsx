import React, { FC, useEffect } from "react";

import styles from "./profile-order.module.css";
import { OrderInfo } from "../components/order-info/order-info";
import { useSelector, useDispatch } from "../services/hooks";
import { useLocation } from "react-router-dom";
import { wsProfileConnectionStart, wsUserConnectionClosed } from "../services/actions/actionsWS";
import { OrderList } from "../components/order-list/order-list";


const ProfileOrder: FC = () => {
  const { userOrders } = useSelector(state => state.ws)
  const dispatch = useDispatch()
  const location = useLocation()
  useEffect(() => {
    if (location.pathname === '/profile/orders') {
      dispatch(wsProfileConnectionStart());
    } else {
      dispatch(wsUserConnectionClosed())
    }
  }, [])
  return (
    <div className={styles.content}>
      <OrderList link='profile/orders' orders={userOrders} />
    </div>
  );
};

export default ProfileOrder;