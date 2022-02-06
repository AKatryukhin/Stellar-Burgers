import { call, put, takeEvery } from "redux-saga/effects";
import { passwordReset } from "../../utils/AuthApi";
import {
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS
} from "../actions/types";

function* workPasswordReset(action) {
  try {
    yield call(passwordReset, action.payload);
    yield put({ type: RESET_PASSWORD_SUCCESS });
  } catch (err) {
    console.log(err);
    yield put({ type: RESET_PASSWORD_FAILED });
  }
}

export function* watchPasswordActions() {
  yield takeEvery("RESET_PASSWORD_REQUEST", workPasswordReset);
}