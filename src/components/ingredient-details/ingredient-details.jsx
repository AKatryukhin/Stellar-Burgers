import React from 'react';
import styles from './ingredient-details.module.css';
import { itemPropTypes } from '../../utils/types';
import {useSelector} from "react-redux";

export const IngredientDetails = React.memo(() => {
  const currentIngredient = useSelector(state => state?.currentIngredient.ingredient);
  console.log(currentIngredient)
  const {
    name,
    image_large,
    calories,
    proteins,
    fat,
    carbohydrates
  } = currentIngredient;

  return (
    (
    <article className={styles.card}>
      <img src={image_large} alt={name} className='mb-4 mr-5 ml-5'/>
      <p className={`${styles.name} text text_type_main-medium mb-8`}>
        {name}
      </p>
      <div className={styles.infoWrap}>
        <div className={`${styles.infoContainer}`}>
          <p
            className={`${styles.info} text text_type_main-default text_color_inactive`}
          >
            Калории,ккал
          </p>
          <p
            className={`${styles.info} mr-2 text text_type_digits-default text_color_inactive`}
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
          >
            {carbohydrates}
          </p>
        </div>
      </div>
      </article>
    )
  );
});

IngredientDetails.propTypes = {
  ingredient: itemPropTypes.isRequired,
};
