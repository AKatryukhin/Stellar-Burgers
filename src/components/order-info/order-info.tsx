import React, { FC, useCallback, useEffect } from "react";
import styles from "./order-info.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { OrderIngredient } from "../order-ingredient/order-ingredient";
import { useSelector, useDispatch } from "../../services/hooks";
import { useLocation, useParams } from "react-router-dom";
import { IIngredientData } from "../../utils/common-types";
import { linkOpenInfoOrderAction } from "../../services/actions/actionsOrders";
import {
  wsConnectionStart,
  wsProfileConnectionStart,
} from "../../services/actions/actionsWS";
import { IOrders, IOrdersFeed } from "../../services/types/data-types";
import { filterOrdersArray, totalPrice } from "../../utils/constants";

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

  useEffect(() => {
    dispatch(wsConnectionStart());
    dispatch(wsProfileConnectionStart());
  }, []);
  useEffect(() => {
    if (location.pathname === `/feed/${id}` && orders !== undefined) {
      const ordersArray: Array<IOrdersFeed> = filterOrdersArray(
        orders,
        ingredients
      );
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
          <p className={`text text_type_digits-default ${styles.number} mb-10`}>
            #{order.number}
          </p>
          <h3 className={`text text_type_main-medium ${styles.name} mb-3`}>
            {order.name}
          </h3>
          <p className={`text text_type_main-default ${styles.status} mb-15`}>
            Выполнен
          </p>
          <p className={`text text_type_main-medium ${styles.consist} mb-6`}>
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
          <div className={`${styles.info} pl-4`}>
            <p
              className={`text text_type_main-default text_color_inactive ${styles.time}`}
            >
              {order.createdAt && order.createdAt.slice(0, 10)}{" "}
              {order.createdAt && order.createdAt.slice(11, 19)}
            </p>
            <div className={styles.finalPrice}>
              <p className="text text_type_digits-default ">
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
