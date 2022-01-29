import styles from './ingredients-list-item.module.css';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { itemPropTypes } from '../../utils/types';
import PropTypes from 'prop-types';
import {useSelector, useDispatch} from "react-redux";
import { v4 as uuid } from 'uuid';

export const IngredientsItem = ({ ingredient }) => {
    const dispatch = useDispatch();
  const handleClick = () => {
    dispatch({
      type: 'ADD_SELECTED_INGREDIENT',
      payload: { ...ingredient, key: uuid() }
    });
    dispatch({
      type: 'ADD_CURRENT_INGREDIENT_REQUEST',
      payload: ingredient});
      dispatch({type: 'OPEN_INGREDIENT_MODAL'});
  };

  const { image, name, price } = ingredient;

  return (
    (
    <article onClick={handleClick} className={styles.card}>
      {ingredient?.count && <Counter count={ingredient.count} size='default' />}
      <img src={image} alt={name} className='mb-1'/>
      <div className={`${styles.priceWrap} mb-1`}>
        <p className={`${styles.price} mr-2 text text_type_digits-medium`}>
          {price}
        </p>
        <CurrencyIcon type='secondary' />
      </div>
      <p className={`${styles.name} text text_type_main-small`}>{name}</p>
    </article>
    )
  )
};

IngredientsItem.propTypes = {
  ingredient: itemPropTypes.isRequired,
  onModalOpen: PropTypes.func.isRequired
};
