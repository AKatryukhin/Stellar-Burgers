import { IIngredientData } from "../../utils/common-types";

export interface OrderIngredientProps {
  counting: (el: IIngredientData) => number | undefined,
  elem: IIngredientData
}