import React, {useState, useContext, useMemo, useCallback, useEffect} from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientsList } from '../ingredients-list/ingredients-list';
import PropTypes from 'prop-types';
import { itemPropTypes } from '../../utils/types';
import Modal from '../modal/modal';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { IngredientsContext } from '../../contexts/ingredients-context';
import {useDispatch, useSelector} from "react-redux";

export const BurgerIngredients = React.memo(() => {
  const ingredients = useSelector(state => state?.ingredients.ingredients)
  const [current, setCurrent] = useState('Булки');
  const buns = useMemo(() => ingredients.filter((i) => i.type === 'bun'), [ingredients]);
  const sauces = useMemo(() => ingredients.filter((i) => i.type === 'sauce'), [ingredients]);
  const mains = useMemo(() => ingredients.filter((i) => i.type === 'main'), [ingredients]);
  const isOpen = useSelector(state => state?.modal.isIngredientModalOpen);
  const currentIngredient = useSelector(state => state?.currentIngredient.ingredient);
  const handleCurrent = useCallback((evt) => {
    setCurrent(evt);
}, []);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: "GET_INGREDIENTS_REQUEST" });
    }, []);

  return (
    (
    <section className={`${styles.section}`}>
      <h1
        className={`${styles.title} text text_type_main-large pt-10 mb-5`}
      >
        Соберите бургер
      </h1>
      <div className={`${styles.tabWrap} mb-10`}>
        <Tab value='one' active={current === 'Булки'} onClick={handleCurrent}>
          Булки
        </Tab>
        <Tab value='two' active={current === 'Соусы'} onClick={handleCurrent}>
          Соусы
        </Tab>
        <Tab value='three' active={current === 'Начинки'} onClick={handleCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={`${styles.listWrap} custom-scroll`} id='containerElement'>
          <IngredientsList
              filteredIngredients={buns}
              title='Булки' />
        <IngredientsList
            filteredIngredients={sauces}
            title='Соусы' />
          <IngredientsList
          filteredIngredients={mains}
          title='Начинки'
        />
      </div>
        {isOpen && <Modal
          title='Детали ингредиента'
          // onClose={onModalClose}
        >
          {currentIngredient && <IngredientDetails/>}
        </Modal>}
      </section>
    )
  );
});

BurgerIngredients.propTypes = {
  // isModalOpen: PropTypes.bool.isRequired,
  // onModalOpen: PropTypes.func.isRequired,
  // onModalClose: PropTypes.func.isRequired,
  currentIngredient: itemPropTypes
};
