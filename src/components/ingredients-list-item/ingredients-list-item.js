import styles from './ingredients-list-item.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { itemPropTypes } from '../../utils/types';

export const IngredientsItem = ({ item, onModalOpen }) => {
  return (
    <article onClick={onModalOpen} className={styles.card}>
      <Counter count={1} size="default" />
      <img src={item.image} alt={item.name} className='mb-1'></img>
      <div className={`${styles.priceWrap} mb-1`}>
        <p className={`${styles.price} mr-2 text="true" text_type_digits-medium`}>{item.price}</p>
        <CurrencyIcon type="secondary" />
        </div>
      <p className={`${styles.name} text="true" text_type_main-small`}>{item.name}</p>
    </article> 
  )
};

IngredientsItem.propTypes = {
  item: itemPropTypes.isRequired
};