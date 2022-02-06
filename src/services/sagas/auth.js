import { call, put, takeEvery } from "redux-saga/effects";
import { userRegister } from "../../utils/AuthApi";
import {
  GET_REGISTRATION_FAILED,
  GET_REGISTRATION_REQUEST,
  GET_REGISTRATION_SUCCESS,
} from "../actions/types";

function* workRegistration(action) {
  try {
    const data = yield call(userRegister, action.name, action.email, action.password );
    yield put({
      type: GET_REGISTRATION_SUCCESS,
      name: data.user.name,
      email: data.user.email,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    });
  } catch {
    yield put({ type: GET_REGISTRATION_FAILED });
  }
}

export function* watchAuthActions() {
  yield takeEvery(GET_REGISTRATION_REQUEST, workRegistration);
}
