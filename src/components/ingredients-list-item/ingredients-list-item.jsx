import React from 'react';
import styles from './ingredients-list-item.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { itemPropTypes } from '../../utils/types';

export const IngredientsItem = React.memo(({ ingredient, onModalOpen }) => {

  const handleClick = () => onModalOpen(ingredient);
  const { image, name, price } = ingredient;

  return (
    <article onClick={handleClick} className={styles.card}>
      <Counter count={1} size="default" />
      <img src={image} alt={name} className='mb-1'></img>
      <div className={`${styles.priceWrap} mb-1`}>
        <p className={`${styles.price} mr-2 text text_type_digits-medium`}>{price}</p>
        <CurrencyIcon type="secondary" />
        </div>
      <p className={`${styles.name} text text_type_main-small`}>{name}</p>
    </article> 
  )
});

IngredientsItem.propTypes = {
  ingredient: itemPropTypes.isRequired
};