import { useContext, useEffect, useMemo } from 'react';
import styles from './burger-constructor.module.css';
import {
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorList } from '../constructor-list/constructor-list';
import Modal from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';
import PropTypes from 'prop-types';
import {
  IngredientsContext,
  TotalPriceContext,
} from '../../contexts/ingredients-context';

export const BurgerConstructor = ({
  isModalOpen,
  onModalClose,
  onModalOpen,
}) => {
  const { state } = useContext(IngredientsContext);
  const { totalPrice, setTotalPrice } = useContext(TotalPriceContext);

  const bun = state.selectedIngredients.find((i) => i.type === 'bun');
  const otherIngredients = state.selectedIngredients.filter(
    (i) => i.type !== 'bun'
  );
   
  useEffect(() => {
    if (bun) {
      const totalSumm = () => {
        const bunSumm = bun.price * 2;
        const otherIngredientsSumm = otherIngredients.reduce(
          (acc, i) => acc + i.price,
          0
        );
        return bunSumm + otherIngredientsSumm;
      };
      setTotalPrice(totalSumm);
    } else {
      const totalSumm = otherIngredients.reduce(
          (acc, i) => acc + i.price,
          0
      );
      setTotalPrice(totalSumm);
      }
    }, [bun, otherIngredients, setTotalPrice]);
 

  return (
    (
    <section className={`${styles.section} pl-4`}>
      <div className={`${styles.listWrap} mb-10`}>
        <ConstructorList
          bun={bun}
          otherIngredients={otherIngredients}
          onModalOpen={onModalOpen}
        />
      </div>
      <div className={styles.orderWrap}>
        <span className={`${styles.iconWrap} mr-10`}>
          <p className='text text_type_main-medium mr-2'>{totalPrice}</p>
          <CurrencyIcon type='primary' />
        </span>
        <Button type='primary' size='medium' onClick={onModalOpen}>
          Оформить заказ
        </Button>
      </div>
      <Modal isOpen={isModalOpen} onClose={onModalClose}>
        <OrderDetails />
      </Modal>
      </section>
    )
  );
};

BurgerConstructor.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  onModalOpen: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired,
};
