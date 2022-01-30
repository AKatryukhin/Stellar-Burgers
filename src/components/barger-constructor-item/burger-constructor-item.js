import React, {useCallback, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { useDrag, useDrop } from "react-dnd";
import styles from "./burger-constructor-item.module.css";
import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { MOVE_INGREDIENT } from "../../services/actions/types";

const BurgerConstructorItem = ({
  index,
  text,
  price,
  thumbnail,
  handleClose,
  isHover,
  id,
}) => {
  const dispatch = useDispatch();
  const selectedIngredients = useSelector(
    (state) => state?.selectedIngredients.selectedIngredients
  );

  const moveItems = useCallback((dragIndex, hoverIndex) => {
    const newSelectedIngredients = [...selectedIngredients];
    newSelectedIngredients.splice(
      hoverIndex,
      0,
      newSelectedIngredients.splice(dragIndex, 1)[0]
    );
    dispatch({
      type: MOVE_INGREDIENT,
      payload: newSelectedIngredients,
    });
  }, [selectedIngredients, dispatch]);
  const ref = useRef(null);

  const [{ isDrag }, dragItem] = useDrag({
    type: "constructor",
    item: { id, index },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const [, dropItem] = useDrop({
    accept: "constructor",
    hover: (item, monitor) => {
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
  dragItem(dropItem(ref));

  return (
    <li>
      <div
        ref={ref}
        className={`${styles.itemWrap} ${isHover && styles.onDrop} ${
          isDrag && styles.onDrop
        }`}
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
      </div>
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
