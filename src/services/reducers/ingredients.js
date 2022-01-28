
const initialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
};

export const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_INGREDIENTS_REQUEST': {
            return {
                ...state,
                ingredientsRequest: true
            };
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