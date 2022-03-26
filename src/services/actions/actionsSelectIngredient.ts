import {
  ADD_SELECTED_INGREDIENT,
  CLEAR_SELECTED_INGREDIENT_LIST,
  DELETE_SELECTED_INGREDIENT,
  MOVE_INGREDIENT,
} from "../types/action-types";
import { IIngredientData } from "../../utils/common-types";

export interface IAddSelectIngredientAction {
  readonly type: typeof ADD_SELECTED_INGREDIENT;
  payload: IIngredientData;
}

export interface IRemoveSelectIngredientAction {
  readonly type: typeof DELETE_SELECTED_INGREDIENT;
  payload: IIngredientData;
}

export interface IClearSelectIngredientListAction {
  readonly type: typeof CLEAR_SELECTED_INGREDIENT_LIST;
}

export interface IMoveSelectIngredientAction {
  readonly type: typeof MOVE_INGREDIENT;
  ingredients: Array<IIngredientData>;
  buns: Array<IIngredientData>;
}

export type TSelectIngredientsActions =
  IAddSelectIngredientAction |
  IRemoveSelectIngredientAction |
  IClearSelectIngredientListAction |
  IMoveSelectIngredientAction;

export const addSelectIngredient = (
  ingredient: IIngredientData
): IAddSelectIngredientAction => {
  return { type: ADD_SELECTED_INGREDIENT, payload: ingredient };
};

export const removeSelectIngredient = (
  ingredient: IIngredientData
): IRemoveSelectIngredientAction => {
  return { type: DELETE_SELECTED_INGREDIENT, payload: ingredient };
};

export const clearSelectIngredientList =
  (): IClearSelectIngredientListAction => {
    return { type: CLEAR_SELECTED_INGREDIENT_LIST };
  };

export const moveSelectIngredient = (
  ingredients: Array<IIngredientData>,
  buns: Array<IIngredientData>
): IMoveSelectIngredientAction => {
  return { type: MOVE_INGREDIENT, ingredients: ingredients, buns: buns };
};
