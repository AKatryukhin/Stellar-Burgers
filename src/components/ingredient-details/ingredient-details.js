import styles from './ingredient-details.module.css';

export const IngredientDetails = ({ item }) => {
  return (
    (
    <article className={styles.card}>
      <img
        src={item.image_large}
        alt={item.name}
        className='mb-4 mr-5 ml-5'
      ></img>
      <p className={`${styles.name} text="true" text_type_main-medium mb-8`}>
        {item.name}
      </p>
      <div className={styles.infoWrap}>
        <div className={`${styles.infoContainer}`}>
          <p className={`${styles.info} text="true" text_type_main-default text_color_inactive`}>
          Калории,ккал
          </p>
          <p className={`${styles.info} mr-2 text="true" text_type_digits-default text_color_inactive`}>
            {item.calories}
          </p>
        </div>
        <div className={`${styles.infoContainer}`}>
          <p className={`${styles.info} text="true" text_type_main-default text_color_inactive`}>
          Белки, г
          </p>
          <p className={`${styles.info} mr-2 text="true" text_type_digits-default text_color_inactive`}>
            {item.proteins}
          </p>
        </div>
        <div className={`${styles.infoContainer}`}>
          <p className={`${styles.info} text="true" text_type_main-default text_color_inactive`}>
          Жиры, г
          </p>
          <p className={`${styles.info} mr-2 text="true" text_type_digits-default text_color_inactive`}>
            {item.fat}
          </p>
        </div>
        <div className={`${styles.infoContainer}`}>
          <p className={`${styles.info} text="true" text_type_main-default text_color_inactive`}>
          Углеводы,г
          </p>
          <p className={`${styles.info} mr-2 text="true" text_type_digits-default text_color_inactive`}>
            {item.carbohydrates}
          </p>
        </div>
      </div>
      </article>
    )
  );
};
