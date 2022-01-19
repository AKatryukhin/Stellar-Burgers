import React from "react";

import style from './modal-overlay.module.css';

const ModalOverlay = ( {onClose}) => {
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