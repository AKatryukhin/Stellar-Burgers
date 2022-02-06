import {combineReducers} from "redux";
import {ingredientsReducer} from "./ingredients";
import {selectedIngredientsReducer} from "./selectedIngredients";
import {currentIngredientReducer} from "./currentIngredient";
import {order} from './order';
import { password } from "./password";

const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    selectedIngredients: selectedIngredientsReducer,
    currentIngredient: currentIngredientReducer,
    order: order,
    password: password
})

export default  rootReducer;