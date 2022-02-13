import React, { useCallback, useRef } from "react";
import PropTypes from "prop-types";
import { useDrag, useDrop } from "react-dnd";
import styles from "./burger-constructor-item.module.css";
import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerConstructorItem = ({
  index,
  text,
  price,
  thumbnail,
  handleClose,
  isHover,
  id,
  moveItems,
}) => {
  const ref = useRef(null);

  const [{ isDrag }, dragItem] = useDrag({
    type: "constructor-card",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const [, dropItem] = useDrop({
    accept: "constructor-card",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveItems(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const opacity = isDrag ? 0 : 1;
  dragItem(dropItem(ref));

  return (
    <li
      ref={ref}
      className={`${styles.itemWrap} ${isHover && styles.onDrop} ${
        isDrag && styles.onDrop
      }`}
      style={{ opacity }}
    >
      <span className="mr-3">
        <DragIcon type="primary" className="mr-6" />
      </span>
      <ConstructorElement
        text={text}
        price={price}
        thumbnail={thumbnail}
        handleClose={handleClose}
        isHover={isHover}
      />
    </li>
  );
};

BurgerConstructorItem.propTypes = {
  index: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  isHover: PropTypes.bool,
};

export default BurgerConstructorItem;
