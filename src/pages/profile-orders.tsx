import React, { FC, useEffect } from "react";
import { useSelector, useDispatch } from "../services/hooks";

import styles from "./profile-orders.module.css";
import ProfileNav from "../components/profile-nav/profile-nav";
import { OrderList } from "../components/order-list/order-list";

const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  return (
    <section className={styles.profile}>
      <div style={{ marginTop: "80px" }}>
        <ProfileNav />
      </div>
      <OrderList
     link="/profile/orders/"
      />
    </section>
  );
};

export default ProfileOrders;