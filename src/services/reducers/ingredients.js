import {
  CLEAR_INGREDIENT_LIST_COUNT,
  DECREASE_COUNT,
  GET_INGREDIENTS_FAILED, GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  INCREASE_COUNT
} from "../actions/types";

const initialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsFailed: false,
        ingredients: action.ingredients,
        ingredientsRequest: false,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        itemsFailed: true,
        itemsRequest: false,
      };
    }
    case INCREASE_COUNT: {
      const item = action.ingredient;
      const newIngredients = state.ingredients.filter(
        (i) => i._id !== item._id
      );
      return {
        ...state,
        ingredients: [...newIngredients, { ...item, count: action.count }],
      };
    }
    case DECREASE_COUNT: {
      const item = state.ingredients.find(
        (i) => i._id === action.ingredient._id
      );
      const newIngredients = state.ingredients.filter(
        (i) => i._id !== item._id
      );
      if (item.count >= 1) {
        return {
          ...state,
          ingredients: [...newIngredients, { ...item, count: item.count - 1 }],
        };
      }
      return {
        ...state,
        ingredients: [...newIngredients, { ...item, count: null }],
      };
    }
    case CLEAR_INGREDIENT_LIST_COUNT: {
        return {
          ...state,
          ingredients: state.ingredients.map((i) => {
            return {...i, count: null}
          })
        }
    }
    default: {
      return state;
    }
  }
};
