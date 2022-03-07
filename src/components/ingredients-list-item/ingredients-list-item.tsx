import styles from "./ingredients-list-item.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { DragSourceMonitor, useDrag } from "react-dnd";
import {
  addCurrentIngredient,
  decreaseCount,
  increaseCount,
} from "../../services/actions/actionsIngredient";
import {
  addSelectIngredient,
  removeSelectIngredient,
} from "../../services/actions/actionsSelectIngredient";
import { FC } from "react";
import { IngredientsListItemProps } from "./ingredients-list-item.props";
import { IIngredientData } from "../../utils/types";

export const IngredientsItem: FC<IngredientsListItemProps> = ({ ingredient }) => {
  const navigate = useNavigate();
  const [{ isDrag }, drag] = useDrag({
    type: "place",
    item: { ingredient },
    collect: (monitor:DragSourceMonitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const dispatch = useDispatch();

  const isBunInOrder: IIngredientData = useSelector((state) =>
    // @ts-ignore
    state?.selectedIngredients.selectedIngredients.find((i: IIngredientData) => i.type === "bun")
  );
  const handleClick = () => {
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
      navigate(`/ingredients/${ingredient._id}`, {
        state: { background: true },
        replace: false,
      });
      return;
    }
    dispatch(addSelectIngredient({ ...ingredient, key: uuid() }));

    dispatch(addCurrentIngredient(ingredient));
    navigate(`/ingredients/${ingredient._id}`, {
      state: { background: true },
      replace: false,
    });
  };

  const { image, name, price } = ingredient;

  return (
    <article
      ref={drag}
      onClick={handleClick}
      className={`${styles.card} ${isDrag && styles.cardTransparent}`}
    >
      {ingredient?.count && <Counter count={ingredient.count} size="default" />}
      <img src={image} alt={name} className="mb-1" />
      <div className={`${styles.priceWrap} mb-1`}>
        <p className={`${styles.price} mr-2 text text_type_digits-default`}>
          {price}
        </p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.name} text text_type_main-small`}>{name}</p>
    </article>
  );
};


