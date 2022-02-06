import {
  GET_REGISTRATION_REQUEST,
  GET_REGISTRATION_SUCCESS,
  GET_REGISTRATION_FAILED,
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
    // case CHANGE_PASSWORD_REQUEST: {
    //   return {
    //     ...state,
    //     changePasswordRequest: true
    //   };
    // }
    // case CHANGE_PASSWORD_SUCCESS: {
    //   return {
    //     ...state,
    //     changePasswordFailed: false,
    //     changePasswordRequest: false,
    //     isChangePasswordSuccess: true,
    //   };
    // }
    //
    // case CHANGE_PASSWORD_FAILED: {
    //   return {
    //     ...state,
    //     changePasswordFailed: true,
    //   };
    // }
    default:
      return state;
  }
};
