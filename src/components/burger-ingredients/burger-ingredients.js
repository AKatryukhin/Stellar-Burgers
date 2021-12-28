import React, { useState } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientsList } from '../ingredients-list/ingredients-list';
import PropTypes from 'prop-types';
import { itemPropTypes } from '../../utils/types';

export const BurgerIngredients = ({ data }) => {
  const [current, setCurrent] = useState('Булки');
  const bread = data.filter((i) => i.type === 'bun');
  const sauce = data.filter((i) => i.type === 'sauce');
  const main = data.filter((i) => i.type === 'main');

  return (
    <section className={`${styles.section} mr-10`}>
      <h1 className='text="true" text_type_main-large pt-10 mb-5'>Соберите бургер</h1>
      <div className={`${styles.tabWrap} mb-10`}>
        <Tab value='one' active={current === 'Булки'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value='two' active={current === 'Соусы'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value='three' active={current === 'Начинки'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={styles.listWrap} id='containerElement'>
        <IngredientsList data={bread} title='Булки' />
        <IngredientsList data={sauce} title='Соусы' />
        <IngredientsList data={main} title='Начинки' />
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(itemPropTypes.isRequired).isRequired,
};