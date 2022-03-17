import React, {FC} from "react";
import styles from "./order-info.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";


export const OrderInfo: FC = () => {

  const OrderIngredient: FC = () => {
    return (
      <div className={styles.ingredientDesc}>
        <img src='' alt='' className={styles.image}/>
        <p className={`text text_type_main-default ${styles.ingredientName}`}>name</p>
        <div className={styles.finalPrice}>
          <p className="text text_type_digits-default">price</p>
          <CurrencyIcon type="primary"/>
        </div>
      </div>
    )
  }
  return (
    <>
        <div className={styles.main}>
          <p className={`text text_type_digits-default ${styles.number}`}>number</p>
          <h3 className={`text text_type_main-medium ${styles.name}`}>name</h3>
          <p className={`text text_type_main-default ${styles.status}`}>status</p>
          <p className={`text text_type_main-medium ${styles.consist}`}>Состав:</p>
          <div className={styles.ingredientContainer}>
              <OrderIngredient/>
          </div>
          <div className={styles.info}>
            <p className={`text text_type_main-default text_color_inactive ${styles.time}`}>time</p>
            <div className={styles.finalPrice}>
              <p className="text text_type_digits-default">
                Price
              </p>
              <CurrencyIcon type="primary"/>
            </div>
          </div>
        </div>
    </>
  )
}