import React, {FC} from 'react';
import styles from "./feed.module.css"
import { OrderList } from "../components/order-list/order-list";
import { OrderStatus } from "../components/order-status/order-status";

export const Feed: FC = ({children}) => {

  return (
    <section>
      <h2 className={`text text_type_main-large ${styles.header}`}>Лента заказов</h2>
        <div className={styles.main}>
          <OrderList link='feed'>{children}</OrderList>
          <OrderStatus/>
        </div>
    </section>
  )
}