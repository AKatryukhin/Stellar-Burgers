import { IIngredientData } from "../../utils/types";

export interface burgerConstructorListProps {
  bun?: IIngredientData;
  otherIngredients: Array<IIngredientData>;
}