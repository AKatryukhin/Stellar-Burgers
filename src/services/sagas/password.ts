import { call, put, takeEvery, PutEffect, CallEffect } from "redux-saga/effects";
import { passwordChange, passwordReset } from "../../utils/AuthApi";
import {
  CHANGE_PASSWORD_REQUEST,
  RESET_PASSWORD_REQUEST,
} from "../types/action-types";
import {
  changePasswordFailed,
  changePasswordSuccess, IChangePasswordRequestAction, IFetchResetPasswordAction,
  resetPasswordFailed,
  resetPasswordSuccess
} from "../actions/actionsPassword";

function* workPasswordReset(action: IFetchResetPasswordAction): Generator<PutEffect | CallEffect, void> {
  try {
    yield call(passwordReset, action.payload);
    yield put(resetPasswordSuccess());
  } catch (err) {
    console.log(err);
    yield put(resetPasswordFailed());
  }
}

function* workPasswordChange(action: IChangePasswordRequestAction) {
  try {
    yield call(passwordChange, action.password, action.token);
    yield put(changePasswordSuccess());
  } catch (err) {
    console.log(err);
    yield put(changePasswordFailed());
  }
}

export function* watchPasswordActions() {
  yield takeEvery(RESET_PASSWORD_REQUEST, workPasswordReset);
  yield takeEvery(CHANGE_PASSWORD_REQUEST, workPasswordChange);
}
