import React, { useState, useMemo, useCallback, useRef } from "react";

import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientsList } from "../ingredients-list/ingredients-list";
import Modal from "../modal/modal";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import { useDispatch, useSelector } from "react-redux";
import {REMOVE_CURRENT_INGREDIENT, RESET_INGREDIENTS} from "../../services/actions/types";
import noBurger from "../../images/no-burger.png";

export const BurgerIngredients = React.memo(() => {
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state?.ingredients.ingredients);
  console.log(ingredients)
  const ingredientsFailed = useSelector(
    (state) => state?.ingredients.ingredientsFailed
  );
  const currentIngredient = useSelector(
    (state) => state?.currentIngredient.ingredient
  );

  const [current, setCurrent] = useState("Булки");
  const buns = useMemo(
    () => ingredients.filter((i) => i.type === "bun"),
    [ingredients]
  );
  const sauces = useMemo(
    () => ingredients.filter((i) => i.type === "sauce"),
    [ingredients]
  );
  const mains = useMemo(
    () => ingredients.filter((i) => i.type === "main"),
    [ingredients]
  );

  const handleCurrent = useCallback((evt) => {
    setCurrent(evt);
  }, []);

  const bunsRef = useRef();
  const saucesRef = useRef();
  const mainsRef = useRef();
  const containerRef = useRef(null);

  function handleScroll() {
    const containerTop = containerRef.current.getBoundingClientRect().top;
    const bunsTop = bunsRef.current.getBoundingClientRect().top;
    const saucesTop = saucesRef.current.getBoundingClientRect().top;
    const mainsTop = mainsRef.current.getBoundingClientRect().top;
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
    dispatch({ type: REMOVE_CURRENT_INGREDIENT });
    ingredientsFailed &&
    dispatch({ type: RESET_INGREDIENTS });
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
          <img src={noBurger} alt='Катринка - нет бургеров' style={{width: 635}} className='mt-10'/>
        </Modal>
      )}
    </section>
  );
});
