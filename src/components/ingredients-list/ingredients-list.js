import React from 'react';
import styles from './ingredients-list.module.css';
import { IngredientsItem } from '../ingredients-list-item/ingredients-list-item';

export const IngredientsList = ({ title, data }) => {
  return (
    <>
    <h2>{ title }</h2>
      <ul className={styles.nav}>
        {data.map(item => 
          (<li key={item._id} className="">
          <IngredientsItem item={item}/>
          </li>)
        )}
      </ul>
    </>
  )
};
