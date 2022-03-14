import React, { useState, useMemo, useCallback, useRef, FC } from "react";

import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientsList } from "../ingredients-list/ingredients-list";
import Modal from "../modal/modal";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import noBurger from "../../images/no-burger.png";
import {
  removeCurrentIngredient,
  resetIngredients,
} from "../../services/actions/actionsIngredient";
import { IIngredientData } from "../../utils/common-types";
import { useSelector, useDispatch } from "../../services/hooks";

export const BurgerIngredients: FC = React.memo(() => {
  const dispatch = useDispatch();
  const ingredients: Array<IIngredientData> = useSelector(
    (state) => state?.ingredients.ingredients
  );
  const ingredientsFailed: boolean = useSelector(
    (state) => state?.ingredients.ingredientsFailed
  );
  const currentIngredient: IIngredientData = useSelector(
    (state) => state.currentIngredient.ingredient
  );

  const [current, setCurrent] = useState<string>("Булки");
  const buns: Array<IIngredientData> = useMemo(
    () => ingredients.filter((i: IIngredientData) => i.type === "bun"),
    [ingredients]
  );
  const sauces: Array<IIngredientData> = useMemo(
    () => ingredients.filter((i: IIngredientData) => i.type === "sauce"),
    [ingredients]
  );
  const mains: Array<IIngredientData> = useMemo(
    () => ingredients.filter((i: IIngredientData) => i.type === "main"),
    [ingredients]
  );

  const handleCurrent = useCallback((e: any) => {
    setCurrent(e);
  }, []);

  const bunsRef = useRef<HTMLDivElement>(null);
  const saucesRef = useRef<HTMLDivElement>(null);
  const mainsRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  function handleScroll() {
    const containerTop = containerRef.current
      ? containerRef.current.getBoundingClientRect().top
      : 0;
    const bunsTop = bunsRef.current
      ? bunsRef.current.getBoundingClientRect().top
      : 0;
    const saucesTop = saucesRef.current
      ? saucesRef.current.getBoundingClientRect().top
      : 0;
    const mainsTop = mainsRef.current
      ? mainsRef.current.getBoundingClientRect().top
      : 0;
    const bunsAbs = Math.abs(containerTop - bunsTop);
    const saucesAbs = Math.abs(containerTop - saucesTop);
    const mainsAbs = Math.abs(containerTop - mainsTop);

    if (bunsAbs < saucesAbs) {
      setCurrent("Булки");
    } else if (saucesAbs < mainsAbs) {
      setCurrent("Соусы");
    } else {
      setCurrent("Начинки");
    }
  }

  const onClose = useCallback(() => {
    dispatch(removeCurrentIngredient());
    ingredientsFailed && dispatch(resetIngredients());
  }, [currentIngredient, ingredientsFailed]);

  return (
    <section className={`${styles.section}`}>
      <h1 className={`${styles.title} text text_type_main-large pt-10 mb-5`}>
        Соберите бургер
      </h1>
      <div className={`${styles.tabWrap} mb-10`}>
        <Tab value="one" active={current === "Булки"} onClick={handleCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === "Соусы"} onClick={handleCurrent}>
          Соусы
        </Tab>
        <Tab
          value="three"
          active={current === "Начинки"}
          onClick={handleCurrent}
        >
          Начинки
        </Tab>
      </div>
      <div
        className={`${styles.listWrap} custom-scroll`}
        onScroll={() => handleScroll()}
        id="containerElement"
        ref={containerRef}
      >
        <IngredientsList
          filteredIngredients={buns}
          title="Булки"
          ref={bunsRef}
        />
        <IngredientsList
          filteredIngredients={sauces}
          title="Соусы"
          ref={saucesRef}
        />
        <IngredientsList
          filteredIngredients={mains}
          title="Начинки"
          ref={mainsRef}
        />
      </div>
      {currentIngredient && (
        <Modal title="Детали ингредиента" onClose={onClose}>
          <IngredientDetails currentIngredient={currentIngredient} />
        </Modal>
      )}
      {ingredientsFailed && (
        <Modal
          title="При загрузке ингредиентов произошла ошибка:("
          onClose={onClose}
        >
          <img
            src={noBurger}
            alt="Катринка - нет бургеров"
            style={{ width: 635 }}
            className="mt-10"
          />
        </Modal>
      )}
    </section>
  );
});
