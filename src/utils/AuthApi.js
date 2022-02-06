import { PASSWORD_RESET_URL } from "./constants";

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
