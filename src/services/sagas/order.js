import { call, put, takeEvery } from "redux-saga/effects";
import { placeAnOrder } from "../../utils/IngredientsApi";
import { GET_ORDER_REQUEST } from "../action-types/types";
import {
  openOrderModal,
  requestOrderFailed,
  requestOrderSuccess,
} from "../actions/actionsOrder";

function* workGetOrderNumber(action) {
  try {
    const data = yield call(placeAnOrder, action.payload);
    yield put(requestOrderSuccess(data));
    yield put(openOrderModal());
  } catch (err) {
    console.log(err);
    yield put(requestOrderFailed());
  }
}

export function* watchGetOrderNumber() {
  yield takeEvery(GET_ORDER_REQUEST, workGetOrderNumber);
}
