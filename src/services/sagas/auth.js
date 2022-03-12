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
  GET_LOGIN_REQUEST,
  GET_LOGOUT_REQUEST,
  GET_REGISTRATION_REQUEST,
  GET_TOKEN_UPDATE_REQUEST,
  GET_USER_INFO_REQUEST,
  UPDATE_USER_INFO_REQUEST,
} from "../action-types/types";
import { deleteCookie, getCookie, setCookie } from "../../utils/cookie";
import {
  getInfoUser,
  getInfoUserFailed,
  getInfoUserSuccess,
  requestLoginFailed,
  requestLoginSuccess,
  requestLogoutFailed,
  requestLogoutSuccess,
  requestRegisterFailed,
  requestRegisterSuccess,
  tokenUpdate,
  tokenUpdateFailed,
  tokenUpdateSuccess,
  updateInfoUserFailed,
  updateInfoUserSuccess,
} from "../actions/actionsAuth";

function* workCreateUser(action) {
  try {
    const data = yield call(
      userRegister,
      action.name,
      action.email,
      action.password
    );
    yield put(requestRegisterSuccess(data));
    setCookie("accessToken", data.accessToken);
    setCookie("refreshToken", data.refreshToken);
  } catch (err) {
    console.log(err);
    yield put(requestRegisterFailed());
  }
}

function* workSignIn(action) {
  try {
    const data = yield call(userLogin, action.email, action.password);
    yield put(requestLoginSuccess(data));
    setCookie("accessToken", data.accessToken);
    setCookie("refreshToken", data.refreshToken);
  } catch (err) {
    console.log(err);
    yield put(requestLoginFailed());
  }
}

function* workTokenUpdate(action) {
  try {
    const data = yield call(userRefreshToken, action.token);
    yield put(tokenUpdateSuccess(data));
    setCookie("accessToken", data.accessToken);
    setCookie("refreshToken", data.refreshToken);
  } catch (err) {
    console.log(err);
    yield put(tokenUpdateFailed());
  } finally {
    const accessToken = getCookie("accessToken");
    const refreshToken = getCookie("refreshToken");
    yield put(getInfoUser(accessToken, refreshToken));
  }
}

function* workSignOut(action) {
  try {
    yield call(userLogout, action.token);
    yield put(requestLogoutSuccess());
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
  } catch (err) {
    console.log(err);
    yield put(requestLogoutFailed());
  }
}

function* workGetUserInfo(action) {
  try {
    const data = yield call(getUserInfo, action.accessToken);
    yield put(getInfoUserSuccess(data));
  } catch (err) {
    if (err.message === "jwt expired") {
      yield put(tokenUpdate(action.refreshToken));
    } else {
      console.log(err);
      yield put(getInfoUserFailed());
    }
  }
}

function* workUpdateUserInfo(action) {
  try {
    const data = yield call(
      updateUserInfo,
      action.name,
      action.email,
      action.accessToken
    );
    yield put(updateInfoUserSuccess(data));
  } catch (err) {
    if (err.message === "jwt expired") {
      yield put(tokenUpdate(action.refreshToken));
    } else {
      console.log(err);
      yield put(updateInfoUserFailed());
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
