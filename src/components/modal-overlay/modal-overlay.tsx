import React, { FC } from "react";
import style from './modal-overlay.module.css';
import { ModalOverlayProps } from "./modal-overlay.props";

const ModalOverlay: FC<ModalOverlayProps> = ( {onClose}) => {
 //функция закрытия модального окна по оверлей
  const handleOverlay = (e: React.SyntheticEvent<EventTarget>) => {
    if (e.target === e.currentTarget) {
      if (onClose) {
        onClose();
      }
    }
 };

  return (
    (
      <div onClick={handleOverlay} className={style.overlay}/>
    )
  )
};


export default ModalOverlay;