import { auth } from "./auth";
import { getCookie } from "../../utils/cookie";
import {
  createUser,
  getInfoUser,
  getInfoUserFailed,
  getInfoUserSuccess,
  login,
  logout,
  requestLoginFailed,
  requestLoginSuccess,
  requestLogoutFailed,
  requestLogoutSuccess,
  requestRegisterFailed,
  requestRegisterSuccess,
  tokenUpdate,
  tokenUpdateFailed,
  tokenUpdateSuccess,
  updateInfoUser,
  updateInfoUserFailed,
  updateInfoUserSuccess,
} from "../actions/actionsAuth";
import { wsReducer } from "./ws";
import {
  GET_LOGIN_SUCCESS,
  GET_REGISTRATION_SUCCESS,
} from "../types/action-types";

const refreshTokenCurrent = getCookie("refreshToken");
const accessTokenCurrent = getCookie("accessToken");

const initialState = {
  name: "",
  email: "",
  accessToken: accessTokenCurrent,
  refreshToken: refreshTokenCurrent,
  registerRequest: false,
  registerFailed: false,
  isRegisterSuccess: false,
  loginRequest: false,
  loginFailed: false,
  isLoginSuccess: false,
  logoutRequest: false,
  logoutFailed: false,
  tokenUpdateRequest: false,
  tokenUpdateFailed: false,
  tokenUpdateSuccess: false,
  getUserInfoRequest: false,
  getUserInfoFailed: false,
  updateUserRequest: false,
  updateUserFailed: false,
};

describe("authorization reducer", () => {
  it("should return the initial state", () => {
    expect(auth(undefined, {})).toEqual(initialState);
  });
  it("should GET_REGISTRATION_REQUEST", () => {
      const email = "testuser9@yandex.ru";
      const name = "testuser9";
      const password = '123qweASD';
    const action = createUser(email, name, password);
    const state = auth(initialState, action);
    expect(state).toEqual({
      ...state,
      registerRequest: true,
    });
  });
  it("should GET_REGISTRATION_SUCCESS", () => {
      const data = {
        success: true,
        user: {
          email: "testuser@yandex.ru",
          name: "testuser",
        },
        accessToken: "token",
        refreshToken: "token",
      }
    const action = requestRegisterSuccess(data);
    const state = auth(initialState, action);
    expect(state).toEqual({
      ...state,
      registerFailed: false,
      registerRequest: false,
      isRegisterSuccess: true,
      name: action.name,
      email: action.email,
      accessToken: action.accessToken,
      refreshToken: action.refreshToken,
    });
  });
  it("should GET_REGISTRATION_FAILED", () => {
    const action = requestRegisterFailed();
    const state = auth(initialState, action);
    expect(state).toEqual({
      ...state,
      registerFailed: true,
    });
  });
  it("should GET_LOGIN_REQUEST", () => {
    const action = login();
    const state = auth(initialState, action);
    expect(state).toEqual({
      ...state,
      loginRequest: true,
    });
  });
  it("should GET_LOGIN_SUCCESS", () => {
    const data = {
      success: true,
      accessToken: "token",
      refreshToken: "token",
      user: {
        email: "testuser@yandex.ru",
        name: "testuser",
      },
    };
    const action = requestLoginSuccess(data);
    const state = auth(initialState, action);
    expect(state).toEqual({
      ...state,
      loginFailed: false,
      loginRequest: false,
      isLoginSuccess: true,
      name: data.user.name,
      email: data.user.email,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    });
  });
  it("should GET_LOGIN_FAILED", () => {
    const action = requestLoginFailed();
    const state = auth(initialState, action);
    expect(state).toEqual({
      ...state,
      loginRequest: false,
      loginFailed: true,
    });
  });
  it("should GET_LOGOUT_REQUEST", () => {
    const action = logout("token");
    const state = auth(initialState, action);
    expect(state).toEqual({
      ...state,
      logoutRequest: true,
    });
  });
  it("should GET_LOGOUT_SUCCESS", () => {
    const action = requestLogoutSuccess();
    const state = auth(initialState, action);
    expect(state).toEqual({
      ...state,
      logoutFailed: false,
      logoutRequest: false,
      name: "",
      email: "",
      accessToken: "",
      refreshToken: "",
    });
  });
  it("should GET_LOGOUT_FAILED", () => {
    const action = requestLogoutFailed();
    const state = auth(initialState, action);
    expect(state).toEqual({
      ...state,
      logoutRequest: false,
      loginFailed: true,
    });
  });
  it("should GET_TOKEN_UPDATE_REQUEST", () => {
    const action = tokenUpdate("token");
    const state = auth(initialState, action);
    expect(state).toEqual({
      ...state,
      tokenUpdateRequest: true,
    });
  });
  it("should GET_TOKEN_UPDATE_SUCCESS", () => {
    const data = {
      success: true,
      accessToken: "token",
      refreshToken: "token",
    };
    const action = tokenUpdateSuccess(data);
    const state = auth(initialState, action);
    expect(state).toEqual({
      ...state,
      tokenUpdateFailed: false,
      tokenUpdateRequest: false,
      tokenUpdateSuccess: true,
      accessToken: action.accessToken,
      refreshToken: action.refreshToken,
    });
  });
  it("should GET_TOKEN_UPDATE_FAILED", () => {
    const action = tokenUpdateFailed();
    const state = auth(initialState, action);
    expect(state).toEqual({
      ...state,
      tokenUpdateFailed: true,
    });
  });
  it("should GET_USER_INFO_REQUEST", () => {

      const accessToken = "token";
      const refreshToken = "token";
    const action = getInfoUser(accessToken, refreshToken);
    const state = auth(initialState, action);
    expect(state).toEqual({
      ...state,
      getUserInfoRequest: true,
    });
  });
  it("should GET_USER_INFO_SUCCESS", () => {
    const data = {
      success: true,
      user: {
        email: "testuser@yandex.ru",
        name: "testuser",
      },
    };
    const action = getInfoUserSuccess(data);
    const state = auth(initialState, action);
    expect(state).toEqual({
      ...state,
      getUserInfoFailed: false,
      getUserInfoRequest: false,
      name: data.user.name,
      email: data.user.email,
    });
  });
  it("should GET_USER_INFO_FAILED", () => {
    const action = getInfoUserFailed();
    const state = auth(initialState, action);
    expect(state).toEqual({
      ...state,
      getUserInfoFailed: true,
    });
  });
  it("should UPDATE_USER_INFO_REQUEST", () => {
    const email = "testuser@yandex.ru";
    const name = "testuser";
    const accessToken = "token";
    const refreshToken = "token";
    const action = updateInfoUser(email, name, accessToken, refreshToken);
    const state = auth(initialState, action);
    expect(state).toEqual({
      ...state,
      updateUserRequest: true,
    });
  });
  it("should UPDATE_USER_INFO_SUCCESS", () => {
    const data = {
      success: true,
      user: {
        email: "testuser@yandex.ru",
        name: "testuser",
      },
    };
    const action = updateInfoUserSuccess(data);
    const state = auth(initialState, action);
    expect(state).toEqual({
      ...state,
      updateUserFailed: false,
      updateUserRequest: false,
      name: action.name,
      email: action.email,
    });
  });
  it("should UPDATE_USER_INFO_FAILED", () => {
    const action = updateInfoUserFailed();
    const state = auth(initialState, action);
    expect(state).toEqual({
      ...state,
      updateUserFailed: true,
    });
  });
});
