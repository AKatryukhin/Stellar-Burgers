import React from "react";

import style from './modal-overlay.module.css';
import {useDispatch, useSelector} from "react-redux";

const ModalOverlay = () => {

    const dispatch = useDispatch();
    const isIngredientModalOpen = useSelector(state => state?.modal.isIngredientModalOpen);
    const isOrderModalOpen = useSelector(state => state?.modal.isOrderModalOpen);
    const onClose = () => {
        if(isIngredientModalOpen) {
            dispatch({type: 'CLOSE_ALL_MODAL'})
        }
        if(isOrderModalOpen) {
            dispatch({type: 'CLOSE_ALL_MODAL'});
            dispatch({type: 'CLEAR_LIST'});
            dispatch({type: 'RESET_ORDER_NUMBER'});
        }
    };
 //функция закрытия модального окна по оверлей
  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
 };

  return (
    (
      <div onClick={handleOverlay} className={style.overlay}></div>
    )
  )
};


export default ModalOverlay;