import {
  ADD_CURRENT_INGREDIENT,
  REMOVE_CURRENT_INGREDIENT,
} from "../types/action-types";
import { IIngredientData } from "../../utils/common-types";
import { TIngredientsActions } from "../actions/actionsIngredient";

type TCurrentIngredientsState = {
  ingredient: IIngredientData;
};


const initialState: TCurrentIngredientsState = {
  ingredient: {
    _id: "",
    name: "",
    type: "",
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image: "",
    image_mobile: "",
    image_large: "",
    __v: 0,
  },
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
        ...initialState
      };
    }
    default:
      return state;
  }
};
