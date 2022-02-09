import React, { useCallback } from "react";

import { IngredientDetails } from "../components";

import styles from "./ingredient-page.module.css";
import Modal from "../components/modal/modal";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useNavigationType, useParams } from "react-router-dom";
import { REMOVE_CURRENT_INGREDIENT, RESET_INGREDIENTS } from "../services/actions/types";

export const IngredientPage = () => {

  const ingredients = useSelector((state) => state?.ingredients.ingredients);
  console.log(ingredients)
  const ingredientsFailed = useSelector(
    (state) => state?.ingredients.ingredientsFailed
  );
  const dispatch = useDispatch();
  const action = useNavigationType();
  console.log(action)
  let { ingredientId } = useParams();
  console.log(ingredientId)
  const currentIngredient = ingredients.find(i => i._id == ingredientId);
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state && location.state.background;

  const handleModalClose = useCallback(() => {
  dispatch({ type: REMOVE_CURRENT_INGREDIENT });
  ingredientsFailed && dispatch({ type: RESET_INGREDIENTS });
  navigate(-1);
}, [currentIngredient, ingredientsFailed]);

  return (
    <>
      {background && action === "PUSH" ? (
        <Modal onClose={handleModalClose} title="Детали ингредиента">
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


