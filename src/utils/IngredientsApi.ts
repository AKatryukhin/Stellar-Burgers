import { handleResponse, BASE_URL } from "./constants";


export const getIngredientsList = () => {
  return fetch(`${BASE_URL}/ingredients`)
  .then(handleResponse);
};

export const placeAnOrder = (accessToken: string, order: Array<string>) => {
  return fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: accessToken,
    },
    body: JSON.stringify(
      {
        "ingredients": order
      }
    ),
  }).then(handleResponse);
};