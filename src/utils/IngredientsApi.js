import { INGREDIENTS_URL } from './constants';

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