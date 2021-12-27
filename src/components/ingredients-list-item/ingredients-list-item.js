import styles from './ingredients-list-item.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

export const IngredientsItem = ({ item }) => {
  return (
    <article className={styles.card}>
      <Counter count={1} size="default" />
      <img src={item.image_large} alt={item.name} className='mb-1'></img>
      <div className={`${styles.priceWrap} mb-1`}>
        <p text text_type_digits-medium className={`${styles.price} mr-2`}>{item.price}</p>
        <CurrencyIcon type="secondary" />
        </div>
      <p className='text text_type_main-small'>{item.name}</p>
    </article> 
  )
};
