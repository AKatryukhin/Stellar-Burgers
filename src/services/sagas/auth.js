import { call, put, takeEvery } from "redux-saga/effects";
import { userRegister, userLogin, userLogout, userRefreshToken } from "../../utils/AuthApi";
import {
  GET_LOGIN_FAILED,
  GET_LOGIN_REQUEST,
  GET_LOGIN_SUCCESS,
  GET_LOGOUT_FAILED,
  GET_LOGOUT_REQUEST,
  GET_LOGOUT_SUCCESS,
  GET_REGISTRATION_FAILED,
  GET_REGISTRATION_REQUEST,
  GET_REGISTRATION_SUCCESS, GET_TOKEN_UPDATE_FAILED, GET_TOKEN_UPDATE_REQUEST, GET_TOKEN_UPDATE_SUCCESS
} from "../actions/types";

function* workCreateUser(action) {
  try {
    const data = yield call(
      userRegister,
      action.name,
      action.email,
      action.password
    );
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
    const data = yield call(userLogin, action.email, action.password);
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

function* workTokenUpdate(action) {
  try {
    const data = yield call(userRefreshToken, action.token);
    yield put({
      type: GET_TOKEN_UPDATE_SUCCESS,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    });

  } catch (err) {
    console.log(err);
    yield put({ type: GET_TOKEN_UPDATE_FAILED });
  }
}

function* workSignOut(action) {
  try {
    yield call(userLogout, action.token);
    yield put({
      type: GET_LOGOUT_SUCCESS,
    });
  } catch (err) {
    console.log(err);
    yield put({ type: GET_LOGOUT_FAILED });
  }
}

export function* watchAuthActions() {
  yield takeEvery(GET_REGISTRATION_REQUEST, workCreateUser);
  yield takeEvery(GET_LOGIN_REQUEST, workSignIn);
  yield takeEvery(GET_LOGOUT_REQUEST, workSignOut);
  yield takeEvery(GET_TOKEN_UPDATE_REQUEST, workTokenUpdate);
}
