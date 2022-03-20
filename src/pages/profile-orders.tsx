import React, { FC, useEffect } from "react";
import { useSelector, useDispatch } from "../services/hooks";

import styles from "./profile-orders.module.css";
import ProfileNav from "../components/profile-nav/profile-nav";
import { OrderList } from "../components/order-list/order-list";
import { useLocation } from "react-router-dom";
import { wsProfileConnectionStart, wsUserConnectionClosed } from "../services/actions/actionsWS";

const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation()
  const { userOrders } = useSelector(state => state.ws)
  useEffect(() => {
    if (location.pathname === '/profile/orders') {
      dispatch(wsProfileConnectionStart());
    } else {
      dispatch(wsUserConnectionClosed())
    }
  }, [])
  console.log(userOrders)
  return (
    <section className={styles.profile}>
      <div style={{ marginTop: "80px" }}>
        <ProfileNav />
      </div>
      <OrderList
     link="/profile/orders/" orders={userOrders}
      />
    </section>
  );
};

export default ProfileOrders;