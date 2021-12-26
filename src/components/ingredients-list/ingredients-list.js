import styles from './ingredients-list.module.css';
import { IngredientsItem } from '../ingredients-list-item/ingredients-list-item';

export const IngredientsList = ({ title, data }) => {
  return (
    <div className='mb-10'>
    <h2 className={`${styles.title} mb-6`}>{ title }</h2>
      <ul className={`${styles.list} p-1`}>
        {
          data.map(item => 
          (<li key={item._id} className="">
          <IngredientsItem item={item}/>
          </li>)
          )}
      </ul>
    </div>
  )
};
