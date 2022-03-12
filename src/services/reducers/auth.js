import {
  GET_REGISTRATION_REQUEST,
  GET_REGISTRATION_SUCCESS,
  GET_REGISTRATION_FAILED,
  GET_LOGIN_REQUEST,
  GET_LOGIN_SUCCESS,
  GET_LOGIN_FAILED,
  GET_LOGOUT_SUCCESS,
  GET_LOGOUT_FAILED,
  GET_LOGOUT_REQUEST,
  GET_TOKEN_UPDATE_REQUEST,
  GET_TOKEN_UPDATE_SUCCESS,
  GET_TOKEN_UPDATE_FAILED,
  GET_USER_INFO_REQUEST,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAILED,
  UPDATE_USER_INFO_REQUEST,
  UPDATE_USER_INFO_SUCCESS, UPDATE_USER_INFO_FAILED
} from "../action-types/types";
import { getCookie } from "../../utils/cookie";

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

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case GET_REGISTRATION_REQUEST: {
      return {
        ...state,
        registerRequest: true,
      };
    }
    case GET_REGISTRATION_SUCCESS: {
      return {
        ...state,
        registerFailed: false,
        registerRequest: false,
        isRegisterSuccess: true,
        name: action.name,
        email: action.email,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
      };
    }

    case GET_REGISTRATION_FAILED: {
      return {
        ...state,
        registerFailed: true,
      };
    }
    case GET_LOGIN_REQUEST: {
      return {
        ...state,
        loginRequest: true,
      };
    }
    case GET_LOGIN_SUCCESS: {
      return {
        ...state,
        loginFailed: false,
        loginRequest: false,
        isLoginSuccess: true,
        name: action.name,
        email: action.email,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
      };
    }

    case GET_LOGIN_FAILED: {
      return {
        ...state,
        loginRequest: false,
        loginFailed: true,
      };
    }
    case GET_LOGOUT_REQUEST: {
      return {
        ...state,
        logoutRequest: true,
      };
    }
    case GET_LOGOUT_SUCCESS: {
      return {
        ...state,
        logoutFailed: false,
        logoutRequest: false,
        name: "",
        email: "",
        accessToken: "",
        refreshToken: "",
      };
    }

    case GET_LOGOUT_FAILED: {
      return {
        ...state,
        logoutRequest: false,
        loginFailed: true,
      };
    }
    case GET_TOKEN_UPDATE_REQUEST: {
      return {
        ...state,
        tokenUpdateRequest: true,
      };
    }
    case GET_TOKEN_UPDATE_SUCCESS: {
      return {
        ...state,
        tokenUpdateFailed: false,
        tokenUpdateRequest: false,
        tokenUpdateSuccess: true,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
      };
    }
    case GET_TOKEN_UPDATE_FAILED: {
      return {
        ...state,
        tokenUpdateFailed: true,
      };
    }
    case GET_USER_INFO_REQUEST: {
      return {
        ...state,
        getUserInfoRequest: true,
      };
    }
    case GET_USER_INFO_SUCCESS: {
      return {
        ...state,
        getUserInfoFailed: false,
        getUserInfoRequest: false,
        name: action.name,
        email: action.email,
      };
    }

    case GET_USER_INFO_FAILED: {
      return {
        ...state,
        getUserInfoFailed: true,
      };
    }
    case UPDATE_USER_INFO_REQUEST: {
      return {
        ...state,
        updateUserRequest: true,
      };
    }
    case UPDATE_USER_INFO_SUCCESS: {
      return {
        ...state,
        updateUserFailed: false,
        updateUserRequest: false,
        name: action.name,
        email: action.email,
      };
    }
    case UPDATE_USER_INFO_FAILED: {
      return {
        ...state,
        updateUserFailed: true,
      };
    }
    default:
      return state;
  }
};
