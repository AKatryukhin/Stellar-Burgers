import React, { FC } from "react";
import styles from "./ingredient-details.module.css";
import { IngredientDetailsProps } from "./ingredient-details.props";

export const IngredientDetails: FC<IngredientDetailsProps> = React.memo(({ currentIngredient }) => {
  const { name, image_large, calories, proteins, fat, carbohydrates } =
    currentIngredient;

  return (
    <article className={styles.card}>
      <img src={image_large} alt={name} className="mb-4 mr-5 ml-5" />
      <p className={`${styles.name} text text_type_main-medium mb-8`} id='ingredient-name'>{name}</p>
      <div className={styles.infoWrap}>
        <div className={`${styles.infoContainer}`}>
          <p
            className={`${styles.info} text text_type_main-default text_color_inactive`}
          >
            Калории,ккал
          </p>
          <p
            className={`${styles.info} mr-2 text text_type_digits-default text_color_inactive`}
            id='calories'
          >
            {calories}
          </p>
        </div>
        <div className={`${styles.infoContainer}`}>
          <p
            className={`${styles.info} text text_type_main-default text_color_inactive`}
          >
            Белки, г
          </p>
          <p
            className={`${styles.info} mr-2 text text_type_digits-default text_color_inactive`}
            id='proteins'
          >
            {proteins}
          </p>
        </div>
        <div className={`${styles.infoContainer}`}>
          <p
            className={`${styles.info} text text_type_main-default text_color_inactive`}
          >
            Жиры, г
          </p>
          <p
            className={`${styles.info} mr-2 text text_type_digits-default text_color_inactive`}
            id='fat'
          >
            {fat}
          </p>
        </div>
        <div className={`${styles.infoContainer}`}>
          <p
            className={`${styles.info} text text_type_main-default text_color_inactive`}
          >
            Углеводы,г
          </p>
          <p
            className={`${styles.info} mr-2 text text_type_digits-default text_color_inactive`}
            id='carbohydrates'
          >
            {carbohydrates}
          </p>
        </div>
      </div>
    </article>
  );
});
