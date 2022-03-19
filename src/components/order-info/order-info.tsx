import React, { FC, useCallback, useEffect, useMemo } from "react";
import styles from "./order-info.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { OrderIngredient } from "../order-ingredient/order-ingredient";
import { useSelector, useDispatch } from "../../services/hooks";
import { useLocation, useParams } from "react-router-dom";
import { IIngredientData } from "../../utils/common-types";
import { element } from "prop-types";
import { linkOpenInfoOrderAction } from "../../services/actions/actionsOrders";
import {
  wsConnectionStart,
  wsProfileConnectionStart,
} from "../../services/actions/actionsWS";
import { IOrders, IOrdersFeed } from "../../services/types/data-types";

export const OrderInfo: FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { order } = useSelector((state) => state.orders);
  const { orders, userOrders } = useSelector((state) => state.ws);
  const location = useLocation();
  const { ingredients } = useSelector((state) => state.ingredients);

  const counting = useCallback((elem: IIngredientData) => {
    let count = order && order.ingredients.length;
    return count && elem.type === "bun" ? count + 1 : count;
  }, []);

  const filterOrdersArray = (
    orders: Array<IOrders>,
    ingredientsArray: Array<IIngredientData>
  ) => {
    let a: any = [];
    let b: any = [];
    orders.forEach((o) => {
      o.ingredients.forEach((i) => {
        a.push(ingredientsArray.filter((e) => e._id === i)[0]);
      });
      b.push({
        ...o,
        ingredients: a,
      });
      a = [];
    });
    return b;
  };

  const totalPrice = (someIngredients: Array<IIngredientData>) => {
    let price = 0
    someIngredients.forEach((e: any) => {
      if (e.type === 'bun') {
        price += (2 * e.price)
      } else {
        price += e.price
      }
    })
    return price
  }

  useEffect(() => {
    dispatch(wsConnectionStart());
    dispatch(wsProfileConnectionStart());
  }, []);
  useEffect(() => {
    if (location.pathname === `/feed/${id}` && orders !== undefined) {
      const ordersArray: Array<IOrdersFeed> = filterOrdersArray(orders, ingredients);
      dispatch(
        linkOpenInfoOrderAction(ordersArray.filter((e: any) => e._id === id)[0])
      );
    } else if (
      location.pathname === `/profile/orders/${id}` &&
      userOrders !== undefined
    ) {
      const ordersArray: Array<IOrdersFeed> = filterOrdersArray(
        userOrders,
        ingredients
      );
      dispatch(
        linkOpenInfoOrderAction(
          ordersArray.filter((e: IOrdersFeed) => e._id === id)[0]
        )
      );
    }
  }, [orders, userOrders]);

  return (
    <>
      {order !== undefined && order.ingredients !== undefined && (
        <div className={styles.main}>
          <p className={`text text_type_digits-default ${styles.number}`}>
            #{order.number}
          </p>
          <h3 className={`text text_type_main-medium ${styles.name}`}>
            {order.name}
          </h3>
          <p className={`text text_type_main-default ${styles.status}`}>
            {order.status}
          </p>
          <p className={`text text_type_main-medium ${styles.consist}`}>
            Состав:
          </p>
          <div className={styles.ingred_container}>
            {order.ingredients
              .filter(function (o: any, pos: number) {
                return order.ingredients.indexOf(o) === pos;
              })
              .map((elem: IIngredientData, index: number) => (
                <OrderIngredient counting={counting} elem={elem} key={index} />
              ))}
          </div>
          <div className={styles.info}>
            {order.createdAt &&
            <p
              className={`text text_type_main-default text_color_inactive ${styles.time}`}
            >
                {order.createdAt.slice(0, 10)} {order.createdAt.slice(11, 19)}
            </p>}
            <div className={styles.finalPrice}>
              <p className="text text_type_digits-default">
                {totalPrice(order.ingredients)}
              </p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
