import styles from './ingredients-list-basket.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

export const IngredientsListBasket = ({ data }) => {
  const firstItem = data[0];
  const lastItem = data[(data.length - 1)];
  const newData = data.slice(1, (data.length - 1));

  return (
    <div className='mt-25'>
      <ConstructorElement
        type='top'
        isLocked={true}
        text={firstItem.name}
        price={firstItem.price}
        thumbnail={firstItem.image}
      />
      <ul className={`${styles.list} mb-10`}>
        {newData.map((item) => (
          <li key={item._id} className=''>
            <ConstructorElement
              text={item.name}
              price={item.price}
              thumbnail={item.image}
            />
          </li>
        ))}
      </ul>
      <ConstructorElement
        type='bottom'
        isLocked={true}
        text={lastItem.name}
        price={lastItem.price}
        thumbnail={lastItem.image}
      />
    </div>
  );
};
