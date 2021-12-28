import styles from './constructor-list.module.css';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { itemPropTypes } from '../../utils/types';

export const ConstructorList = ({ data }) => {
  const firstItem = data[0];
  const lastItem = data[data.length - 1];
  const newData = data.slice(1, data.length - 1);

  return (
    <div className='mt-25 '>
      <div className={`${styles.itemWrap} ml-8 no-sroll`}>
        <ConstructorElement
          type='top'
          isLocked={true}
          text={firstItem.name}
          price={firstItem.price}
          thumbnail={firstItem.image}
        />
      </div>
        <ul className={`${styles.list}`}>
          {newData.map((item) => (
            <li key={item._id}>
              <div className={`${styles.itemWrap}`}>
                <span className='mr-3'>
                  <DragIcon type='primary' className='mr-6' />
                </span>
                <ConstructorElement
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                />
              </div>
            </li>
          ))}
        </ul>
      <div className={`${styles.itemWrap} ml-8`}>
        <ConstructorElement
          className='mt-4'
          type='bottom'
          isLocked={true}
          text={lastItem.name}
          price={lastItem.price}
          thumbnail={lastItem.image}
        />
      </div>
    </div>
  );
};

ConstructorList.propTypes = {
  data: PropTypes.arrayOf(itemPropTypes.isRequired).isRequired,
};