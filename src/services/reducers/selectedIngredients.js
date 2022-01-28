
const initialState = {
    selectedIngredients: [],
};

export const selectedIngredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'DELETE_INGREDIENT': {
            return { ...state, selectedIngredients: [...state.selectedIngredients].filter(item => item.id !== action.id) };
        }
        case 'ADD_INGREDIENT': {
            return { ...state, selectedIngredients: [...state.selectedIngredients, ...action.item] };
        }
        case 'GET_INGREDIENTS_SUCCESS': {
            return { ...state,
                ingredientsFailed: false,
                ingredients: action.ingredients,
                ingredientsRequest: false };
        }
        case 'GET_INGREDIENTS_FAILED': {
            return {
                ...state,
                itemsFailed: true,
                itemsRequest: false };
        }
        default:
            return state;
    }
};