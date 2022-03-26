import React, {FC} from 'react';
import styles from "./order-status.module.css"
import { useSelector } from "../../services/hooks";
import { IOrders } from "../../services/types/data-types";

export const OrderStatus: FC = () => {
  const { orders, total, totalToday } = useSelector(state => state.ws)
  let done: number[] = []
  let a: number[] = []
  orders.forEach((o: IOrders) => {
    if (o.status !== 'done') {
      a.push(o.number)
    } else if (o.status === 'done') {
      done.push(o.number)
    }
  })
  return (
    <section className={styles.main}>
      <div className={styles.ordersIdContainer}>
        <div className={styles.listContainer}>
          <h3 className="text text_type_main-medium">Готовы:</h3>
          <div className={styles.ordersId}>
            {done.map((elem: number, index: number) => (
              <p className="text text_type_digits-default" style={{color: '#00CCCC'}} key={index}>{elem}</p>
            ))}
          </div>
        </div>
        <div className={styles.listContainer}>
          <h3 className="text text_type_main-medium">В работе:</h3>
          <div className={styles.ordersId}>
            {a.map((elem: number, index: number) => (
              <p className="text text_type_digits-default" key={index}>{elem}</p>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.donesNum}>
        <h3 className="text text_type_main-medium">Выполнено за все время:</h3>
        <p className={`text text_type_digits-large ${styles.num}`}>{total}</p>
      </div>
      <div className={styles.donesNum}>
        <h3 className="text text_type_main-medium">Выполнено за сегодня:</h3>
        <p className={`text text_type_digits-large ${styles.num}`}>{totalToday}</p>
      </div>
    </section>
  )
}