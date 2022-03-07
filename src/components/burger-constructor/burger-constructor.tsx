import React, { FC, useCallback, useMemo } from "react";
import styles from "./burger-constructor.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerConstructorList } from "../burger-constructor-list/burger-constructor-list";
import Modal from "../modal/modal";
import { OrderDetails } from "../order-details/order-details";
import { useDispatch, useSelector } from "react-redux";
import bigIconPrice from "../../images/bigIconPrice.svg";
import Preloader from "../preloader/preloader";
  import {  useNavigate } from "react-router-dom";
import { fetchOrder, resetOrder } from "../../services/actions/actionsOrder";
import { clearIngredientsCount } from "../../services/actions/actionsIngredient";
import { clearSelectIngredientList } from "../../services/actions/actionsSelectIngredient";
import { IIngredientData } from "../../utils/types";

export const BurgerConstructor: FC = React.memo(() => {
  const dispatch = useDispatch();

  const orderIngredientsArr: Array<IIngredientData> = useSelector((state) =>
    // @ts-ignore
    state?.selectedIngredients.selectedIngredients.map((i) => i._id)
  );
  const { orderRequest, orderFailed, orderNumber } = useSelector(
    // @ts-ignore
    (state) => state?.order
  );
  // @ts-ignore
  const token = useSelector((state) => state?.auth.accessToken);
  const navigate = useNavigate();

  const selectedIngredients: Array<IIngredientData> = useSelector(
    // @ts-ignore
    (state) => state?.selectedIngredients.selectedIngredients
  );
  const bun: IIngredientData | undefined = useMemo(
    () => selectedIngredients.find((i: IIngredientData) => i.type === "bun"),
    [selectedIngredients]
  );
  const otherIngredients = useMemo<Array<IIngredientData>>(
    () => selectedIngredients.filter((i: IIngredientData) => i.type !== "bun"),
    [selectedIngredients]
  );

  const totalPrice = useMemo<number>(() => {
    if (bun) {
      const bunSum: number = bun.price * 2;
      const otherIngredientsSum: number = otherIngredients.reduce(
        (acc: number, i: IIngredientData) => acc + i.price,
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
      dispatch(fetchOrder(orderIngredientsArr));
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
            {orderRequest
              ? "Отправка..."
              : orderFailed
                ? "Что-то пошло не так :("
                : bun
                  ? "Оформить заказ"
                  : "Необходимо добавить булку!"}
          </Button>
        </div>
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
