
const initialState = {
    selectedIngredients: [],
};

export const selectedIngredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_INGREDIENT': {
            return {
                ...state,
                selectedIngredients: [
                    ...state.selectedIngredients,
                    action.payload
                ] };
        }
        case 'DELETE_INGREDIENT': {
            return { ...state, selectedIngredients: [...state.selectedIngredients].filter(item => item.id !== action.payload.id) };
        }
        case 'CLEAR_LIST': {
            return initialState;
        }


        // case 'GET_INGREDIENTS_SUCCESS': {
        //     return { ...state,
        //         ingredientsFailed: false,
        //         ingredients: action.ingredients,
        //         ingredientsRequest: false };
        // }
        // case 'GET_INGREDIENTS_FAILED': {
        //     return {
        //         ...state,
        //         itemsFailed: true,
        //         itemsRequest: false };
        // }
        default:
            return state;
    }
};