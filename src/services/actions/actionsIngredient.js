import {
  ADD_CURRENT_INGREDIENT, CLEAR_INGREDIENT_LIST_COUNT, DECREASE_COUNT,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS, INCREASE_COUNT, REMOVE_CURRENT_INGREDIENT, RESET_INGREDIENTS
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

export const increaseCount = (ingredient, count) => {
  return { type: INCREASE_COUNT, ingredient: ingredient, count: count }
}

export const decreaseCount = (ingredient) => {
  return { type: DECREASE_COUNT, ingredient: ingredient }
}

export const clearIngredientsCount = () => {
  return { type: CLEAR_INGREDIENT_LIST_COUNT }
}

export const addCurrentIngredient = (ingredient) => {
  return { type: ADD_CURRENT_INGREDIENT, ingredient: ingredient }
}
export const removeCurrentIngredient = () => {
  return { type: REMOVE_CURRENT_INGREDIENT }
}


