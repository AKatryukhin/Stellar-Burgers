import { call, put, takeEvery, PutEffect, CallEffect } from "redux-saga/effects";
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
} from "../types/action-types";
import { deleteCookie, getCookie, setCookie } from "../../utils/cookie";
import {
  getInfoUser,
  getInfoUserFailed,
  getInfoUserSuccess,
  ICreateUserAction,
  IGetInfoUserAction,
  ILoginAction,
  ILogoutAction,
  ITokenUpdateAction,
  IUpdateInfoUserAction,
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
  updateInfoUserSuccess
} from "../actions/actionsAuth";
import {
  ICreateOrLoginUserResponse,
  IGetUserInfoResponse,
  IUpdateTokenResponse,
  IUpdateUserInfoResponse
} from "../types/data-types";

function* workCreateUser(action: ICreateUserAction): Generator<PutEffect | CallEffect, void, ICreateOrLoginUserResponse> {
  try {
    const data: ICreateOrLoginUserResponse = yield call(
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

function* workSignIn(action: ILoginAction): Generator<PutEffect | CallEffect, void, ICreateOrLoginUserResponse> {
  try {
    const data: ICreateOrLoginUserResponse = yield call(userLogin, action.email, action.password);
    yield put(requestLoginSuccess(data));
    setCookie("accessToken", data.accessToken);
    setCookie("refreshToken", data.refreshToken);
  } catch (err) {
    console.log(err);
    yield put(requestLoginFailed());
  }
}

function* workTokenUpdate(action: ITokenUpdateAction): Generator<PutEffect | CallEffect, void, IUpdateTokenResponse> {
  try {
    const data: IUpdateTokenResponse = yield call(userRefreshToken, action.token);
    yield put(tokenUpdateSuccess(data));
    setCookie("accessToken", data.accessToken);
    setCookie("refreshToken", data.refreshToken);
  } catch (err) {
    console.log(err);
    yield put(tokenUpdateFailed());
  } finally {
    const accessToken = getCookie("accessToken");
    const refreshToken = getCookie("refreshToken");
    if(accessToken && refreshToken) {
      yield put(getInfoUser(accessToken, refreshToken));
    }
  }
}

function* workSignOut(action: ILogoutAction ): Generator<PutEffect | CallEffect, void> {
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

function* workGetUserInfo(action: IGetInfoUserAction): Generator<PutEffect | CallEffect, void, IGetUserInfoResponse> {
  try {
    const data: IGetUserInfoResponse = yield call(getUserInfo, action.accessToken);
    yield put(getInfoUserSuccess(data));
  } catch (e: any) {
    // deleteCookie("accessToken");
    // deleteCookie("refreshToken");
    if (e.message === "jwt expired") {
      yield put(tokenUpdate(action.refreshToken));
    } else {
      console.log(e);
      yield put(getInfoUserFailed());
    }
  }
}

function* workUpdateUserInfo(action: IUpdateInfoUserAction): Generator<PutEffect | CallEffect, void, IUpdateUserInfoResponse> {
  try {
    const data: IUpdateUserInfoResponse = yield call(
      updateUserInfo,
      action.name,
      action.email,
      action.accessToken
    );
    yield put(updateInfoUserSuccess(data));
  } catch (e: any) {
    if (e.message === "jwt expired") {
      yield put(tokenUpdate(action.refreshToken));
    } else {
      console.log(e);
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
