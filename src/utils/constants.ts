import { IOrders } from "../services/types/data-types";
import { IIngredientData } from "./common-types";

export const ESC_KEYCODE = 'Escape';
export const BASE_URL = 'https://norma.nomoreparties.space/api';

export const handleResponse = (res: Response) => {
  if (!res.ok) {
    return Promise.reject(`Error: ${res.status}`);
  }
  return res.json();
};

export const totalPrice = (someIngredients: Array<IIngredientData>) => {
  let price = 0;
  someIngredients.forEach((e: any) => {
    if (e.type === "bun") {
      price += 2 * e.price;
    } else {
      price += e.price;
    }
  });
  return price;
};

export const filterOrdersArray = (
  orders: Array<IOrders>,
  ingredientsArray: Array<IIngredientData>
) => {
  let a: any = [];
  let b: any = [];
  orders.forEach((o) => {
    o.ingredients.forEach((i) => {
      a.push(ingredientsArray.filter((e) => e._id === i)[0]);
    });
    b.push({
      ...o,
      ingredients: a,
    });
  });
  return b;
};