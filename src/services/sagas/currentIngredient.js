import {call, put, takeEvery} from "redux-saga/effects";
import {ADD_CURRENT_INGREDIENT, REMOVE_CURRENT_INGREDIENT} from "../actions/types";

export function* workAddCurrentIngredients(action) {
    yield put({type: ADD_CURRENT_INGREDIENT, payload: action.payload });
}

export function* workRemoveCurrentIngredients(action) {
    yield put({ type: REMOVE_CURRENT_INGREDIENT, payload: action.payload });
}

export function* watchCurrentIngredients() {
    // yield takeEvery('ADD_CURRENT_INGREDIENT_REQUEST', workAddCurrentIngredients);
    // yield takeEvery('REMOVE_CURRENT_INGREDIENT_REQUEST', workRemoveCurrentIngredients);
}