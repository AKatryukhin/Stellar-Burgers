import React, { useEffect, useState } from 'react';
import styles from './app.module.css';
import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import * as ingredientsApi from '../../utils/IngredientsApi';
import {
  IngredientsContext,
  TotalPriceContext,
} from '../../contexts/ingredients-context';

export const App = () => {
  const [isIngredientModalOpen, setIsIngredientModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const handleIngredientModalClose = () => setIsIngredientModalOpen(false);
  const handleOrderModalClose = () => setIsOrderModalOpen(false);


  // основной стейт с данными
  const [state, setState] = useState({
    selectedIngredients: [],
    ingredients: [],
    isLoading: false,
    isError: false,
    order: null
    });
  
  // для открытия попапа заказа, отправки запроса на Api и получения номера заказа
  const handleOrderModalOpen = async () => {
    setState({ ...state, isLoading: true });
    try {
      const handleOrderClick = () => state.selectedIngredients.map((i) => i._id);
      const res = await ingredientsApi.placeAnOrder(handleOrderClick());
      setState({
        ...state,
        order: res.order.number,
        isLoading: false,
      });
      setIsOrderModalOpen(true);
    } catch (err) {
      setState({ ...state, isError: true, isLoading: false });
      console.log(err);
    }
  };

 
  const [totalPrice, setTotalPrice] = useState(0);

  // для открытия попапа ингредиента, передачи в него selectedIngredient
  // и добавления его в selectedIngredients
  const handleIngredientClick = (item) => {
    setSelectedIngredient(item);
    setIsIngredientModalOpen(true);

    const isBunInOrder = state.selectedIngredients.some(
      (i) => i.type === 'bun'
    );
    const isIngredientInOrder = state.selectedIngredients.some((i) => i._id === item._id);
    if (item.type !== 'bun' && !isIngredientInOrder) {
      setState((s) => ({
        ...s,
        selectedIngredients: [...s.selectedIngredients, item],
      }));
    }
    if (item.type === 'bun' && !isBunInOrder) {
      setState((s) => ({
        ...s,
        selectedIngredients: [...s.selectedIngredients, item],
      }));
    }
  };




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
    <IngredientsContext.Provider value={{ state, setState }}>
      <TotalPriceContext.Provider
        value={{ totalPrice, setTotalPrice }}
      >
        <div className={styles.page}>
          <AppHeader />
          <main className={styles.main}>
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
          </main>
        </div>
      </TotalPriceContext.Provider>
    </IngredientsContext.Provider>
  );
};
