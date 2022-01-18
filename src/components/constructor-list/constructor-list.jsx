import styles from './constructor-list.module.css';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { itemPropTypes } from '../../utils/types';
import bunImage from '../../images/bun-02.png';

export const ConstructorList = ({ ingredients }) => {

  const bun = ingredients.find(i => i.type === 'bun');

  return (
    <div className={`${styles.wrap} mt-25 mb-10`}>
      <div className={`${styles.itemWrap} ml-8 no-sroll`}>
        {bun ?
          (<ConstructorElement
            type='top'
            isLocked={true}
            text={`${bun.name} (верх)`}
            price='20'
            thumbnail={bunImage}
          />)
          :
          ( <ConstructorElement
            className='mt-4'
            type='top'
            isLocked={true}
            text='Выберите булку'
            price=''
            thumbnail={bunImage}
          />)
        }
      </div>
      {ingredients.length > 0 ? (
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
      ) : (
        <div className={`${styles.messageWrap}`}>
          <p className={`${styles.message} text text_type_main-default text_color_inactive`}>
            Выберите начинку
          </p>
        </div>
      )}
      <div className={`${styles.itemWrap} ml-8`}>
      {bun ?
          (<ConstructorElement
            type='bottom'
            isLocked={true}
            text={`${bun.name} (низ)`}
            price='20'
            thumbnail={bunImage}
          />)
          :
          ( <ConstructorElement
            className='mt-4'
            type='bottom'
            isLocked={true}
            text='Выберите булку'
            price=''
            thumbnail={bunImage}
          />)
         
        }
      </div>
    </div>
  );
};

ConstructorList.propTypes = {
  ingredients: PropTypes.arrayOf(itemPropTypes.isRequired).isRequired,
};
