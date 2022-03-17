import React, {FC} from 'react';
import styles from "./order-status.module.css"

export const OrderStatus: FC = () => {

  return (
    <section className={styles.main}>
      <div className={styles.ordersIdContainer}>
        <div className={styles.listContainer}>
          <h3 className="text text_type_main-medium">Готовы:</h3>
          <div className={styles.ordersId}>
              <p className="text text_type_digits-default" style={{color: '#00CCCC'}} >elem</p>
          </div>
        </div>
        <div className={styles.listContainer}>
          <h3 className="text text_type_main-medium">В работе:</h3>
          <div className={styles.ordersId}>
              <p className="text text_type_digits-default" >elem</p>
          </div>
        </div>
      </div>
      <div className={styles.donesNum}>
        <h3 className="text text_type_main-medium">Выполнено за все время:</h3>
        <p className={`text text_type_digits-large ${styles.num}`}>total</p>
      </div>
      <div className={styles.donesNum}>
        <h3 className="text text_type_main-medium">Выполнено за сегодня:</h3>
        <p className={`text text_type_digits-large ${styles.num}`}>totalToday</p>
      </div>
    </section>
  )
}