import { PASSWORD_CHANGE_URL, PASSWORD_RESET_URL, USER_REGISTER_URL } from "./constants";

const handleResponse = (res) => {
  if (!res.ok) {
    return Promise.reject(`Error: ${res.status}`);
  }
  return res.json();
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

export const userRegister = ({ name, email, password }) => {
  return fetch(USER_REGISTER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
      name: name,
      email: email
    }),
  }).then(handleResponse);
};
