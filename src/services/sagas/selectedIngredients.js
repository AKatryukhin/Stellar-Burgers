import {call, put, takeEvery} from "redux-saga/effects";

export function* workAddSelectIngredients(action) {
    yield put({type: 'ADD_INGREDIENT', payload: action.payload });
}

export function* workRemoveSelectIngredients(action) {
    yield put({ type: 'DELETE_INGREDIENT', payload: action.payload });
}

export function* watchLoadSelectIngredients() {
    yield takeEvery('ADD_INGREDIENT_REQUEST', workAddSelectIngredients);
    yield takeEvery('DELETE_INGREDIENT_REQUEST', workRemoveSelectIngredients);
}
