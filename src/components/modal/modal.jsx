import React, { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import style from "./modal.module.css";
import closeIcon from "../../images/closeIcon.svg";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { ESC_KEYCODE } from "../../utils/constants";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  CLEAR_INGREDIENT_LIST_COUNT,
  CLEAR_SELECTED_INGREDIENT_LIST,
  REMOVE_CURRENT_INGREDIENT,
  RESET_ORDER_NUMBER
} from "../../services/actions/types";

const Modal = React.memo(({ title, children }) => {
  const modalRoot = document.getElementById("modals");

  const dispatch = useDispatch();
  const order = useSelector(state => state?.order.orderNumber);
  const currentIngredient = useSelector(
      (state) => state?.currentIngredient.ingredient
  );

  const onClose = useCallback(() => {
    if (currentIngredient) {
      dispatch({ type: REMOVE_CURRENT_INGREDIENT });
    }
    if (order) {
      dispatch({ type: CLEAR_SELECTED_INGREDIENT_LIST });
      dispatch({ type: CLEAR_INGREDIENT_LIST_COUNT });
      dispatch({ type: RESET_ORDER_NUMBER });
    }
  }, [dispatch, currentIngredient, order]);

  //функция закрытия модального окна по Escape
  const handleCloseByEsc = useCallback(
    (evt) => {
      currentIngredient &&
      evt.key === ESC_KEYCODE && onClose();
      order &&
      evt.key === ESC_KEYCODE && onClose();
    },
    [order, currentIngredient, onClose]
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
