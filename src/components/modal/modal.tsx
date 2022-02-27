import React, { useEffect, useCallback, FC } from "react";
import { createPortal } from "react-dom";
import style from "./modal.module.css";
import closeIcon from "../../images/closeIcon.svg";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { ESC_KEYCODE } from "../../utils/constants";
import { ModalProps } from "./modal.props";


const Modal: FC<ModalProps> = React.memo(({ title, children, onClose }) => {
  const modalRoot = document.getElementById("modals") as HTMLElement;

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
    <section>
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
