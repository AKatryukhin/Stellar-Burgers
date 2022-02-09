import React, { useCallback } from "react";

import { IngredientDetails } from "../components";

import styles from "./ingredient-page.module.css";
import Modal from "../components/modal/modal";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useNavigationType, useParams } from "react-router-dom";
import { REMOVE_CURRENT_INGREDIENT, RESET_INGREDIENTS } from "../services/actions/types";

export const IngredientPage = () => {

  const ingredients = useSelector((state) => state?.ingredients.ingredients);
  console.log(ingredients)
  const action = useNavigationType();
  console.log(action)
  let { id } = useParams();
  const currentIngredient = ingredients.find(i => i._id = id);
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state && location.state.background;
  console.log(background)
  return (
    <>
      {background && action === "PUSH" ? (
        <Modal onClose={() => navigate(-1)} title="Детали ингредиента">
          <IngredientDetails currentIngredient={currentIngredient}/>
        </Modal>
      ) : (
        <section className={styles.page}>
          <h2 className="text text_type_main-large">Детали ингредиента</h2>
          <IngredientDetails currentIngredient={currentIngredient}/>
        </section>
      )}
    </>
  );
}
// const handleModalClose = useCallback(() => {
//   dispatch({ type: REMOVE_CURRENT_INGREDIENT });
//   ingredientsFailed && dispatch({ type: RESET_INGREDIENTS });
//   navigate(-1);
// }, [currentIngredient, ingredientsFailed]);

