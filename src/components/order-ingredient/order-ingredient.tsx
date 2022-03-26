import React, { FC } from "react";
import styles from "../order-ingredient/order-ingredient.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { OrderIngredientProps } from "./order-ingredient-props";

export const OrderIngredient: FC<OrderIngredientProps> = ({counting, elem}) => {
  return (
    <div className={`${styles.ingredientDesc} custom-scroll p-4`}>
      <div className={styles.descWrap}>
      <img src={elem.image} alt={elem.name} className={styles.image}/>
      <p className={`text text_type_main-default ${styles.ingredientName}`}>{elem.name}</p>
      </div>
      <div className={styles.finalPrice}>
        <p className="text text_type_digits-default"> {counting(elem)} x {elem.price}</p>
        <CurrencyIcon type="primary"/>
      </div>
    </div>
  )
}