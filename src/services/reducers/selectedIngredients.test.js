import { selectedIngredientsReducer, initialState} from "./selectedIngredients";
import {
  addSelectIngredient,
  clearSelectIngredientList,
  moveSelectIngredient,
  removeSelectIngredient
} from "../actions/actionsSelectIngredient";

describe("ingredients reducer", () => {
  it("should return the initial state", () => {
    expect(selectedIngredientsReducer(undefined, {})).toEqual(initialState);
  });
  it("should MOVE_INGREDIENT", () => {
    const ingredient = {
      _id: "60d3b41abdacab0026a733c6",
      name: "Краторная булка N-200i",
      type: "main",
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
    };
    const bun = {
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
    };
    const action = moveSelectIngredient([ingredient], [bun]);
    const state = selectedIngredientsReducer(initialState, action);
    expect(state).toEqual({
      ...state,
      selectedIngredients: [ingredient, bun]
    });
  });
  it("should ADD_SELECTED_INGREDIENT", () => {
    const data =
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
      }
    const action = addSelectIngredient(data);
    const state = selectedIngredientsReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      selectedIngredients: [...initialState.selectedIngredients, data],
    });
  });
  it("should DELETE_SELECTED_INGREDIENT", () => {
    const data =
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
      }
    const action = removeSelectIngredient(data);
    const state = selectedIngredientsReducer(initialState, action);
    expect(state).toEqual({
      ...state,
      selectedIngredients: [...state.selectedIngredients].filter(
        (i) => i.key !== action.payload.key
      ),
    });
  });
  it("should CLEAR_SELECTED_INGREDIENT_LIST", () => {
    const action = clearSelectIngredientList();
    const state = selectedIngredientsReducer(initialState, action);
    expect(state).toEqual({
      ...initialState
    });
  });



});