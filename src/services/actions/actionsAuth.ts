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
} from "../types/action-types";
import {
  ICreateOrLoginUserResponse,
  IGetUserInfoResponse,
  IUpdateTokenResponse,
  IUpdateUserInfoResponse,
} from "../types/data-types";

export interface ICreateUserAction {
  readonly type: typeof GET_REGISTRATION_REQUEST;
  readonly name: string;
  readonly email: string;
  readonly password: string;
}

export interface IRequestRegisterSuccessAction {
  readonly type: typeof GET_REGISTRATION_SUCCESS;
  readonly name: string;
  readonly email: string;
  readonly accessToken: string;
  readonly refreshToken: string;
}

export interface IRequestRegisterFailedAction {
  readonly type: typeof GET_REGISTRATION_FAILED;
}

export interface ILoginAction {
  readonly type: typeof GET_LOGIN_REQUEST;
  readonly email: string;
  readonly password: string;
}

export interface IRequestLoginSuccessAction {
  readonly type: typeof GET_LOGIN_SUCCESS;
  readonly name: string;
  readonly email: string;
  readonly accessToken: string;
  readonly refreshToken: string;
}

export interface IRequestLoginFailedAction {
  readonly type: typeof GET_LOGIN_FAILED;
}

export interface ILogoutAction {
  readonly type: typeof GET_LOGOUT_REQUEST;
  readonly token: string;
}

export interface IRequestLogoutSuccessAction {
  readonly type: typeof GET_LOGOUT_SUCCESS;
}

export interface IRequestLogoutFailedAction {
  readonly type: typeof GET_LOGOUT_FAILED;
}

export interface ITokenUpdateAction {
  readonly type: typeof GET_TOKEN_UPDATE_REQUEST;
  readonly token: string;
}

export interface ITokenUpdateSuccessAction {
  readonly type: typeof GET_TOKEN_UPDATE_SUCCESS;
  readonly accessToken: string;
  readonly refreshToken: string;
}

export interface ITokenUpdateFailedAction {
  readonly type: typeof GET_TOKEN_UPDATE_FAILED;
}

export interface IGetInfoUserAction {
  readonly type: typeof GET_USER_INFO_REQUEST;
  readonly accessToken: string;
  readonly refreshToken: string;
}

export interface IGetInfoUserSuccessAction {
  readonly type: typeof GET_USER_INFO_SUCCESS;
  readonly name: string;
  readonly email: string;
}

export interface IGetInfoUserFailedAction {
  readonly type: typeof GET_USER_INFO_FAILED;
}

export interface IUpdateInfoUserAction {
  readonly type: typeof UPDATE_USER_INFO_REQUEST;
  readonly name: string;
  readonly email: string;
  readonly accessToken: string;
  readonly refreshToken: string;
}

export interface IUpdateInfoUserSuccessAction {
  readonly type: typeof UPDATE_USER_INFO_SUCCESS;
  readonly name: string;
  readonly email: string;
}

export interface IUpdateInfoUserFailedAction {
  readonly type: typeof UPDATE_USER_INFO_FAILED;
}

export type TAuthActions =
  ICreateUserAction |
  IRequestRegisterSuccessAction |
  IRequestRegisterFailedAction |
  ILoginAction |
  IRequestLoginSuccessAction |
  IRequestLoginFailedAction |
  ILogoutAction |
  IRequestLogoutSuccessAction |
  IRequestLogoutFailedAction |
  ITokenUpdateAction |
  ITokenUpdateSuccessAction |
  ITokenUpdateFailedAction |
  IGetInfoUserAction |
  IGetInfoUserSuccessAction |
  IGetInfoUserFailedAction |
  IUpdateInfoUserAction |
  IUpdateInfoUserSuccessAction |
  IUpdateInfoUserFailedAction;

export const createUser = (
  name: string,
  email: string,
  password: string
): ICreateUserAction => {
  return {
    type: GET_REGISTRATION_REQUEST,
    name: name,
    email: email,
    password: password,
  };
};

export const requestRegisterSuccess = (
  data: ICreateOrLoginUserResponse
): IRequestRegisterSuccessAction => {
  return {
    type: GET_REGISTRATION_SUCCESS,
    name: data.user.name,
    email: data.user.email,
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
  };
};

export const requestRegisterFailed = (): IRequestRegisterFailedAction => {
  return { type: GET_REGISTRATION_FAILED };
};

export const login = (email: string, password: string): ILoginAction => {
  return {
    type: GET_LOGIN_REQUEST,
    email: email,
    password: password,
  };
};

export const requestLoginSuccess = (data: ICreateOrLoginUserResponse): IRequestLoginSuccessAction => {
  return {
    type: GET_LOGIN_SUCCESS,
    name: data.user.name,
    email: data.user.email,
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
  };
};

export const requestLoginFailed = (): IRequestLoginFailedAction => {
  return { type: GET_LOGIN_FAILED };
};

export const logout = (token: string): ILogoutAction => {
  return {
    type: GET_LOGOUT_REQUEST,
    token: token,
  };
};

export const requestLogoutSuccess = (): IRequestLogoutSuccessAction => {
  return {
    type: GET_LOGOUT_SUCCESS,
  };
};
export const requestLogoutFailed = (): IRequestLogoutFailedAction => {
  return { type: GET_LOGOUT_FAILED };
};

export const tokenUpdate = (token: string): ITokenUpdateAction => {
  return {
    type: GET_TOKEN_UPDATE_REQUEST,
    token: token,
  };
};

export const tokenUpdateSuccess = (data: IUpdateTokenResponse): ITokenUpdateSuccessAction => {
  return {
    type: GET_TOKEN_UPDATE_SUCCESS,
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
  };
};

export const tokenUpdateFailed = (): ITokenUpdateFailedAction => {
  return { type: GET_TOKEN_UPDATE_FAILED };
};

export const getInfoUser = (accessToken: string, refreshToken: string): IGetInfoUserAction => {
  return {
    type: GET_USER_INFO_REQUEST,
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
};

export const getInfoUserSuccess = (data: IGetUserInfoResponse): IGetInfoUserSuccessAction => {
  return {
    type: GET_USER_INFO_SUCCESS,
    name: data.user.name,
    email: data.user.email,
  };
};

export const getInfoUserFailed = (): IGetInfoUserFailedAction => {
  return { type: GET_USER_INFO_FAILED };
};

export const updateInfoUser = (
  name: string,
  email: string,
  accessToken: string,
  refreshToken: string
): IUpdateInfoUserAction => {
  return {
    type: UPDATE_USER_INFO_REQUEST,
    name: name,
    email: email,
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
};

export const updateInfoUserSuccess = (data: IUpdateUserInfoResponse): IUpdateInfoUserSuccessAction => {
  return {
    type: UPDATE_USER_INFO_SUCCESS,
    name: data.user.name,
    email: data.user.email,
  };
};

export const updateInfoUserFailed = (): IUpdateInfoUserFailedAction => {
  return { type: UPDATE_USER_INFO_FAILED };
};
