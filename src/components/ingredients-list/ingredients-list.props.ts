import { IIngredientData } from "../../utils/types";
import { RefObject } from "react";

export interface IngredientsListProps {
  filteredIngredients: Array<IIngredientData>;
  title: string;
  ref: RefObject<HTMLDivElement>
}