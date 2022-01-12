import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import style from './modal.module.css';
import closeIcon from '../../images/closeIcon.svg';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { ESC_KEYCODE } from '../../utils/constants';

const Modal = ({ isOpen, title, children, onClose }) => {
  const modalRoot = document.getElementById('modals');

  useEffect(() => {
    //функция закрытия модального окна по оверлей
    const handleOverlayClose = (e) => {
      e.target.className.includes('overlay') && onClose();
    };

    //функция закрытия модального окна по Escape
    const handleCloseByEsc = (evt) => {
      isOpen && evt.key === ESC_KEYCODE && onClose();
    };

    window.addEventListener('keydown', handleCloseByEsc);
    window.addEventListener('click', handleOverlayClose);

    return () => {
      window.removeEventListener('click', handleOverlayClose);
      window.removeEventListener('keydown', handleCloseByEsc);
    };
  }, []);

  return createPortal(
    (
    <section className={`${style.wrap} ${isOpen && style.visible}`}>
      <ModalOverlay />
      <div className={style.modal}>
        <div className={style.header}>
          <h2 className='text="true" text_type_main-large pt-10 pb-15 pr-10 pl-10'>
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
      </section>
    ),
    modalRoot
  );
};

export default Modal;
