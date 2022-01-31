import React, { useEffect, useMemo } from "react";
import styles from "./burger-constructor.module.css";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerConstructorList } from "../burger-constructor-list/burger-constructor-list";
import Modal from "../modal/modal";
import { OrderDetails } from "../order-details/order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  OPEN_ORDER_MODAL,
  SET_TOTAL_PRICE,
} from "../../services/actions/types";
import bigIconPrice from '../../images/bigIconPrice.svg';

export const BurgerConstructor = React.memo(() => {
  const dispatch = useDispatch();

  const handleClick = () =>
    bun && otherIngredients && dispatch({ type: OPEN_ORDER_MODAL });

  const selectedIngredients = useSelector(
    (state) => state?.selectedIngredients.selectedIngredients
  );
  const isOpen = useSelector((state) => state?.modal.isOrderModalOpen);
  const bun = useMemo(
    () => selectedIngredients.find((i) => i.type === "bun"),
    [selectedIngredients]
  );
  const otherIngredients = useMemo(
    () => selectedIngredients.filter((i) => i.type !== "bun"),
    [selectedIngredients]
  );
  const totalPrice = useSelector(
    (state) => state?.selectedIngredients.totalPrice
  );

  useEffect(() => {
    if (bun) {
      const totalSum = (() => {
        const bunSum = bun.price * 2;
        const otherIngredientsSum = otherIngredients.reduce(
          (acc, i) => acc + i.price,
          0
        );
        return bunSum + otherIngredientsSum;
      })();
      dispatch({ type: SET_TOTAL_PRICE, payload: totalSum });
    } else {
      const totalSum = otherIngredients.reduce((acc, i) => acc + i.price, 0);
      dispatch({ type: SET_TOTAL_PRICE, payload: totalSum });
    }
  }, [bun, otherIngredients, dispatch]);

  return (
    <section className={`${styles.section} pl-4`}>
      <div className={`${styles.listWrap} mb-10`}>
        <BurgerConstructorList bun={bun} otherIngredients={otherIngredients} />
      </div>
      <div className={styles.orderWrap}>
        <span className={`${styles.iconWrap} mr-10`}>
          <p className="text text_type_digits-medium mr-2">{totalPrice}</p>
          <img src={bigIconPrice} alt="Иконка стоимости" />
        </span>
        <Button type="primary" size="medium" onClick={handleClick}>
          Оформить заказ
        </Button>
      </div>
      {isOpen && (
        <Modal>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
});
