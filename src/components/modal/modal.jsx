import React, { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import style from './modal.module.css';
import closeIcon from '../../images/closeIcon.svg';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { ESC_KEYCODE } from '../../utils/constants';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from "react-redux";

const Modal = React.memo(({ title, children }) => {
  const modalRoot = document.getElementById('modals');
  const isIngredientModalOpen = useSelector(state => state?.modal.isIngredientModalOpen);
  const isOrderModalOpen = useSelector(state => state?.modal.isOrderModalOpen);
  const dispatch = useDispatch();

  const onClose = () => {
    isIngredientModalOpen || isOrderModalOpen && dispatch({type: 'CLOSE_ALL_MODAL'})
  };
  const isOpen =  isIngredientModalOpen || isOrderModalOpen;
  //функция закрытия модального окна по Escape
  const handleCloseByEsc = useCallback(
    (evt) => {
      isOpen && evt.key === ESC_KEYCODE && onClose();
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleCloseByEsc);

    return () => {
      window.removeEventListener('keydown', handleCloseByEsc);
    };
  }, [isOpen, onClose, handleCloseByEsc]);

  return createPortal(
    (
    <section className={`${style.wrap} ${isOpen && style.visible}`}>
      <ModalOverlay onClose={onClose} />
      <div className={`${style.modal} pt-10 pl-10 pr-10 pb-10`}>
        <div className={style.header}>
          <h2 className={`${style.title} text text_type_main-large`}>
            {title}
          </h2>
          <img
            onClick={onClose}
            src={closeIcon}
            alt='Кнопка закрытия'
            className={style.icon}
          />
        </div>
        {children}
      </div>
    </section>),
    modalRoot
  );
});

export default Modal;

// Modal.propTypes = {
//   isOpen: PropTypes.bool.isRequired,
//   title: PropTypes.string,
//   children: PropTypes.element,
//   onClose: PropTypes.func.isRequired,
// };
