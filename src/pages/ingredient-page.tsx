import React, { FC, useCallback } from "react";

import { IngredientDetails } from "../components";

import styles from "./ingredient-page.module.css";
import Modal from "../components/modal/modal";
import { useSelector, useDispatch } from "../services/hooks";
import { useLocation, useNavigate, useNavigationType, useParams } from "react-router-dom";
import { removeCurrentIngredient, resetIngredients } from "../services/actions/actionsIngredient";
import { IIngredientData } from "../utils/common-types";

export const IngredientPage: FC = () => {

  const ingredients: Array<IIngredientData> = useSelector((state) => state?.ingredients.ingredients);

  const ingredientsFailed: boolean = useSelector(
    (state) => state?.ingredients.ingredientsFailed
  );
  const dispatch = useDispatch();
  const action = useNavigationType();
  let { ingredientId } = useParams<{ ingredientId: string }>();
  // @ts-ignore
  const currentIngredient: IIngredientData = ingredients.find(i => i._id === ingredientId);
  const navigate = useNavigate();
  const location = useLocation();
  // @ts-ignore
  const background = location.state && location.state.background;

  const handleModalClose = useCallback(() => {
  dispatch(removeCurrentIngredient());
  ingredientsFailed && dispatch(resetIngredients());
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


