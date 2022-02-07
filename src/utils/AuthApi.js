import {
  PASSWORD_CHANGE_URL,
  PASSWORD_RESET_URL,
  USER_LOGIN_URL,
  USER_LOGUT_URL,
  USER_REGISTER_URL, USER_UPDATE_TOKEN_URL
} from "./constants";
import { setCookie } from "./cookie";

const handleResponse = (res) => {
  if (!res.ok) {
    return Promise.reject(`Error: ${res.status}`);
  }
  return res.json();
};

export const fetchWithRefresh = async (url, options) => {
  const res = await fetch(url, options);

  if (res.ok) {
    return res.json();
  }

  const json = await res.json();

  if (json.message === "jwt expired") {
    const refreshRes = await userRefreshToken();
    const json = await refreshRes.json();

    if (!json.success) {
      return json;
    }
    setCookie("refreshToken", json.refreshToken);
    setCookie("accessToken", json.accessToken);

    options.headers.Authorization = json.accessToken;

    const res = await fetch(url, options);
    return res.json();
  } else {
    return json;
  }
};

export const passwordReset = ({ email }) => {
  return fetch(PASSWORD_RESET_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
    }),
  }).then(handleResponse);
};

export const passwordChange = ({ password, token }) => {
  return fetch(PASSWORD_CHANGE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
      token: token
    }),
  }).then(handleResponse);
};

export const userRegister = (name, email, password) => {
  return fetch(USER_REGISTER_URL, {
    method: "POST",
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      "Content-Type": "application/json",
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({
      password: password,
      name: name,
      email: email
    }),
  }).then(handleResponse);
};

export const userLogin = (email, password) => {
  return fetch(USER_LOGIN_URL, {
    method: "POST",
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      "Content-Type": "application/json",
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({
      password: password,
      email: email
    }),
  }).then(handleResponse);
};

export const userLogout = (refreshToken) => {
  return fetch(USER_LOGUT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: refreshToken,
    }),
  }).then(handleResponse);
}

export const userRefreshToken = (refreshToken) => {
  return fetch(USER_UPDATE_TOKEN_URL, {
    method: "POST",
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      "Content-Type": "application/json",
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({
      token: refreshToken,
    }),
  }).then(handleResponse);
}
