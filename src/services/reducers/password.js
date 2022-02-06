import {
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILED,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
} from "../actions/types";

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
        ...initialState,
        resetPasswordFailed: true,
      };
    }
    default:
      return state;
  }
};