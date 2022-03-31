import { auth } from "./auth";
import { currentIngredientReducer } from "./currentIngredient";
import { createUser } from "../actions/actionsAuth";
import { addCurrentIngredient, removeCurrentIngredient } from "../actions/actionsIngredient";

const initialState = {
  ingredient: {
    _id: "",
    name: "",
    type: "",
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image: "",
    image_mobile: "",
    image_large: "",
    __v: 0,
  },
};

describe("currentIngredient reducer", () => {
  it("should return the initial state", () => {
    expect(currentIngredientReducer(undefined, {})).toEqual(initialState);
  });
  it("should ADD_CURRENT_INGREDIENT", () => {
      const data = [
        {
          _id: "60d3b41abdacab0026a733c6",
          name: "Краторная булка N-200i",
          type: "bun",
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: "https://code.s3.yandex.net/react/code/bun-02.png",
          image_mobile:
            "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
          image_large:
            "https://code.s3.yandex.net/react/code/bun-02-large.png",
          __v: 0,
        },
        ]
    const action = addCurrentIngredient(data);
    const state = currentIngredientReducer(initialState, action);
    expect(state).toEqual({
      ...state,
      ingredient: action.ingredient,
    });
  });

  it("should REMOVE_CURRENT_INGREDIENT", () => {
    const action = removeCurrentIngredient();
    expect(currentIngredientReducer(initialState, action )).toEqual({
      ...initialState
    });
  });



});