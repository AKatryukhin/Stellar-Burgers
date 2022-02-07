import { call, put, takeEvery } from "redux-saga/effects";
import {
  userRegister,
  userLogin,
  userLogout,
  userRefreshToken,
  getUserInfo,
  updateUserInfo,
} from "../../utils/AuthApi";
import {
  GET_LOGIN_FAILED,
  GET_LOGIN_REQUEST,
  GET_LOGIN_SUCCESS,
  GET_LOGOUT_FAILED,
  GET_LOGOUT_REQUEST,
  GET_LOGOUT_SUCCESS,
  GET_REGISTRATION_FAILED,
  GET_REGISTRATION_REQUEST,
  GET_REGISTRATION_SUCCESS,
  GET_TOKEN_UPDATE_FAILED,
  GET_TOKEN_UPDATE_REQUEST,
  GET_TOKEN_UPDATE_SUCCESS,
  GET_USER_INFO_FAILED,
  GET_USER_INFO_REQUEST,
  GET_USER_INFO_SUCCESS,
  UPDATE_USER_INFO_FAILED,
  UPDATE_USER_INFO_REQUEST,
  UPDATE_USER_INFO_SUCCESS,
} from "../actions/types";
import { getCookie, setCookie } from "../../utils/cookie";

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
    call(setCookie, "accessToken", data.accessToken);
    call(setCookie, "refreshToken", data.refreshToken);
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

function* workGetUserInfo(action) {
  try {
    const data = yield call(getUserInfo, action.accessToken);
    yield put({
      type: GET_USER_INFO_SUCCESS,
      name: data.user.name,
      email: data.user.email,
    });

  } catch (err) {
    if (err.message === "jwt expired") {
      yield put({
        type: GET_TOKEN_UPDATE_REQUEST,
        token: action.refreshToken,
      });

      yield put({
        type: GET_USER_INFO_REQUEST,
        accessToken: getCookie("accessToken"),
        refreshToken: getCookie("refreshToken"),
      });
    } else {
      console.log(err);
      yield put({ type: GET_USER_INFO_FAILED });
    }
  }
}

function* workUpdateUserInfo(action) {
  try {
    const data = yield call(
      updateUserInfo,
      action.accessToken,
      action.name,
      action.email
    );
    yield put({
      type: UPDATE_USER_INFO_SUCCESS,
      name: data.user.name,
      email: data.user.email,
    });
  } catch (err) {
    if (err.message === "jwt expired") {
      yield put({
        type: GET_TOKEN_UPDATE_REQUEST,
        token: action.refreshToken,
      });
      yield put({
        type: UPDATE_USER_INFO_REQUEST,
        accessToken: getCookie("accessToken"),
        refreshToken: getCookie("refreshToken"),
      });
    } else {
      console.log(err);
      yield put({ type: UPDATE_USER_INFO_FAILED });
    }
  }
}

export function* watchAuthActions() {
  yield takeEvery(GET_REGISTRATION_REQUEST, workCreateUser);
  yield takeEvery(GET_LOGIN_REQUEST, workSignIn);
  yield takeEvery(GET_LOGOUT_REQUEST, workSignOut);
  yield takeEvery(GET_TOKEN_UPDATE_REQUEST, workTokenUpdate);
  yield takeEvery(GET_USER_INFO_REQUEST, workGetUserInfo);
  yield takeEvery(UPDATE_USER_INFO_REQUEST, workUpdateUserInfo);
}
