import React, { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import style from "./modal.module.css";
import closeIcon from "../../images/closeIcon.svg";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { ESC_KEYCODE } from "../../utils/constants";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const Modal = React.memo(({ title, children, onClose }) => {
  const modalRoot = document.getElementById("modals");
  const order = useSelector(state => state?.order.orderNumber);
  const currentIngredient = useSelector(
      (state) => state?.currentIngredient.ingredient
  );

  //функция закрытия модального окна по Escape
  const handleCloseByEsc = useCallback(
    (evt) => {
      evt.key === ESC_KEYCODE && onClose();
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleCloseByEsc);

    return () => {
      window.removeEventListener("keydown", handleCloseByEsc);
    };
  }, [handleCloseByEsc]);

  return createPortal(
    <section className={`${style.wrap} ${order && style.visible} ${currentIngredient && style.visible}`}>
      <ModalOverlay onClose={onClose} />
      <div className={`${style.modal} pt-10 pl-10 pr-10 pb-10`}>
        <div className={style.header}>
          <h2 className={`${style.title} text text_type_main-large`}>
            {title}
          </h2>
          <img
            onClick={onClose}
            src={closeIcon}
            alt="Кнопка закрытия"
            className={style.icon}
          />
        </div>
        {children}
      </div>
    </section>,
    modalRoot
  );
});

export default Modal;

Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.element,
};
