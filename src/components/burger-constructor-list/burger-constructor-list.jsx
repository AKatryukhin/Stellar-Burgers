import styles from "./burger-constructor-list.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { itemPropTypes } from "../../utils/types";
import bunImage from "../../images/bun-02.png";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_SELECTED_INGREDIENT,
  DECREASE_COUNT,
  DELETE_SELECTED_INGREDIENT,
  INCREASE_COUNT,
  MOVE_INGREDIENT,
} from "../../services/actions/types";
import { useDrop } from "react-dnd";
import { v4 as uuid } from "uuid";
import BurgerConstructorItem from "../burger-constructor-item/burger-constructor-item";
import { useCallback } from "react";

export const BurgerConstructorList = ({ bun, otherIngredients }) => {
  const isBunInOrder = useSelector((state) =>
    state?.selectedIngredients.selectedIngredients.find((i) => i.type === "bun")
  );
  const handleClick = (ingredient) => {
    if (ingredient.type !== "bun") {
      ingredient.count
        ? dispatch({
            type: INCREASE_COUNT,
            ingredient: ingredient,
            count: ingredient.count + 1,
          })
        : dispatch({
            type: INCREASE_COUNT,
            ingredient: ingredient,
            count: 1,
          });
    }
    if (ingredient.type === "bun" && !isBunInOrder) {
      dispatch({
        type: INCREASE_COUNT,
        ingredient: ingredient,
        count: 2,
      });
    }
    if (ingredient.type === "bun" && isBunInOrder) {
      dispatch({
        type: DELETE_SELECTED_INGREDIENT,
        payload: isBunInOrder,
      });
      dispatch({
        type: DECREASE_COUNT,
        ingredient: isBunInOrder,
      });
      dispatch({
        type: INCREASE_COUNT,
        ingredient: ingredient,
        count: 2,
      });
    }
    dispatch({
      type: ADD_SELECTED_INGREDIENT,
      payload: { ...ingredient, key: uuid() },
    });
  };

  const [{ isHover }, drop] = useDrop({
    accept: "place",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop({ ingredient }) {
      handleClick(ingredient);
    },
  });

  const dispatch = useDispatch();
  const onClose = (item) => {
    dispatch({
      type: DELETE_SELECTED_INGREDIENT,
      payload: item,
    });
    dispatch({
      type: DECREASE_COUNT,
      ingredient: item,
    });
  };

  const selectedIngredients = useSelector(
    (state) => state?.selectedIngredients.selectedIngredients
  );

  const moveItems = useCallback(
    (dragIndex, hoverIndex) => {
      const newCards = [...selectedIngredients];
      newCards.splice(hoverIndex, 0, newCards.splice(dragIndex, 1)[0]);
      dispatch({ type: MOVE_INGREDIENT, payload: newCards });
    },
    [selectedIngredients, dispatch]
  );

  return (
    <div className={`${styles.wrap} mt-25 mb-10`} ref={drop}>
      <div
        className={`${styles.itemWrap} ${
          isHover && styles.onDrop
        } ml-8 no-sroll`}
      >
        {bun ? (
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
            key={bun.key}
            isHover={isHover}
          />
        ) : (
          <ConstructorElement
            className="mt-4"
            type="top"
            isLocked={true}
            text="Выберите булку"
            price=""
            thumbnail={bunImage}
            isHover={isHover}
          />
        )}
      </div>
      {otherIngredients.length > 0 ? (
        <ul className={`${styles.list} custom-scroll`}>
          {otherIngredients.map((i, index) => (
            <BurgerConstructorItem
              key={i.key}
              id={i.key}
              text={i.name}
              thumbnail={i.image}
              handleClose={() => onClose(i)}
              price={i.price}
              index={index}
              moveItems={moveItems}
            />
          ))}
        </ul>
      ) : (
        <div className={`${styles.messageWrap}`}>
          <p
            className={`${styles.message} text text_type_main-default text_color_inactive`}
          >
            Выберите начинку
          </p>
        </div>
      )}
      <div className={`${styles.itemWrap} ${isHover && styles.onDrop} ml-8`}>
        {bun ? (
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
            isHover={isHover}
          />
        ) : (
          <ConstructorElement
            className="mt-4"
            type="bottom"
            isLocked={true}
            text="Выберите булку"
            price=""
            thumbnail={bunImage}
            isHover={isHover}
          />
        )}
      </div>
    </div>
  );
};

BurgerConstructorList.propTypes = {
  otherIngredients: PropTypes.arrayOf(itemPropTypes.isRequired).isRequired,
  bun: itemPropTypes,
};
