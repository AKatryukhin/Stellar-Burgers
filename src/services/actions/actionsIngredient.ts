import {
  ADD_CURRENT_INGREDIENT,
  CLEAR_INGREDIENT_LIST_COUNT,
  DECREASE_COUNT,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  INCREASE_COUNT,
  REMOVE_CURRENT_INGREDIENT,
  RESET_INGREDIENTS,
} from "../types/action-types";
import { IAllIngredientsResponse } from "../types/data-types";
import { IIngredientData } from "../../utils/common-types";


export interface IFetchIngredientsAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IRequestIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly ingredients: IAllIngredientsResponse;
}

export interface IRequestIngredientsFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export interface IResetIngredientsAction {
  readonly type: typeof RESET_INGREDIENTS;
}

export interface IIncreaseCountAction {
  readonly type: typeof INCREASE_COUNT;
  readonly ingredient: IIngredientData;
  readonly count: number;
}

export interface IDecreaseCountAction {
  readonly type: typeof DECREASE_COUNT;
  readonly ingredient: IIngredientData;
}

export interface IClearIngredientsCountAction {
  readonly type: typeof CLEAR_INGREDIENT_LIST_COUNT;
}

export interface IAddCurrentIngredientAction {
  readonly type: typeof ADD_CURRENT_INGREDIENT;
  readonly ingredient: IIngredientData;
}

export interface IRemoveCurrentIngredientAction {
  readonly type: typeof REMOVE_CURRENT_INGREDIENT;
}

export type TIngredientsActions =
  IFetchIngredientsAction |
  IRequestIngredientsSuccessAction |
  IRequestIngredientsFailedAction |
  IResetIngredientsAction |
  IIncreaseCountAction |
  IDecreaseCountAction |
  IClearIngredientsCountAction |
  IAddCurrentIngredientAction;

export const fetchIngredients = (): IFetchIngredientsAction => {
  return { type: GET_INGREDIENTS_REQUEST };
};

export const requestIngredientsSuccess = (
  data: IAllIngredientsResponse
): IRequestIngredientsSuccessAction => {
  return { type: GET_INGREDIENTS_SUCCESS, ingredients: data };
};

export const requestIngredientsFailed = (): IRequestIngredientsFailedAction => {
  return { type: GET_INGREDIENTS_FAILED };
};

export const resetIngredients = (): IResetIngredientsAction => {
  return { type: RESET_INGREDIENTS };
};

export const increaseCount = (
  ingredient: IIngredientData,
  count: number
): IIncreaseCountAction => {
  return { type: INCREASE_COUNT, ingredient: ingredient, count: count };
};

export const decreaseCount = (
  ingredient: IIngredientData
): IDecreaseCountAction => {
  return { type: DECREASE_COUNT, ingredient: ingredient };
};

export const clearIngredientsCount = (): IClearIngredientsCountAction => {
  return { type: CLEAR_INGREDIENT_LIST_COUNT };
};

export const addCurrentIngredient = (
  ingredient: IIngredientData
): IAddCurrentIngredientAction => {
  return { type: ADD_CURRENT_INGREDIENT, ingredient: ingredient };
};
export const removeCurrentIngredient = (): IRemoveCurrentIngredientAction => {
  return { type: REMOVE_CURRENT_INGREDIENT };
};
