import React, {useEffect} from 'react';
import styles from './order-details.module.css';
import IconDone from '../../images/iconDoneGif.gif';
import {useDispatch, useSelector} from "react-redux";

export const OrderDetails = React.memo(() => {
  const order = useSelector(state => state?.order.orderNumber)
  const dispatch = useDispatch();
    const orderIngredientsArr = useSelector((state) =>
        state?.selectedIngredients.selectedIngredients.map((i) => i._id)
    );
  useEffect(() => {
      dispatch({type: 'GET_ORDER_REQUEST', payload: orderIngredientsArr});
  },[]);

  return (
    (
    <article className={styles.card}>
      <p className={`${styles.name} text text_type_digits-large mt-4 mb-8`}>
          {order}
      </p>
      <p className={`${styles.name} text text_type_main-medium mb-15`}>
        идентификатор заказа
      </p>
      <img
        src={IconDone}
        alt='Картинка - отметка выполнен'
        className={`${styles.icon} mb-15`}
      />
      <p className={`${styles.name} text text_type_main-default mb-2`}>
        Ваш заказ начали готовить
      </p>
      <p
        className={`${styles.name} text text_type_main-default text_color_inactive mb-20`}
      >
        Дождитесь готовности на орбитальной станции
      </p>
      </article>
    )
  );
});
