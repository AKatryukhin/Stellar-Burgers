import styles from './burger-constructor.module.css';
import {
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorList } from '../constructor-list/constructor-list';
import PropTypes from 'prop-types';
import { itemPropTypes } from '../../utils/types';

export const BurgerConstructor = ({ data }) => {

  return (
    <section className={`${styles.section} pl-4`}>
        <div className={`${styles.listWrap} mb-10`}>
        <ConstructorList data={data} />
        </div>
        <div className={styles.orderWrap}>
          <span className={`${styles.iconWrap} mr-10`}>
            <p className='text="true" text_type_main-medium mr-2'>123</p>
            <CurrencyIcon type='primary' />
          </span>
          <Button type='primary' size='medium'>
            Оформить заказ
          </Button>
        </div>
        
      </section>
  )
};

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(itemPropTypes.isRequired).isRequired,
};