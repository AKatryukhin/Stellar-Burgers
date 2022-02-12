import {
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_ORDER_NUMBER_SUCCESS,
  GET_ORDER_REQUEST
} from "./types";

export const fetchIngredients = () => {
  return { type: GET_INGREDIENTS_REQUEST }
};

export const requestIngredientsSuccess = (data) => {
  return { type: GET_INGREDIENTS_SUCCESS, ingredients: data }
};

export const requestIngredientsFailed = () => {
  return { type: GET_INGREDIENTS_FAILED }
};
