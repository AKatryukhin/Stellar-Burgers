import {combineReducers} from "redux";
import {ingredientsReducer} from "./ingredients";
import {selectedIngredientsReducer} from "./selectedIngredients";
import {currentIngredient} from "./currentIngredient";


const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    selectedIngredients: selectedIngredientsReducer,
    currentIngredient: currentIngredient,
    order: order
})

export default  rootReducer;