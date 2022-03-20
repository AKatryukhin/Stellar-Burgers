import { IOrders } from "../services/types/data-types";
import { IIngredientData } from "./common-types";

export const ESC_KEYCODE = "Escape";
export const BASE_URL = "https://norma.nomoreparties.space/api";

export const handleResponse = (res: Response) => {
  if (!res.ok) {
    return Promise.reject(`Error: ${res.status}`);
  }
  return res.json();
};

export const totalPrice = (someIngredients: Array<IIngredientData>) => {
  return someIngredients.reduce((sum: number, i: IIngredientData) => {
    console.log(i.type);
    return i.type === "bun" ? sum + 2 * i.price : sum + i.price;
  }, 0);
};

export const filterOrdersArray = (
  orders: Array<IOrders>,
  ingredientsArray: Array<IIngredientData>
) => {
  console.log(orders);
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
    a = [];
  });
  console.log(b);
  return b;
};
