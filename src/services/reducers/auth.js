import {
  GET_REGISTRATION_REQUEST,
  GET_REGISTRATION_SUCCESS,
  GET_REGISTRATION_FAILED, GET_LOGIN_REQUEST, GET_LOGIN_SUCCESS, GET_LOGIN_FAILED
} from "../actions/types";

const initialState = {
  name: "",
  email: "",
  accessToken: "",
  refreshToken: "",
  registerRequest: false,
  registerFailed: false,
  isRegisterSuccess: false,
  loginRequest: false,
  loginFailed: false,
  logoutRequest: false,
  logoutFailed: false,
  tokenRequest: false,
  tokenFailed: false,
  getUserRequest: false,
  getUserFailed: false,
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
        refreshToken: action.refreshToken
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
        loginRequest: true
      };
    }
    case GET_LOGIN_SUCCESS: {
      return {
        ...state,
        loginFailed: false,
        loginRequest: false,
        name: action.name,
        email: action.email,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken
      };
    }

    case GET_LOGIN_FAILED: {
      return {
        ...state,
        loginFailed: true,
      };
    }
    default:
      return state;
  }
};
