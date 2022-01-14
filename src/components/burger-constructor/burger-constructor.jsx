import styles from './burger-constructor.module.css';
import {
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorList } from '../constructor-list/constructor-list';
import Modal from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';
import PropTypes from 'prop-types';
import { itemPropTypes } from '../../utils/types';

export const BurgerConstructor = ({
  ingredients,
  isModalOpen,
  onModalClose,
  onModalOpen }) => {
  return (
    (
    <section className={`${styles.section} pl-4`}>
      <div className={`${styles.listWrap} mb-10`}>
        <ConstructorList ingredients={ingredients} onModalOpen={onModalOpen}/>
      </div>
      <div className={styles.orderWrap}>
        <span className={`${styles.iconWrap} mr-10`}>
          <p className='text="true" text_type_main-medium mr-2'>123</p>
          <CurrencyIcon type='primary' />
        </span>
        <Button type='primary' size='medium' onClick={onModalOpen}>
          Оформить заказ
        </Button>
      </div>
        <Modal isOpen={isModalOpen} onClose={onModalClose}>
          <OrderDetails/>
      </Modal>
      </section>
    )
  );
};

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(itemPropTypes.isRequired).isRequired,
};
