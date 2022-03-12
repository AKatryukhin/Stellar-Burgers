import {
  ADD_CURRENT_INGREDIENT,
  REMOVE_CURRENT_INGREDIENT,
} from "../action-types/types";

const initialState = {
  ingredient: null,
};

export const currentIngredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CURRENT_INGREDIENT: {
      return {
        ...state,
        ingredient: action.ingredient,
      };
    }
    case REMOVE_CURRENT_INGREDIENT: {
      return {
        ingredient: null
      };
    }
    default:
      return state;
  }
};
