import React, { useEffect, useState } from 'react';
import styles from './app.module.css';
import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';

import { INGREDIENTS_URL } from '../../utils/constants';

export const App = () => {

  const [isIngredientModalOpen, setIsIngredientModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const handleOrderModalOpen = () => setIsOrderModalOpen(true);
  const handleIngredientModalClose = () => setIsIngredientModalOpen(false);
  const handleOrderModalClose = () => setIsOrderModalOpen(false);
  
  // для открытия попапа ингредиента и передачи в него selectedIngredient
  const handleIngredientClick = (item) => {
    setSelectedIngredient(item);
    setIsIngredientModalOpen(true);
  };

  // основной стейт с данными
  const [data, setData] = useState({
    ingredients: [],
    isLoading: false,
    isError: false,
  });

  // для получения данных API и обновления основного стейта
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  return (
    <div className={styles.page}>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients
          ingredients={data.ingredients}
          isModalOpen={isIngredientModalOpen}
          onModalOpen={handleIngredientClick}
          onModalClose={handleIngredientModalClose}
          currentIngredient={selectedIngredient}
        />
        <BurgerConstructor
          ingredients={data.ingredients}
          isModalOpen={isOrderModalOpen}
          onModalOpen={handleOrderModalOpen}
          onModalClose={handleOrderModalClose} />
      </main>
    </div>
  );
};
