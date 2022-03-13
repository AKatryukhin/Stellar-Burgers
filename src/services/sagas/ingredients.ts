import { call, put, takeEvery, PutEffect, CallEffect } from "redux-saga/effects";
import { getIngredientsList } from "../../utils/IngredientsApi";
import {
  GET_INGREDIENTS_REQUEST,
} from "../types/action-types";
import { requestIngredientsFailed, requestIngredientsSuccess } from "../actions/actionsIngredient";
import { IAllIngredientsResponse } from "../types/data-types";

function* workGetIngredients(): Generator<PutEffect | CallEffect, void, IAllIngredientsResponse> {
  try {
    const res: IAllIngredientsResponse = yield call(getIngredientsList);
    yield put(requestIngredientsSuccess(res.data));
  } catch {
    yield put(requestIngredientsFailed());
  }
}

export function* watchLoadIngredients() {
  yield takeEvery(GET_INGREDIENTS_REQUEST, workGetIngredients);
}

