import styles from './burger-constructor.module.css';
import {
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorList } from '../constructor-list/constructor-list';
import PropTypes from 'prop-types';

export const BurgerConstructor = ({ data }) => {

  return (
    <section className={`${styles.section} pr-4 pl-4`}>
        <div className='mb-10'>
          <ConstructorList data={data} />
        </div>
        <div className={styles.orderWrap}>
          <span className={`${styles.iconWrap} mr-10`}>
            <p className='text text_type_digits-medium mr-2'>123</p>
            <CurrencyIcon type='primary' />
          </span>
          <Button type='primary' size='medium'>
            Оформить заказ
          </Button>
        </div>
      </section>
  )
};

const itemPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  __v: PropTypes.number,

});

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(itemPropTypes.isRequired).isRequired,
};