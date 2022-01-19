import { useContext } from 'react';
import styles from './order-details.module.css';
import IconDone from '../../images/iconDoneGif.gif';
import { IngredientsContext } from '../../contexts/ingredients-context';

export const OrderDetails = () => {
  const { state } = useContext(IngredientsContext);

  return (
    (
    <article className={styles.card}>
      <p className={`${styles.name} text text_type_digits-large mt-4 mb-8`}>
        {state.order}
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
};
