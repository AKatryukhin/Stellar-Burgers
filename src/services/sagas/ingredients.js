import { call, put, takeEvery } from "redux-saga/effects";
import { getIngredientsList } from "../../utils/IngredientsApi";
import {
  GET_INGREDIENTS_REQUEST,
} from "../actions/types";
import { requestIngredientsFailed, requestIngredientsSuccess } from "../actions/actionsIngredient";

function* workGetIngredients() {
  try {
    const { data } = yield call(getIngredientsList);
    yield put(requestIngredientsSuccess(data));
  } catch {
    yield put(requestIngredientsFailed());
  }
}

export function* watchLoadIngredients() {
  yield takeEvery(GET_INGREDIENTS_REQUEST, workGetIngredients);
}
