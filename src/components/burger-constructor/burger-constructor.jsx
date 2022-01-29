import React, { useContext, useEffect, useMemo } from 'react';
import styles from './burger-constructor.module.css';
import {
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ConstructorList } from '../constructor-list/constructor-list';
import Modal from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from "react-redux";

export const BurgerConstructor = React.memo(({ onDeleteIngredient}) => {

  const orderIngredientsArr = useSelector(state => state?.selectedIngredients.selectedIngredients.map((i) => i._id))
  const dispatch = useDispatch();
  const handleClick = () =>  bun && otherIngredients &&
      dispatch({type: 'GET_ORDER_REQUEST', payload: orderIngredientsArr});

  const selectedIngredients = useSelector(state => state?.selectedIngredients.selectedIngredients);
  const isOpen = useSelector(state => state?.modal.isOrderModalOpen);
  const bun = useMemo(() => selectedIngredients.find((i) => i.type === 'bun'), [selectedIngredients]);
  const otherIngredients = useMemo(() => selectedIngredients.filter(
    (i) => i.type !== 'bun'
  ), [selectedIngredients]);

  // const handleClick = () =>  bun && otherIngredients && onModalOpen();
   
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
      // setTotalPrice(totalSumm);
    } else {
      const totalSumm = otherIngredients.reduce(
          (acc, i) => acc + i.price,
          0
      );
      // setTotalPrice(totalSumm);
      }
  }, [bun, otherIngredients,
    // setTotalPrice
  ]);
  
  return (
    (
    <section className={`${styles.section} pl-4`}>
      <div className={`${styles.listWrap} mb-10`}>
        <ConstructorList
          bun={bun}
          otherIngredients={otherIngredients}
          onRemove={onDeleteIngredient}
          key={otherIngredients.key}
        />
      </div>
      <div className={styles.orderWrap}>
        <span className={`${styles.iconWrap} mr-10`}>
          <p className='text text_type_main-medium mr-2'>
            {/*{totalPrice}*/}
          </p>
          <CurrencyIcon type='primary' />
        </span>
        <Button
            type='primary'
            size='medium'
            onClick={handleClick}
        >
          Оформить заказ
        </Button>
      </div>
        {isOpen && <Modal >
          <OrderDetails />
        </Modal>}
      </section>
    )
  );
});

BurgerConstructor.propTypes = {
  // isModalOpen: PropTypes.bool.isRequired,
  // onModalOpen: PropTypes.func.isRequired,
  // onModalClose: PropTypes.func.isRequired,
  // onDeleteIngredient: PropTypes.func.isRequired
};
