import { call, put, takeEvery } from "redux-saga/effects";
import { userRegister, userLogin } from "../../utils/AuthApi";
import {
  GET_LOGIN_FAILED, GET_LOGIN_REQUEST, GET_LOGIN_SUCCESS,
  GET_REGISTRATION_FAILED,
  GET_REGISTRATION_REQUEST,
  GET_REGISTRATION_SUCCESS
} from "../actions/types";
import { setCookie } from "../../utils/cookie";

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
  } catch (err) {
    console.log(err);
    yield put({ type: GET_REGISTRATION_FAILED });
  }
}

function* workSignIn(action) {
  try {
    const data = yield call(userLogin, action.email, action.password );
    yield put({
      type: GET_LOGIN_SUCCESS,
      name: data.user.name,
      email: data.user.email,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    });
  } catch (err) {
    console.log(err);
    yield put({ type: GET_LOGIN_FAILED });
  }
}

export function* watchAuthActions() {
  yield takeEvery(GET_REGISTRATION_REQUEST, workRegistration);
  yield takeEvery(GET_LOGIN_REQUEST, workSignIn);
}
