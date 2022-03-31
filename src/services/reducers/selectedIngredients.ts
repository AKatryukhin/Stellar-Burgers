 import {
  ADD_SELECTED_INGREDIENT,
  CHANGE_SELECTED_INGREDIENT,
  CLEAR_SELECTED_INGREDIENT_LIST,
  DELETE_SELECTED_INGREDIENT,
  MOVE_INGREDIENT,
} from "../types/action-types";
 import { IIngredientData } from "../../utils/common-types";
 import { TSelectIngredientsActions } from "../actions/actionsSelectIngredient";

 type TSelectedIngredientsState = {
   selectedIngredients: Array<IIngredientData>;
 };

const initialState: TSelectedIngredientsState = {
  selectedIngredients: [],
};
export const selectedIngredientsReducer = (state = initialState, action: TSelectIngredientsActions): TSelectedIngredientsState => {
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
    case DELETE_SELECTED_INGREDIENT:
      return {
        ...state,
        selectedIngredients: [...state.selectedIngredients].filter(
          (i: IIngredientData) => i.key !== action.payload.key
        ),
      };
    case CLEAR_SELECTED_INGREDIENT_LIST: {
      return initialState;
    }
    default:
      return state;
  }
};
