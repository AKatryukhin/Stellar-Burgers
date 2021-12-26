import React from 'react';
import styles from './app.module.css';
import { AppHeader } from '../app-header/app-header';
import { data } from '../../utils/data';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';

export const App = () => {
  return(
  <div className={styles.page}>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients data={data}/>
      </main>
  </div>
  )
};
