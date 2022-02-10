import React, { useCallback, useMemo } from "react";
import styles from "./burger-constructor.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerConstructorList } from "../burger-constructor-list/burger-constructor-list";
import Modal from "../modal/modal";
import { OrderDetails } from "../order-details/order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  CLEAR_INGREDIENT_LIST_COUNT,
  CLEAR_SELECTED_INGREDIENT_LIST,
  GET_ORDER_REQUEST,
  RESET_ORDER_NUMBER,
} from "../../services/actions/types";
import bigIconPrice from "../../images/bigIconPrice.svg";
import Preloader from "../preloader/preloader";
import { useNavigate } from "react-router-dom";

export const BurgerConstructor = React.memo(() => {
  const dispatch = useDispatch();
  const orderIngredientsArr = useSelector((state) =>
    state?.selectedIngredients.selectedIngredients.map((i) => i._id)
  );
  const { orderRequest, orderFailed, orderNumber } = useSelector(
    (state) => state?.order
  );
  const token = useSelector((state) => state?.auth.accessToken);
  const navigate = useNavigate();

  const selectedIngredients = useSelector(
    (state) => state?.selectedIngredients.selectedIngredients
  );
  const bun = useMemo(
    () => selectedIngredients.find((i) => i.type === "bun"),
    [selectedIngredients]
  );
  const otherIngredients = useMemo(
    () => selectedIngredients.filter((i) => i.type !== "bun"),
    [selectedIngredients]
  );

  const totalPrice = useMemo(() => {
    if (bun) {
      const bunSum = bun.price * 2;
      const otherIngredientsSum = otherIngredients.reduce(
        (acc, i) => acc + i.price,
        0
      );
      return bunSum + otherIngredientsSum;
    } else {
      return otherIngredients.reduce((acc, i) => acc + i.price, 0);
    }
  }, [otherIngredients, bun]);

  const handleClick = () => {
    !token && navigate("/login", { replace: true });
    bun &&
      otherIngredients &&
      dispatch({ type: GET_ORDER_REQUEST, payload: orderIngredientsArr });
  };

  const onClose = useCallback(() => {
    dispatch({ type: CLEAR_SELECTED_INGREDIENT_LIST });
    dispatch({ type: CLEAR_INGREDIENT_LIST_COUNT });
    dispatch({ type: RESET_ORDER_NUMBER });
  }, [dispatch]);
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
          {orderRequest
            ? "Отправка..."
            : orderFailed
            ? "Что-то пошло не так :("
            : bun
            ? "Оформить заказ"
            : "Необходимо добавить булку!"}
        </Button>
      </div>
      {orderRequest && <Preloader />}
      {!orderRequest && orderNumber && (
        <Modal onClose={onClose}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
});
