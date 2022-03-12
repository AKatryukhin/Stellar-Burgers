import {
  CHANGE_PASSWORD_FAILED,
  CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_SUCCESS, GET_ORDER_NUMBER_FAILED,
  GET_ORDER_NUMBER_SUCCESS,
  GET_ORDER_REQUEST, RESET_PASSWORD_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS
} from "../types/action-types";

export const fetchResetPassword = (email) => {
  return { type: RESET_PASSWORD_REQUEST, payload: email };
};

export const resetPasswordSuccess = () => {
  return { type: RESET_PASSWORD_SUCCESS };
};

export const resetPasswordFailed = () => {
  return { type: RESET_PASSWORD_FAILED }
};

export const changePasswordRequest = (password, code) => {
  return { type: CHANGE_PASSWORD_REQUEST, password: password, token: code };
};

export const changePasswordSuccess = () => {
  return { type: CHANGE_PASSWORD_SUCCESS };
};

export const changePasswordFailed = () => {
  return { type: CHANGE_PASSWORD_FAILED }
};