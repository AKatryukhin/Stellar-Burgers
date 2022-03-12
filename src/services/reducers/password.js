import {
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILED,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
} from "../types/action-types";

const initialState = {
  resetPasswordRequest: false,
  resetPasswordFailed: false,
  changePasswordRequest: false,
  changePasswordFailed: false,
  isResetPasswordSuccess: false,
  isChangePasswordSuccess: false,
};

export const password = (state = initialState, action) => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        resetPasswordRequest: true
      };
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        resetPasswordFailed: false,
        resetPasswordRequest: false,
        isResetPasswordSuccess: true,
      };
    }

    case RESET_PASSWORD_FAILED: {
      return {
        ...state,
        resetPasswordFailed: true,
      };
    }
    case CHANGE_PASSWORD_REQUEST: {
      return {
        ...state,
        changePasswordRequest: true
      };
    }
    case CHANGE_PASSWORD_SUCCESS: {
      return {
        ...state,
        changePasswordFailed: false,
        changePasswordRequest: false,
        isChangePasswordSuccess: true,
      };
    }

    case CHANGE_PASSWORD_FAILED: {
      return {
        ...state,
        changePasswordFailed: true,
      };
    }
    default:
      return state;
  }
};