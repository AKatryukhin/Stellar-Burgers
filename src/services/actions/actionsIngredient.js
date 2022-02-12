import {
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS, INCREASE_COUNT, RESET_INGREDIENTS
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

export const resetIngredients = () => {
  return { type: RESET_INGREDIENTS }
};

export const increaseCount = (ingredient) => {
  return { type: INCREASE_COUNT }
}
