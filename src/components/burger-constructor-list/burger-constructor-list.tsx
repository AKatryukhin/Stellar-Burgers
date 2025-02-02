import React, { FC } from "react";
import styles from "./burger-constructor-list.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import bunImage from "../../images/bun-02.png";
import { useSelector, useDispatch } from "../../services/hooks";
import { DropTargetMonitor, useDrop } from "react-dnd";
import { v4 as uuid } from "uuid";
import BurgerConstructorItem from "../burger-constructor-item/burger-constructor-item";
import { useCallback } from "react";
import {
  addSelectIngredient, moveSelectIngredient,
  removeSelectIngredient
} from "../../services/actions/actionsSelectIngredient";
import {
  decreaseCount,
  increaseCount,
} from "../../services/actions/actionsIngredient";
import { IIngredientData } from "../../utils/common-types";
import { burgerConstructorListProps } from "./burger-constructor-list.props";

export const BurgerConstructorList: FC<burgerConstructorListProps> = React.memo(({ bun, otherIngredients }) => {

  const isBunInOrder = useSelector((state) =>
    state.selectedIngredients.selectedIngredients.find((i) => i.type === "bun")
  );
  const handleClick = (ingredient: IIngredientData) => {
    if (ingredient.type !== "bun") {
      ingredient.count
        ? dispatch(increaseCount(ingredient, ingredient.count + 1))
        : dispatch(increaseCount(ingredient, 1));
    }
    if (ingredient.type === "bun" && !isBunInOrder) {
      dispatch(increaseCount(ingredient, 2));
    }
    if (
      ingredient.type === "bun" &&
      isBunInOrder &&
      ingredient._id !== isBunInOrder._id
    ) {
      dispatch(removeSelectIngredient(isBunInOrder));
      dispatch(decreaseCount(isBunInOrder));
      dispatch(increaseCount(ingredient, 2));
    }
    if (
      ingredient.type === "bun" &&
      isBunInOrder &&
      ingredient._id === isBunInOrder._id
    ) {
      return;
    }
    dispatch(addSelectIngredient({ ...ingredient, key: uuid() }));
  };


  const [{ isHover }, drop] = useDrop({
    accept: "place",
    collect: (monitor: DropTargetMonitor) => ({
      isHover: monitor.isOver(),
    }),
    // @ts-ignore
    drop({ ingredient }) {
      handleClick(ingredient);
    },
  });

  const dispatch = useDispatch();

  const onClose = useCallback((item) => {
    dispatch(removeSelectIngredient(item));
    dispatch(decreaseCount(item));
  }, [dispatch]);


  const selectedIngredients = useSelector(
    (state) => state.selectedIngredients.selectedIngredients
  );

  const moveItems = useCallback(
    (dragIndex, hoverIndex) => {
      const newIngredients = [...selectedIngredients].filter(
        (i) => i.type !== "bun"
      );
      const newBuns = [...selectedIngredients].filter((i) => i.type === "bun");
      newIngredients.splice(
        hoverIndex,
        0,
        newIngredients.splice(dragIndex, 1)[0]
      );
      dispatch(moveSelectIngredient(newIngredients, newBuns))
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
            // @ts-ignore
            isHover={isHover}
          />
        ) : (
          <ConstructorElement
            // @ts-ignore
            className="mt-4"
            type="top"
            isLocked={true}
            text="Выберите булку"
            price={0}
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
            // @ts-ignore
            isHover={isHover}
          />
        ) : (
          <ConstructorElement
            // @ts-ignore
            className="mt-4"
            type="bottom"
            isLocked={true}
            text="Выберите булку"
            price={0}
            thumbnail={bunImage}
            isHover={isHover}
          />
        )}
      </div>
    </div>
  );
});


