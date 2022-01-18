import styles from './constructor-list.module.css';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { itemPropTypes } from '../../utils/types';
import bunImage from '../../images/bun-02.png';

export const ConstructorList = ({ ingredients }) => {

  return (
    <div className='mt-25 '>
      <div className={`${styles.itemWrap} ml-8 no-sroll`}>
        <ConstructorElement
          type='top'
          isLocked={true}
          text='Краторная булка N-200i (верх)'
          // text={bun && bun.name && bun.name + (" (верх)")}
          price='20'
          thumbnail={bunImage}
        />
      </div>
        <ul className={`${styles.list} custom-scroll`}>
          {ingredients.map((i) => (
            <li key={i._id}>
              <div className={`${styles.itemWrap}`}>
                <span className='mr-3'>
                  <DragIcon type='primary' className='mr-6' />
                </span>
                <ConstructorElement
                  text={i.name}
                  price={i.price}
                  thumbnail={i.image}
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
  ingredients: PropTypes.arrayOf(itemPropTypes.isRequired).isRequired,
};