import React, { FC } from "react";

import styles from "./profile-order-info.module.css";
import { OrderInfo } from "../components/order-info/order-info";

const ProfileOrder: FC = () => {

  return (
    <div className={styles.content}>
      <OrderInfo />
    </div>
  );
};

export default ProfileOrder;