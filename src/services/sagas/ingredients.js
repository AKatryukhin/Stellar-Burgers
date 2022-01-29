import { call, put, takeEvery } from "redux-saga/effects";
import { getIngredientsList } from "../../utils/IngredientsApi";
import {
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
} from "../actions/types";

function* workGetIngredients() {
  try {
    const { data } = yield call(getIngredientsList);
    yield put({ type: GET_INGREDIENTS_SUCCESS, ingredients: data });
  } catch {
    yield put({ type: GET_INGREDIENTS_FAILED });
  }
}

export function* watchLoadIngredients() {
  yield takeEvery(GET_INGREDIENTS_REQUEST, workGetIngredients);
}
