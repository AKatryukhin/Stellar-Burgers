import {combineReducers} from "redux";
import {ingredientsReducer} from "./ingredients";
import {selectedIngredientsReducer} from "./selectedIngredients";
import {currentIngredientReducer} from "./currentIngredient";
import {order} from './order';
import { password } from "./password";
import { auth } from "./auth";
import { wsReducer } from "./ws";



const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    selectedIngredients: selectedIngredientsReducer,
    currentIngredient: currentIngredientReducer,
    order: order,
    password: password,
    auth: auth,
    ws: wsReducer
})

export default  rootReducer;