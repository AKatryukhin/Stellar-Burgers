import {call, put, takeEvery} from "redux-saga/effects";

export function* workAddSelectIngredients(ingredient) {
    yield put({type: 'ADD_INGREDIENT', payload: ingredient.payload });
}

export function* workRemoveSelectIngredients(ingredient) {
    yield put({ type: 'DELETE_INGREDIENT', payload: ingredient.payload });
}

export function* watchLoadSelectIngredients() {
    yield takeEvery('ADD_INGREDIENT_REQUEST', workAddSelectIngredients);
    yield takeEvery('DELETE_INGREDIENT_REQUEST', workRemoveSelectIngredients);
}
