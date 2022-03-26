import { IIngredientData } from "../../utils/common-types";
import { RefObject } from "react";

export interface IngredientsListProps {
  filteredIngredients: Array<IIngredientData>;
  title: string;
  ref: RefObject<HTMLDivElement>
}