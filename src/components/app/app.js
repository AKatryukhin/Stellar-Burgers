import React, { useEffect, useState } from 'react';
import styles from './app.module.css';
import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';

import { INGREDIENTS_URL } from '../../utils/constants';

export const App = () => {

  const [data, setData] = useState({
    ingredients: [],
    isLoading: false,
    isError: false,
  });

  useEffect(() => {
    (async () => {
      setData({ ...data, isLoading: true });
      try {
        const response = await fetch(INGREDIENTS_URL);
        const res = await response.json();
        setData({
          ...data,
          ingredients: res.data,
          isLoading: false,
        });
      } catch (err) {
        setData({ ...data, isError: true });
        console.log(err);
      }
    })();
  }, []);

  return (
    <div className={styles.page}>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients data={data.ingredients} />
        <BurgerConstructor data={data.ingredients} />
      </main>
    </div>
  );
};
