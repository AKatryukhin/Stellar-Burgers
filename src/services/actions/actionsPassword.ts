import {
  CHANGE_PASSWORD_FAILED,
  CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_SUCCESS, GET_LOGIN_REQUEST, GET_LOGIN_SUCCESS, GET_ORDER_NUMBER_FAILED,
  GET_ORDER_NUMBER_SUCCESS,
  GET_ORDER_REQUEST, RESET_PASSWORD_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS
} from "../types/action-types";

export interface IFetchResetPasswordAction {
  readonly type: typeof RESET_PASSWORD_REQUEST;
  readonly payload: string;
}

export interface IResetPasswordSuccessAction {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
}

export interface IResetPasswordFailedAction {
  readonly type: typeof RESET_PASSWORD_FAILED;
}

export interface IChangePasswordRequestAction {
  readonly type: typeof CHANGE_PASSWORD_REQUEST;
  readonly password: string;
  readonly token: string;
}

export interface IChangePasswordSuccessAction {
  readonly type: typeof CHANGE_PASSWORD_SUCCESS;
}

export interface IChangePasswordFailedAction {
  readonly type: typeof CHANGE_PASSWORD_FAILED;
}

export const fetchResetPassword = (email: string): IFetchResetPasswordAction => {
  return { type: RESET_PASSWORD_REQUEST, payload: email };
};

export const resetPasswordSuccess = (): IResetPasswordSuccessAction => {
  return { type: RESET_PASSWORD_SUCCESS };
};

export const resetPasswordFailed = (): IResetPasswordFailedAction => {
  return { type: RESET_PASSWORD_FAILED }
};

export const changePasswordRequest = (password: string, code: string): IChangePasswordRequestAction => {
  return { type: CHANGE_PASSWORD_REQUEST, password: password, token: code };
};

export const changePasswordSuccess = (): IChangePasswordSuccessAction => {
  return { type: CHANGE_PASSWORD_SUCCESS };
};

export const changePasswordFailed = (): IChangePasswordFailedAction => {
  return { type: CHANGE_PASSWORD_FAILED }
};