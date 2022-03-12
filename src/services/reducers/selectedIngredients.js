 import {
  ADD_SELECTED_INGREDIENT,
  CHANGE_SELECTED_INGREDIENT,
  CLEAR_SELECTED_INGREDIENT_LIST,
  DELETE_SELECTED_INGREDIENT,
  MOVE_INGREDIENT,
} from "../types/action-types";

const initialState = {
  selectedIngredients: [],
};
export const selectedIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case MOVE_INGREDIENT: {
      return {
        ...state,
        selectedIngredients: [...action.ingredients, ...action.buns]
      };
    }
    case ADD_SELECTED_INGREDIENT: {
      return {
        ...state,
        selectedIngredients: [...state.selectedIngredients, action.payload],
      };
    }
    case CHANGE_SELECTED_INGREDIENT: {
      return {
        ...state,
        selectedIngredients: [
          ...state.selectedIngredients.filter((i) => i.type !== "bun"),
          action.payload,
        ],
      };
    }
    case DELETE_SELECTED_INGREDIENT:
      return {
        ...state,
        selectedIngredients: [...state.selectedIngredients].filter(
          (i) => i.key !== action.payload.key
        ),
      };
    case CLEAR_SELECTED_INGREDIENT_LIST: {
      return initialState;
    }
    default:
      return state;
  }
};
