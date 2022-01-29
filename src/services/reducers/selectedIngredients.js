const initialState = {
  selectedIngredients: [],
  totalPrice: null,
};
export const selectedIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_SELECTED_INGREDIENT": {
      return {
        ...state,
        selectedIngredients: [...state.selectedIngredients, action.payload],
      };
    }
    case "DELETE_SELECTED_INGREDIENT":
      return {
        ...state,
        selectedIngredients: [...state.selectedIngredients].filter(
          (i) => i.key !== action.payload.key
        ),
      };
    case "SET_TOTAL_PRICE":
      return {
        ...state,
        totalPrice: action.payload,
      };
    case "RESET_TOTAL_PRICE":
      return {
        ...state,
        totalPrice: null,
      };
    case "CLEAR_SELECTED_INGREDIENT_LIST": {
      return initialState;
    }
    default:
      return state;
  }
};
