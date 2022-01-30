import {
  ADD_SELECTED_INGREDIENT, CHANGE_SELECTED_INGREDIENT,
  CLEAR_SELECTED_INGREDIENT_LIST,
  DELETE_SELECTED_INGREDIENT,
  RESET_TOTAL_PRICE,
  SET_TOTAL_PRICE,
} from "../actions/types";

const initialState = {
  selectedIngredients: [],
  totalPrice: null,
};
export const selectedIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SELECTED_INGREDIENT: {
      return {
        ...state,
        selectedIngredients: [...state.selectedIngredients, action.payload],
      };
    }
    case CHANGE_SELECTED_INGREDIENT: {
      return {
        ...state,
        selectedIngredients: [...state.selectedIngredients.filter(i => i.type !== 'bun'), action.payload],
      };
    }
    case DELETE_SELECTED_INGREDIENT:
      return {
        ...state,
        selectedIngredients: [...state.selectedIngredients].filter(
          (i) => i.key !== action.payload.key
        ),
      };
    case SET_TOTAL_PRICE:
      return {
        ...state,
        totalPrice: action.payload,
      };
    case RESET_TOTAL_PRICE:
      return {
        ...state,
        totalPrice: null,
      };
    case CLEAR_SELECTED_INGREDIENT_LIST: {
      return initialState;
    }
    default:
      return state;
  }
};
