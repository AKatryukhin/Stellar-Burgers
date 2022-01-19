import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import style from './modal.module.css';
import closeIcon from '../../images/closeIcon.svg';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { ESC_KEYCODE } from '../../utils/constants';
import PropTypes from 'prop-types';

const Modal = React.memo(({ isOpen, title, children, onClose }) => {
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
  }, [isOpen, onClose]);

  return createPortal(
    (
    <section className={`${style.wrap} ${isOpen && style.visible}`}>
      <ModalOverlay />
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
      </section>
    ),
    modalRoot
  );
});

export default Modal;

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string,
  children: PropTypes.element,
  onClose: PropTypes.func.isRequired
};

