import { auth } from "./auth";
import { password } from "./password";
import { createUser, login, requestRegisterFailed } from "../actions/actionsAuth";
import { fetchResetPassword, resetPasswordFailed, resetPasswordSuccess } from "../actions/actionsPassword";
import { GET_REGISTRATION_SUCCESS } from "../types/action-types";

const initialState = {
  resetPasswordRequest: false,
  resetPasswordFailed: false,
  changePasswordRequest: false,
  changePasswordFailed: false,
  isResetPasswordSuccess: false,
  isChangePasswordSuccess: false,
};
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
    const action = login();
    const state = auth(initialState, action);
    expect(state).toEqual({
      ...state,
      loginRequest: true,
    });
  });





});