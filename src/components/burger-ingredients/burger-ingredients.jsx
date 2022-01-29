import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
  useRef,
} from "react";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientsList } from "../ingredients-list/ingredients-list";
import PropTypes from "prop-types";
import { itemPropTypes } from "../../utils/types";
import Modal from "../modal/modal";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import { useDispatch, useSelector } from "react-redux";
import { GET_INGREDIENTS_REQUEST } from "../../services/actions/types";

export const BurgerIngredients = React.memo(() => {
  const ingredients = useSelector((state) => state?.ingredients.ingredients);
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
  const isOpen = useSelector((state) => state?.modal.isIngredientModalOpen);
  const currentIngredient = useSelector(
    (state) => state?.currentIngredient.ingredient
  );
  const handleCurrent = useCallback((evt) => {
    setCurrent(evt);
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: GET_INGREDIENTS_REQUEST });
  }, []);

  const bunsRef = useRef();
  const saucesRef = useRef();
  const mainsRef = useRef();
  const containerRef = useRef(null);

  function handleScroll() {
    const containerTop = containerRef.current.getBoundingClientRect().top;
    console.log(containerTop);
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
      {isOpen && (
        <Modal title="Детали ингредиента">
          {currentIngredient && <IngredientDetails />}
        </Modal>
      )}
    </section>
  );
});

BurgerIngredients.propTypes = {
  // isModalOpen: PropTypes.bool.isRequired,
  // onModalOpen: PropTypes.func.isRequired,
  // onModalClose: PropTypes.func.isRequired,
  currentIngredient: itemPropTypes,
};
