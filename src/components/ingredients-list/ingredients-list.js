import styles from './ingredients-list.module.css';
import { IngredientsItem } from '../ingredients-list-item/ingredients-list-item';

export const IngredientsList = ({ title, data }) => {
  return (
    <div className={`${styles.listWrap} mb-10`}>
      <h2 className={`${styles.title} mb-6`}>{title}</h2>
      <div className='pr-4 pl-4'>
      <ul className={`${styles.list}`}>
        {
          data.map(item => 
          (<li key={item._id} className="">
          <IngredientsItem item={item}/>
          </li>)
          )}
        </ul>
        </div>
    </div>
  )
};
