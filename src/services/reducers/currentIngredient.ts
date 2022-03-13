import {
  ADD_CURRENT_INGREDIENT,
  REMOVE_CURRENT_INGREDIENT,
} from "../types/action-types";
import { IIngredientData } from "../../utils/common-types";
import { TIngredientsActions } from "../actions/actionsIngredient";

type TCurrentIngredientsState = {
  ingredient: IIngredientData | null;
};

const initialState: TCurrentIngredientsState = {
  ingredient: null,
};

export const currentIngredientReducer = (state = initialState, action: TIngredientsActions): TCurrentIngredientsState => {
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
