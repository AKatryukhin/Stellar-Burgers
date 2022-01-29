import {combineReducers} from "redux";
import {ingredientsReducer} from "./ingredients";
import {selectedIngredientsReducer} from "./selectedIngredients";
import {currentIngredientReducer} from "./currentIngredient";
import {order} from './order';
import {CLOSE_ALL_MODAL, OPEN_INGREDIENT_MODAL, OPEN_ORDER_MODAL} from "../actions/types";


const initialState = {
    isOrderModalOpen: false,
    isIngredientModalOpen: false,
}

const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_ORDER_MODAL: {
            return {
                ...state,
                isOrderModalOpen: true
            };
        }
        case OPEN_INGREDIENT_MODAL: {
            return {
                ...state,
                isIngredientModalOpen: true
            };
        }
        case CLOSE_ALL_MODAL: {
            return initialState
        }

        default:
            return state;
    }
}

const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    selectedIngredients: selectedIngredientsReducer,
    currentIngredient: currentIngredientReducer,
    order: order,
    modal: modalReducer
})

export default  rootReducer;