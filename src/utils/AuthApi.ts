import { BASE_URL, handleResponse } from "./constants";

const handleResponseJWT = (res: Response) => {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((err) => Promise.reject(err));
};

export const passwordReset = (email: string) => {
  return fetch(`${BASE_URL}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
    }),
  }).then(handleResponse);
};

export const passwordChange = (password: string, token: string) => {
  return fetch(`${BASE_URL}/password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
      token: token,
    }),
  }).then(handleResponse);
};

export const userRegister = (name: string, email: string, password: string) => {
  return fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({
      password: password,
      name: name,
      email: email,
    }),
  }).then(handleResponse);
};

export const userLogin = (email: string, password: string) => {
  return fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({
      password: password,
      email: email,
    }),
  }).then(handleResponse);
};

export const userLogout = (refreshToken: string) => {
  return fetch(`${BASE_URL}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: refreshToken,
    }),
  }).then(handleResponse);
};

export const userRefreshToken = (refreshToken: string) => {
  return fetch(`${BASE_URL}/auth/token`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({
      token: refreshToken,
    }),
  }).then(handleResponse);
};

export const getUserInfo = (accessToken: string) => {
  return fetch(`${BASE_URL}/auth/user`, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      authorization: accessToken,
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  }).then(handleResponseJWT);
};

export const updateUserInfo = (
  name: string,
  email: string,
  accessToken: string
) => {
  return fetch(`${BASE_URL}/auth/user`, {
    method: "PATCH",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      authorization: accessToken,
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({
      name: name,
      email: email,
    }),
  }).then(handleResponseJWT);
};
