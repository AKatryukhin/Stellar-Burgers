import { IngredientDetails } from "../components";
import styles from './ingredient.module.css';

export const Ingredient = () => {
  return (
    <section className={styles.wrap}>
      <h2 className="text text_type_main-large">Детали ингредиента</h2>
      <IngredientDetails />
    </section>
  );
}