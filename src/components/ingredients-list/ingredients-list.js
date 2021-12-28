import styles from './ingredients-list.module.css';
import { IngredientsItem } from '../ingredients-list-item/ingredients-list-item';
import PropTypes from 'prop-types';
import { itemPropTypes } from '../../utils/types';

export const IngredientsList = ({ title, data }) => {
  return (
    <div className={`${styles.listWrap} mb-10`}>
      <h2 className={`${styles.title} mb-6`}>{title}</h2>
      <div className='pr-4 pl-4'>
      <ul className={`${styles.list}`}>
        {
          data.map(item => 
          (<li key={item._id}>
          <IngredientsItem item={item}/>
          </li>)
          )}
        </ul>
        </div>
    </div>
  )
};

IngredientsList.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(itemPropTypes.isRequired).isRequired,
};