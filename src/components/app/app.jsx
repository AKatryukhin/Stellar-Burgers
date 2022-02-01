import React, {useEffect} from "react";
import styles from "./app.module.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { AppHeader } from "../app-header/app-header";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import {GET_INGREDIENTS_REQUEST} from "../../services/actions/types";
import {useDispatch} from "react-redux";


export const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: GET_INGREDIENTS_REQUEST });
    }, []);

  return (
    <div className={styles.page}>
      <AppHeader />
      <main className={styles.main}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>
    </div>
  );
};
