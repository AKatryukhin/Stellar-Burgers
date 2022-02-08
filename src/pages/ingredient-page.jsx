import React from "react";

import { IngredientDetails }from "../components/ingredient-details/ingredient-details";

import styles from "./ingredient-page.module.css";

export const IngredientPage = () => {
  return (
    <section className={styles.page}>
      <h2 className="text text_type_main-large">Детали ингредиента</h2>
      <IngredientDetails />
    </section>
  );
}

