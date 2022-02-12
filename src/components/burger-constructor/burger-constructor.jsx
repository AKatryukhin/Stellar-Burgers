import React, { useCallback, useMemo } from "react";
import styles from "./burger-constructor.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerConstructorList } from "../burger-constructor-list/burger-constructor-list";
import Modal from "../modal/modal";
import { OrderDetails } from "../order-details/order-details";
import { useDispatch, useSelector } from "react-redux";
import bigIconPrice from "../../images/bigIconPrice.svg";
import Preloader from "../preloader/preloader";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchOrder, resetOrder } from "../../services/actions/actionsOrder";
import { clearIngredientsCount } from "../../services/actions/actionsIngredient";
import { clearSelectIngredientList } from "../../services/actions/actionsSelectIngredient";

export const BurgerConstructor = React.memo(() => {
  const location = useLocation();
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
    token && bun &&
      otherIngredients &&
      dispatch(fetchOrder(orderIngredientsArr));
  };

  const onClose = useCallback(() => {
    dispatch(clearSelectIngredientList());
    dispatch(clearIngredientsCount());
    dispatch(resetOrder());
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
