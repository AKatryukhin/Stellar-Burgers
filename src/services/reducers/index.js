import {combineReducers} from "redux";


const initialState = {
    selectedIngredients: [],
    ingredients: [],
    isLoading: false,
    ingredientsRequest: false,
    ingredientsFailed: false,
    order: null,
};

export const appReducer = (state = initialState, action) => {
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


const rootReducer = combineReducers({
    app: appReducer
})

export default  rootReducer;