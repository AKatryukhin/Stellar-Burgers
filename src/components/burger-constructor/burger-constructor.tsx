import React, { FC, useCallback, useMemo } from "react";
import styles from "./burger-constructor.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerConstructorList } from "../burger-constructor-list/burger-constructor-list";
import Modal from "../modal/modal";
import { OrderDetails } from "../order-details/order-details";
import { useSelector, useDispatch } from "../../services/hooks";
import bigIconPrice from "../../images/bigIconPrice.svg";
import Preloader from "../preloader/preloader";
  import {  useNavigate } from "react-router-dom";
import { fetchOrder, resetOrder } from "../../services/actions/actionsOrder";
import { clearIngredientsCount } from "../../services/actions/actionsIngredient";
import { clearSelectIngredientList } from "../../services/actions/actionsSelectIngredient";
import { IIngredientData } from "../../utils/common-types";

export const BurgerConstructor: FC = React.memo(() => {
  const dispatch = useDispatch();

  const orderIngredientsArr = useSelector((state) =>
    state.selectedIngredients.selectedIngredients.map((i) => i._id)
  );
  const { orderNumberRequest, orderNumberFailed, orderNumber } = useSelector(
    (state) => state.order
  );
  const token = useSelector((state) => state?.auth.accessToken);
  const navigate = useNavigate();

  const selectedIngredients = useSelector(
    (state) => state?.selectedIngredients.selectedIngredients
  );
  const bun: IIngredientData | undefined = useMemo(
    () => selectedIngredients.find((i) => i.type === "bun"),
    [selectedIngredients]
  );
  const otherIngredients = useMemo(
    () => selectedIngredients.filter((i: IIngredientData) => i.type !== "bun"),
    [selectedIngredients]
  );

  const totalPrice = useMemo<number>(() => {
    if (bun) {
      const bunSum: number = bun.price * 2;
      const otherIngredientsSum: number = otherIngredients.reduce(
        (acc: number, i) => acc + i.price,
        0
      );
      return bunSum + otherIngredientsSum;
    } else {
      return otherIngredients.reduce((acc, i) => acc + i.price, 0);
    }
  }, [otherIngredients, bun]);

  const handleClick = useCallback(() => {
    !token && navigate("/login", { replace: true });
    token && bun &&
      otherIngredients &&
      dispatch(fetchOrder(token, orderIngredientsArr));
  }, [token, otherIngredients]);

  const onClose = useCallback(() => {
    dispatch(clearSelectIngredientList());
    dispatch(clearIngredientsCount());
    dispatch(resetOrder());
  }, []);
  return (
    <section className={`${styles.section} pl-4`}>
      <div className={`${styles.listWrap} mb-10`}>
        <BurgerConstructorList bun={bun} otherIngredients={otherIngredients} />
        <div className={styles.orderWrap}>
        <span className={`${styles.iconWrap} mr-10`}>
          <p className="text text_type_digits-medium mr-2">{totalPrice}</p>
          <img src={bigIconPrice} alt="Иконка стоимости" />
        </span>
          <Button type="primary" size="medium" onClick={handleClick}>
            {orderNumberRequest
              ? "Отправка..."
              : orderNumberFailed
                ? "Что-то пошло не так :("
                : bun
                  ? "Оформить заказ"
                  : "Необходимо добавить булку!"}
          </Button>
        </div>
      </div>

      {orderNumberRequest && <Preloader />}
      {!orderNumberRequest && orderNumber && (
        <Modal onClose={onClose}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
});
