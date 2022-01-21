import React, { useCallback } from 'react';
import styles from './ingredients-list.module.css';
import { IngredientsItem } from '../ingredients-list-item/ingredients-list-item';
import PropTypes from 'prop-types';
import { itemPropTypes } from '../../utils/types';

export const IngredientsList = React.memo(({ title, filteredIngredients, onModalOpen }) => {
  // мемоизированный колбэк для передачи дочерним компонентам 
  const handleListItemClick = useCallback((i) => onModalOpen(i), [onModalOpen]);

  return (
    <div className={`${styles.listWrap} mb-10 custom-scroll`}>
      <h2 className={`${styles.title} mb-6`}>{title}</h2>
      <div className='pr-4 pl-4'>
        <ul className={`${styles.list} custom-scroll`}>
          {filteredIngredients.map((i) => (
            <li key={i._id}>
              <IngredientsItem onModalOpen={handleListItemClick} ingredient={i} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});

IngredientsList.propTypes = {
  title: PropTypes.string.isRequired,
  filteredIngredients: PropTypes.arrayOf(itemPropTypes.isRequired).isRequired,
};
