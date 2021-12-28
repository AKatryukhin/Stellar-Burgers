import styles from './constructor-list.module.css';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { itemPropTypes } from '../../utils/types';
import bunImage from '../../images/bun-02.png';

export const ConstructorList = ({ data }) => {
  return (
    <div className='mt-25 '>
      <div className={`${styles.itemWrap} ml-8 no-sroll`}>
        <ConstructorElement
          type='top'
          isLocked={true}
          text='Краторная булка N-200i (верх)'
          price='20'
          thumbnail={bunImage}
        />
      </div>
        <ul className={`${styles.list}`}>
          {data.map((item) => (
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
          text='Краторная булка N-200i (низ)'
          price='20'
          thumbnail={bunImage}
        />
      </div>
    </div>
  );
};

ConstructorList.propTypes = {
  data: PropTypes.arrayOf(itemPropTypes.isRequired).isRequired,
};