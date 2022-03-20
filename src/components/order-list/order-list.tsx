import React, { FC } from "react";
import styles from "./order-list.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from "react-router-dom";
import { OrderListProps, TOrder } from "./order-list.props";
import { useSelector, useDispatch } from "../../services/hooks";
import { IOrdersFeed } from "../../services/types/data-types";
import { filterOrdersArray, totalPrice } from "../../utils/constants";
import { infoOrderOpenAction } from "../../services/actions/actionsOrders";
import { IIngredientData } from "../../utils/common-types";

export const OrderList: FC<OrderListProps> = ({ children, link, orders }) => {
  const { modalInfoOrderOpen } = useSelector((state) => state.orders);
  const { ingredients } = useSelector((state) => state.ingredients);
  const location = useLocation();
  const dispatch = useDispatch();
  const ordersArray: Array<IOrdersFeed> = filterOrdersArray(
    orders,
    ingredients
  );
  const Order: FC<TOrder> = ({ elem }) => {
    const orderArrayCut = elem.ingredients.slice(0, 6);
    return (
      <Link to={{ pathname: `${location.pathname}/${elem._id}` }} className={styles.link}>
        <div
          className={`${styles.orderContainer} p-6`}
          onClick={() => dispatch(infoOrderOpenAction(elem))}
        >
          <div className={styles.info}>
            <p className="text text_type_digits-default">#{elem.number}</p>
            <p
              className={`text text_type_main-default text_color_inactive ${styles.date}`}
            >
              {elem.createdAt && elem.createdAt.slice(0, 10)} {elem.createdAt && elem.createdAt.slice(11, 19)}
            </p>
          </div>
          <h3 className="text text_type_main-medium">
            {elem.name}
          </h3>
          {/*{location.pathname === '/profile/orders/' && (*/}
          {elem.status === "done" ?
          <p className={`text text_type_main-default mb-6 ${styles.done}`} >
            Выполнен
          </p> :
            <p className="text text_type_main-default mb-6 ">
              В процессе
            </p>}
          {/*)}*/}
          <div className={styles.desc}>
            <div className={styles.images}>
              {orderArrayCut.map(function (e: IIngredientData, index: number) {
                if (index === 5 && elem.ingredients.length > 6) {
                  return (
                    <div className={styles.last} key={index}>
                      <img src={e.image} className={`${styles.image}`} alt={e.name} key={index} style={{opacity: 0.3}}/>
                      <p className={`text text_type_main-default ${styles.amt}`}>+{elem.ingredients.length - 6}</p>
                    </div>
                  )
                } else {
                  return <img src={e.image} className={styles.image} alt={e.name} key={index}/>
                }
              })}
            </div>
            <div className={styles.finalPrice}>
              <p className="text text_type_digits-default">{totalPrice(elem.ingredients)}</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      </Link>
    );
  };
  return (
    <div className={`${styles.feed} custom-scroll`}>
      {ordersArray.map((elem: IOrdersFeed, index: number) => (
        <Order key={index} elem={elem}/>
      ))}
      {modalInfoOrderOpen && children}
    </div>
  );
};
