import { password, initialState } from "./password";
import {
  changePasswordFailed,
  changePasswordRequest, changePasswordSuccess,
  fetchResetPassword,
  resetPasswordFailed,
  resetPasswordSuccess
} from "../actions/actionsPassword";

describe("password reducer", () => {
  it("should return the initial state", () => {
    expect(password(undefined, {})).toEqual(initialState);
  });
  it("should RESET_PASSWORD_REQUEST", () => {
    const email = "testuser9@yandex.ru";
    const action = fetchResetPassword(email);
    const state = password(initialState, action);
    expect(state).toEqual({
      ...state,
      resetPasswordRequest: true
    });
  });
  it("should RESET_PASSWORD_SUCCESS", () => {
    const action = resetPasswordSuccess();
    const state = password(initialState, action);
    expect(state).toEqual({
      ...state,
      resetPasswordFailed: false,
      resetPasswordRequest: false,
      isResetPasswordSuccess: true,
    });
  });
  it("should RESET_PASSWORD_FAILED", () => {
    const action = resetPasswordFailed();
    const state = password(initialState, action);
    expect(state).toEqual({
      ...state,
      resetPasswordFailed: true,
    });
  });
  it("should CHANGE_PASSWORD_REQUEST", () => {
    const password1 = '123qweASD';
    const code = 'string';
    const action = changePasswordRequest(password1, code);
    const state = password(initialState, action);
    expect(state).toEqual({
      ...state,
      changePasswordRequest: true
    });
  });
  it("should CHANGE_PASSWORD_SUCCESS", () => {
    const action = changePasswordSuccess();
    const state = password(initialState, action);
    expect(state).toEqual({
      ...state,
      changePasswordFailed: false,
      changePasswordRequest: false,
      isChangePasswordSuccess: true,
    });
  });
  it("should CHANGE_PASSWORD_FAILED", () => {
    const action = changePasswordFailed();
    const state = password(initialState, action);
    expect(state).toEqual({
      ...state,
      changePasswordFailed: true,
    });
  });

});