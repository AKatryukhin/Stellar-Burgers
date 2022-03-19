import React, { FC } from "react";
import styles from "../order-info/order-info.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export const OrderIngredient: FC = () => {
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