import React, { useEffect, useState, useCallback } from 'react';
import styles from './app.module.css';
import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import * as ingredientsApi from '../../utils/IngredientsApi';
import { v4 as uuid } from 'uuid';
import {useDispatch, useSelector} from "react-redux";

export const App = () => {
  const [isIngredientModalOpen, setIsIngredientModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const handleIngredientModalClose = () => setIsIngredientModalOpen(false);
  const handleOrderModalClose = useCallback(
    () => setIsOrderModalOpen(false),
    []
  );
  const [totalPrice, setTotalPrice] = useState(0);

  const dispatch = useDispatch();
   const ingredients = useSelector(state => state.ingredients.ingredients)
  // основной стейт с данными
  // const [state, setState] = useState({
  //   selectedIngredients: [],
  //   ingredients: [],
  //   isLoading: false,
  //   isError: false,
  //   order: null,
  // });

  useEffect(() => {
      dispatch({ type: 'GET_INGREDIENTS_REQUEST' })
  }, [])

  // для открытия попапа заказа, отправки запроса на Api и получения номера заказа
  // const handleOrderModalOpen = useCallback(async () => {
  //   setState({ ...state, isLoading: true });
  //   try {
  //     const handleOrderClick = () =>
  //       state.selectedIngredients.map((i) => i._id);
  //     const res = await ingredientsApi.placeAnOrder(handleOrderClick());
  //     const pureIngredients = state.ingredients.map((i) => {
  //       if (i.count) {
  //         i.count = null;
  //       }
  //       return i;
  //     });
  //
  //     setState({
  //       ...state,
  //       order: res.order.number,
  //       isLoading: false,
  //       selectedIngredients: [],
  //       ingredients: pureIngredients,
  //     });
  //     setIsOrderModalOpen(true);
  //   } catch (err) {
  //     setState({ ...state, isError: true, isLoading: false });
  //     console.log(err);
  //   }
  // }, [state]);

  // для удаления ранее добавленных ингредиентов из BurgerConstructor
  // и подсчета количества добавленных ингредиентов
  // const handleDeleteIngredient = useCallback(
  //   (item) => {
  //     const currentItem = state.ingredients.find((i) => i._id === item._id);
  //     const newSelectedIngredients = state.selectedIngredients.filter(
  //       (i) => i.key !== item.key
  //     );
  //     if (currentItem.count >= 1) {
  //       currentItem.count = currentItem.count - 1;
  //     }
  //     if (currentItem.count < 1) {
  //       currentItem.count = null;
  //     }
  //     setState((s) => ({
  //       ...s,
  //       selectedIngredients: [...newSelectedIngredients],
  //     }));
  //   },
  //   [state.selectedIngredients, state.ingredients]
  // );

  // для открытия попапа ингредиента, передачи в него selectedIngredient
  // и добавления его в selectedIngredients
  // const handleIngredientClick = useCallback(
  //   (item) => {
  //     setSelectedIngredient(item);
  //     setIsIngredientModalOpen(true);
  //     const isBunInOrder = state.selectedIngredients.some(
  //       (i) => i.type === 'bun'
  //     );
  //
  //     if (item.type !== 'bun') {
  //       item.count = item.count ? item.count + 1 : 1;
  //     }
  //
  //     if (item.type === 'bun' && !isBunInOrder) {
  //       item.count = 2;
  //     }
  //
  //     if (item.type !== 'bun') {
  //       setState((s) => ({
  //         ...s,
  //         selectedIngredients: [
  //           ...s.selectedIngredients,
  //           { ...item, key: uuid() },
  //         ],
  //       }));
  //     }
  //     if (item.type === 'bun' && !isBunInOrder) {
  //       setState((s) => ({
  //         ...s,
  //         selectedIngredients: [
  //           ...s.selectedIngredients,
  //           { ...item, key: uuid() },
  //         ],
  //       }));
  //     }
  //   },
  //   [state.selectedIngredients]
  // );

  // для получения данных API и обновления основного стейта
  // useEffect(() => {
  //   (async () => {
  //     setState({ ...state, isLoading: true });
  //     try {
  //       const res = await ingredientsApi.getIngredientsList();
  //       setState({
  //         ...state,
  //         ingredients: res.data,
  //         isLoading: false,
  //       });
  //     } catch (err) {
  //       setState({ ...state, isError: true, isLoading: false });
  //       console.log(err);
  //     }
  //   })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <div className={styles.page}>
      <AppHeader />
      <main className={styles.main}>
        {/*<IngredientsContext.Provider value={{ state, setState }}>*/}
          <BurgerIngredients
            isModalOpen={isIngredientModalOpen}
            // onModalOpen={handleIngredientClick}
            onModalClose={handleIngredientModalClose}
            currentIngredient={selectedIngredient}
          />
          {/*<TotalPriceContext.Provider value={{ totalPrice, setTotalPrice }}>*/}
            <BurgerConstructor
              isModalOpen={isOrderModalOpen}
              // onModalOpen={handleOrderModalOpen}
              onModalClose={handleOrderModalClose}
              // onDeleteIngredient={handleDeleteIngredient}
            />
          {/*</TotalPriceContext.Provider>*/}
        {/*</IngredientsContext.Provider>*/}
      </main>
    </div>
  );
};
