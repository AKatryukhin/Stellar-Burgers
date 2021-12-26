import React from 'react';
import styles from './ingredients-list-item.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export const IngredientsItem = ({ item }) => {
  return (
    <>
    <img src={item.image_large} alt={item.name}></img>
    <div>
        <p text text_type_digits-medium>{item.price}</p>
        <CurrencyIcon type="secondary" />
      </div>
      <p className='text text_type_main-medium'>{item.name}</p>
    </> 
  )
};
