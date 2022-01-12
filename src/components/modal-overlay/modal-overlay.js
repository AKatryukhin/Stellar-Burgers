import React from "react";

import style from './modal-overlay.module.css';


const ModalOverlay = ({ onClose }) => {

  return (
  <div onClick={onClose} className={style.overlay}></div>
  )
};

export default ModalOverlay;