import React, { useEffect, useState } from 'react';
import styles from './app.module.css';
import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import * as ingredientsApi from '../../utils/IngredientsApi';
import { IngredientsContext } from '../../contexts/ingredients-context';

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

    const isBunInOrder = state.selectedIngredients.some(i => i.type === 'bun');
    const isInOrder = state.selectedIngredients.some(i => i._id === item._id);
    
    item.type !== 'bun' && !isInOrder &&
    setState(s => ({
      ...s,
      selectedIngredients: [
        ...s.selectedIngredients,
        item
      ]
    })
      );
    item.type === 'bun' && !isBunInOrder &&
    setState(s => ({
      ...s,
      selectedIngredients: [
        ...s.selectedIngredients,
        item
      ]
    })
      );    
  };

  // основной стейт с данными
  const [state, setState] = useState({
    selectedIngredients: [],
    ingredients: [],
    isLoading: false,
    isError: false,
  });

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
        <IngredientsContext.Provider value={{ state, setState }}>
          <BurgerIngredients
            isModalOpen={isIngredientModalOpen}
            onModalOpen={handleIngredientClick}
            onModalClose={handleIngredientModalClose}
            currentIngredient={selectedIngredient}
          />
          <BurgerConstructor
            isModalOpen={isOrderModalOpen}
            onModalOpen={handleOrderModalOpen}
            onModalClose={handleOrderModalClose}
          />
        </IngredientsContext.Provider>
      </main>
      </div>
    )
  );
};
