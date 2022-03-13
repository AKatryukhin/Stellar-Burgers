import { call, put, takeEvery, PutEffect, CallEffect } from "redux-saga/effects";
import { placeAnOrder } from "../../utils/IngredientsApi";
import { GET_ORDER_REQUEST } from "../types/action-types";
import {
  IFetchOrderAction,
  openOrderModal,
  requestOrderFailed,
  requestOrderSuccess
} from "../actions/actionsOrder";
import { IAllIngredientsResponse, IResponseOrder } from "../types/data-types";

function* workGetOrderNumber(action: IFetchOrderAction): Generator<PutEffect | CallEffect, void, IResponseOrder> {
  try {
    const data: IResponseOrder = yield call(placeAnOrder, action.payload);
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
