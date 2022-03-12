import React, { FC, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import { DropTargetMonitor, useDrag, useDrop, XYCoord } from "react-dnd";
import styles from "./burger-constructor-item.module.css";
import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerConstructorItemProps } from "./burger-constructor-item.props";
import { IIngredientData } from "../../utils/common-types";

const BurgerConstructorItem: FC<BurgerConstructorItemProps> = ({
  index,
  text,
  price,
  thumbnail,
  handleClose,
  isHover,
  id,
  moveItems,
}) => {
  const ref = useRef<HTMLLIElement>(null);
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
    hover(item: IIngredientData, monitor: DropTargetMonitor) {
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
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
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
        <DragIcon type="primary" />
      </span>
      <ConstructorElement
        text={text}
        price={price}
        thumbnail={thumbnail}
        handleClose={handleClose}
        // @ts-ignore
        isHover={isHover}
      />
    </li>
  );
};

export default BurgerConstructorItem;
