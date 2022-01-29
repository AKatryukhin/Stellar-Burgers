import { call, put, takeEvery } from "redux-saga/effects";
import { placeAnOrder } from "../../utils/IngredientsApi";
import {
  GET_ORDER_NUMBER_FAILED,
  GET_ORDER_NUMBER_SUCCESS,
  OPEN_ORDER_MODAL,
} from "../actions/types";

function* workGetOrderNumber(action) {
  try {
    const data = yield call(placeAnOrder, action.payload);
    yield put({ type: GET_ORDER_NUMBER_SUCCESS, payload: data.order.number });
    yield put({ type: OPEN_ORDER_MODAL });
  } catch (err) {
    console.log(err);
    yield put({ type: GET_ORDER_NUMBER_FAILED });
  }
}

export function* watchGetOrderNumber() {
  yield takeEvery("GET_ORDER_REQUEST", workGetOrderNumber);
}
