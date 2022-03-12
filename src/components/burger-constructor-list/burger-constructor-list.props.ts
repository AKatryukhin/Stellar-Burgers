import { IIngredientData } from "../../utils/common-types";

export interface burgerConstructorListProps {
  bun?: IIngredientData;
  otherIngredients: Array<IIngredientData>;
}