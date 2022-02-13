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
  UPDATE_USER_INFO_SUCCESS
} from "./types";
import { getCookie } from "../../utils/cookie";

export const createUser = (name, email, password) => {
  return {
    type: GET_REGISTRATION_REQUEST,
    name: name,
    email: email,
    password: password,
  };
};

export const requestRegisterSuccess = (data) => {
  return {
    type: GET_REGISTRATION_SUCCESS,
    name: data.user.name,
    email: data.user.email,
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
  };
};

export const requestRegisterFailed = () => {
  return { type: GET_REGISTRATION_FAILED };
};

export const login = (email, password) => {
  return {
    type: GET_LOGIN_REQUEST,
    email: email,
    password: password,
  };
};

export const requestLoginSuccess = (data) => {
  return {
    type: GET_LOGIN_SUCCESS,
    name: data.user.name,
    email: data.user.email,
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
  };
};

export const requestLoginFailed = () => {
  return { type: GET_LOGIN_FAILED };
};

export const logout = (token) => {
  return {
    type: GET_LOGOUT_REQUEST,
    token: token,
  };
};

export const requestLogoutSuccess = () => {
  return {
    type: GET_LOGOUT_SUCCESS,
  };
};
export const requestLogoutFailed = () => {
  return { type: GET_LOGOUT_FAILED };
};

export const tokenUpdate = (token) => {
  return {
    type: GET_TOKEN_UPDATE_REQUEST,
    token: token,
  };
};

export const tokenUpdateSuccess = (data) => {
  return {
    type: GET_TOKEN_UPDATE_SUCCESS,
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
  };
};

export const tokenUpdateFailed = () => {
  return { type: GET_TOKEN_UPDATE_FAILED };
};

export const getInfoUser = (accessToken, refreshToken) => {
  return {
    type: GET_USER_INFO_REQUEST,
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
};

export const getInfoUserSuccess = (data) => {
  return {
    type: GET_USER_INFO_SUCCESS,
    name: data.user.name,
    email: data.user.email,
  };
};

export const getInfoUserFailed = () => {
  return { type: GET_USER_INFO_FAILED };
};

export const updateInfoUser = (name, email, accessToken, refreshToken) => {
  return {
    type: UPDATE_USER_INFO_REQUEST,
    name: name,
    email: email,
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
};

export const updateInfoUserSuccess = (data) => {
  return {
    type: UPDATE_USER_INFO_SUCCESS,
    name: data.user.name,
    email: data.user.email,
  };
};

export const updateInfoUserFailed = () => {
  return { type: UPDATE_USER_INFO_FAILED };
};