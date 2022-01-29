import React, { useEffect, useState, useCallback } from "react";
import styles from "./app.module.css";
import { AppHeader } from "../app-header/app-header";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import { useDispatch } from "react-redux";

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "GET_INGREDIENTS_REQUEST" });
  }, []);

  return (
    <div className={styles.page}>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </div>
  );
};
