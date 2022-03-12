import {
  ADD_SELECTED_INGREDIENT,
  CLEAR_SELECTED_INGREDIENT_LIST,
  DELETE_SELECTED_INGREDIENT,
  MOVE_INGREDIENT
} from "../types/action-types";

export const addSelectIngredient = (ingredient) => {
  return { type: ADD_SELECTED_INGREDIENT, payload: ingredient }
}

export const removeSelectIngredient = (ingredient) => {
  return { type: DELETE_SELECTED_INGREDIENT, payload: ingredient }
}

export const clearSelectIngredientList = () => {
  return { type: CLEAR_SELECTED_INGREDIENT_LIST }
}

export const moveSelectIngredient = (ingredients, buns) => {
  return { type: MOVE_INGREDIENT,  ingredients: ingredients, buns: buns}
}