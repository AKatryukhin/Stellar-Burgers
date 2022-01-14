import React, { useEffect, useState } from 'react';
import styles from './app.module.css';
import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import * as ingredientsApi from '../../utils/IngredientsApi';

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
  const [state, setState] = useState({
    ingredients: [],
    isLoading: false,
    isError: false,
  });

  // для получения данных API и обновления основного стейта
  // useEffect(() => {
  //   setState({ ...state, isLoading: true });
  //   ingredientsApi
  //     .getIngredientsList()
  //     .then((res) => {
  //       setState({
  //         ...state,
  //         ingredients: res.data,
  //         isLoading: false,
  //       });
  //     })
  //     .catch(err => {
  //       setState({ ...state, isError: true, isLoading: false });
  //       console.log(err);
  //     });
  //  // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // для получения данных API и обновления основного стейта
  useEffect(() => {
    (async () => {
      setState({ ...state, isLoading: true });
      try {
        const res = await ingredientsApi.getIngredientsList();
        setState({
          ...state,
          ingredients: res.data,
          isLoading: false,
        });
      } catch (err) {
        setState({ ...state, isError: true, isLoading: false });
        console.log(err);
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    (
    <div className={styles.page}>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients
          ingredients={state.ingredients}
          isModalOpen={isIngredientModalOpen}
          onModalOpen={handleIngredientClick}
          onModalClose={handleIngredientModalClose}
          currentIngredient={selectedIngredient}
        />
        <BurgerConstructor
          ingredients={state.ingredients}
          isModalOpen={isOrderModalOpen}
          onModalOpen={handleOrderModalOpen}
          onModalClose={handleOrderModalClose}
        />
      </main>
      </div>
    )
  );
};
