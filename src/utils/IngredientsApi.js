import { INGREDIENTS_URL, ORDER_URL } from './constants';

const handleResponse = (res) => {
  if (!res.ok) {
    return Promise.reject(`Error: ${res.status}`);
  }
  return res.json();
};

export const getIngredientsList = () => {
  return fetch(INGREDIENTS_URL)
  .then(handleResponse);
};

export const placeAnOrder = (selectedIngredients) => {
  return fetch(ORDER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(
      {
        "ingredients": selectedIngredients
      }
    ),
  }).then(handleResponse);
};