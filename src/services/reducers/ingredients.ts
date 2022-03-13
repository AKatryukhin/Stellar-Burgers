import {
  CLEAR_INGREDIENT_LIST_COUNT,
  DECREASE_COUNT,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  INCREASE_COUNT, RESET_INGREDIENTS,
} from "../types/action-types";
import { IIngredientData } from "../../utils/common-types";
import { TIngredientsActions } from "../actions/actionsIngredient";

type TIngredientsState = {
  ingredients: Array<IIngredientData>;
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
  loaded: boolean;
};

const initialState: TIngredientsState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  loaded: false,
};

export const ingredientsReducer = (state = initialState, action: TIngredientsActions): TIngredientsState => {
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
        loaded: true
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...initialState,
        ingredientsFailed: true,
      };
    }
    case RESET_INGREDIENTS: {
      return {
        ...initialState
      };
    }
    case INCREASE_COUNT: {
      const item = action.ingredient;
      const index = state.ingredients.indexOf(item);
      const copyIngredients = [...state.ingredients];
      copyIngredients.splice(index, 1, { ...item, count: action.count })
      return {
        ...state,
        ingredients: copyIngredients,
      };
    }

    case DECREASE_COUNT: {
      const item = state.ingredients.find(
        (i: IIngredientData) => i._id === action.ingredient._id
      );
      const index = item && state.ingredients.indexOf(item);
      const copyIngredients: IIngredientData[] = [...state.ingredients];
      if (item && item.type === "bun") {
        index && copyIngredients.splice(index, 1, { ...item, count: null })
        return {
          ...state,
          ingredients: copyIngredients,
        };
      }
      if (item && item.count && item.count > 1
          && item.type !== "bun"
      )  {
        index && copyIngredients.splice(index, 1, { ...item, count: item.count - 1 })
        return {
          ...state,
          ingredients: copyIngredients,
        };
      }
      if (item && item.count && item.count === 1) {
        index && copyIngredients.splice(index, 1, { ...item, count: null })
        return {
          ...state,
          ingredients: copyIngredients,
        };
      }
      index &&  copyIngredients.splice(index, 1, { ...item, count: null })
      return {
        ...state,
        ingredients: copyIngredients,
      };
    }
    case CLEAR_INGREDIENT_LIST_COUNT: {
      return {
        ...state,
        ingredients: state.ingredients.map((i) => {
          return { ...i, count: null };
        }),
      };
    }
    default: {
      return state;
    }
  }
};
