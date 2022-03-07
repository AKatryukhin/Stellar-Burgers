import { handleResponse, BASE_URL } from "./constants";
import { IIngredientData } from "./types";

export const getIngredientsList = () => {
  return fetch(`${BASE_URL}/ingredients`)
  .then(handleResponse);
};

export const placeAnOrder = (selectedIngredients: IIngredientData) => {
  return fetch(`${BASE_URL}/orders`, {
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