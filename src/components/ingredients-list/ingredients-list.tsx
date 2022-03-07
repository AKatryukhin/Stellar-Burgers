import React from "react";
import styles from "./ingredients-list.module.css";
import { IngredientsItem } from "../ingredients-list-item/ingredients-list-item";
import { IngredientsListProps } from "./ingredients-list.props";

export const IngredientsList = React.forwardRef<HTMLHeadingElement, IngredientsListProps>(
  ({ title, filteredIngredients }, ref) => {
    return (
      <div className={`${styles.listWrap} mb-10 custom-scroll`}>
        <h2 ref={ref} className={`${styles.title} mb-6`}>
          {title}
        </h2>
        <div className="pr-4 pl-4">
          <ul className={`${styles.list} custom-scroll`}>
            {filteredIngredients.map((i) => (
              <li key={i._id}>
                <IngredientsItem ingredient={i} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
);

