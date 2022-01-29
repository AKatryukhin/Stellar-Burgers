
const initialState = {
    selectedIngredients: [],
};
export const selectedIngredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_SELECTED_INGREDIENT': {
            return {
                ...state,
                selectedIngredients: [
                    ...state.selectedIngredients,
                    action.payload
                ] };
        }
        case 'DELETE_SELECTED_INGREDIENT':
            return {
                ...state,
                selectedIngredients: [
                    ...state.selectedIngredients].filter(i => i.key !== action.payload.key)
            };
        case 'CLEAR_LIST': {
            return initialState;
        }
        default:
            return state;
    }
};