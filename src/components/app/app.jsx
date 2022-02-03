import React, {useEffect} from "react";
import styles from "./app.module.css";
import { AppHeader } from "../app-header/app-header";
import {GET_INGREDIENTS_REQUEST} from "../../services/actions/types";
import {useDispatch} from "react-redux";
import Main from "../main/main";


export const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: GET_INGREDIENTS_REQUEST });
    }, []);

  return (
    <div className={styles.page}>
      <AppHeader />
      <Main/>
    </div>
  );
};
