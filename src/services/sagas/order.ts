import { call, put, takeEvery } from "redux-saga/effects";
import { placeAnOrder } from "../../utils/IngredientsApi";
import { GET_ORDER_REQUEST } from "../types/action-types";
import {
  IFetchOrderAction,
  openOrderModal,
  requestOrderFailed,
  requestOrderSuccess
} from "../actions/actionsOrder";
import { IResponseOrder } from "../types/data-types";
import { tokenUpdate } from "../actions/actionsAuth";
import { getCookie } from "../../utils/cookie";
const refreshToken = getCookie("refreshToken");

function* workGetOrderNumber(action: IFetchOrderAction) {
  try {
    // @ts-ignore
    const data: IResponseOrder = yield call(placeAnOrder, action.accessToken, action.order);
    yield put(requestOrderSuccess(data));
    yield put(openOrderModal());
  } catch (e: any) {
    if (e.message === "jwt expired") {
      // @ts-ignore
      yield put(tokenUpdate(refreshToken));
    } else {
      console.log(e);
      yield put(requestOrderFailed());
    }
  }
}

export function* watchGetOrderNumber() {
  yield takeEvery(GET_ORDER_REQUEST, workGetOrderNumber);
};

