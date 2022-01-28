import {combineReducers} from "redux";
import {ingredientsReducer} from "./ingredients";
import {selectedIngredientsReducer} from "./selectedIngredients";
import {currentIngredient} from "./currentIngredient";
import {order} from './order';


const initialState = {
    isOrderModalOpen: false,
    isIngredientModalOpen: false,
}

const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'OPEN_ORDER_MODAL': {
            return {
                ...state,
                isOrderModalOpen: true
            };
        }
        case 'OPEN_INGREDIENT_MODAL': {
            return {
                ...state,
                isIngredientModalOpen: true
            };
        }
        case 'CLOSE_ALL_MODAL': {
            return initialState
        }

        default:
            return state;
    }
}

const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    selectedIngredients: selectedIngredientsReducer,
    currentIngredient: currentIngredient,
    order: order,
    modal: modalReducer
})

export default  rootReducer;