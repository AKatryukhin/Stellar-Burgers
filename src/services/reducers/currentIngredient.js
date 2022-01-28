const initialState = {
    ingredient: null,
};

export const currentIngredient = (state = initialState, action) => {
    switch (action.type) {
        case 'ADDED_CURRENT_INGREDIENT': {
            return {
                ...state,
                ingredient: action.ingredient};
        }
        case 'REMOVE_CURRENT_INGREDIENT': {
            return initialState;
        }
        default:
            return state;
    }
};