import {call, put, takeEvery} from "redux-saga/effects";

export function* workAddCurrentIngredients(action) {
    yield put({type: 'ADD_CURRENT_INGREDIENT', payload: action.payload });
}

export function* workRemoveCurrentIngredients(action) {
    yield put({ type: 'REMOVE_CURRENT_INGREDIENT', payload: action.payload });
}

export function* watchCurrentIngredients() {
    yield takeEvery('ADD_CURRENT_INGREDIENT_REQUEST', workAddCurrentIngredients);
    yield takeEvery('REMOVE_CURRENT_INGREDIENT_REQUEST', workRemoveCurrentIngredients);
}