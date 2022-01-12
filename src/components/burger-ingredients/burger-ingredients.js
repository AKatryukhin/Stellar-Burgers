import React, { useState } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientsList } from '../ingredients-list/ingredients-list';
import PropTypes from 'prop-types';
import { itemPropTypes } from '../../utils/types';
import Modal from '../modal/modal';

export const BurgerIngredients = ({ data, isModalOpen, onModalOpen, onModalClose }) => {
  const [current, setCurrent] = useState('Булки');
  const bread = data.filter((i) => i.type === 'bun');
  const sauce = data.filter((i) => i.type === 'sauce');
  const main = data.filter((i) => i.type === 'main');

  return (
    <section className={`${styles.section}`}>
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
      <div className={`${styles.listWrap} custom-scroll`} id='containerElement'>
        <IngredientsList data={bread} onModalOpen={onModalOpen} title='Булки' />
        <IngredientsList data={sauce} onModalOpen={onModalOpen} title='Соусы' />
        <IngredientsList data={main} onModalOpen={onModalOpen} title='Начинки' />
      </div>
      <Modal isOpen={isModalOpen} title='Детали ингредиента' onClose={onModalClose}>
      </Modal>
    </section>
  );
};

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(itemPropTypes.isRequired).isRequired,
};