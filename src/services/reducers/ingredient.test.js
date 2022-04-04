import { ingredientsReducer, initialState } from "./ingredients";
import {
  clearIngredientsCount,
  decreaseCount,
  fetchIngredients, increaseCount,
  requestIngredientsFailed,
  requestIngredientsSuccess,
  resetIngredients
} from "../actions/actionsIngredient";

describe("ingredients reducer", () => {
  it("should return the initial state", () => {
    expect(ingredientsReducer(undefined, {})).toEqual(initialState);
  });
  it("should GET_INGREDIENTS_REQUEST", () => {
    const action = fetchIngredients();
    const state = ingredientsReducer(initialState, action);
    expect(state).toEqual({
      ...state,
      ingredientsRequest: true,
    });
  });
  it("should GET_INGREDIENTS_SUCCESS", () => {
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
      } ]
    const action = requestIngredientsSuccess(data);
    const state = ingredientsReducer(initialState, action);
    expect(state).toEqual({
      ...state,
      ingredientsFailed: false,
      ingredients: action.ingredients,
      ingredientsRequest: false,
      loaded: true
    });
  });
  it("should GET_INGREDIENTS_FAILED", () => {
    const action = requestIngredientsFailed();
    const state = ingredientsReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      ingredientsFailed: true,
    });
  });
  it("should RESET_INGREDIENTS", () => {
    const action = resetIngredients();
    const state = ingredientsReducer(initialState, action);
    expect(state).toEqual({
      ...initialState
    });
  });
  it("should INCREASE_COUNT", () => {
    const ingredient =
      {
        _id: "60d3b41abdacab0026a733c6",
        name: "Краторная булка N-200i",
        type: "main",
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        count: null,
        price: 1255,
        image: "https://code.s3.yandex.net/react/code/bun-02.png",
        image_mobile:
          "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        image_large:
          "https://code.s3.yandex.net/react/code/bun-02-large.png",
        __v: 0,
      }
    const action = increaseCount(ingredient, 2);
    ingredient.count = 2;
    const state = ingredientsReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      ingredients: [
        ...initialState.ingredients,
        ingredient
      ]
    });
  });
  it("should DECREASE_COUNT", () => {
    const ingredient =
      {
        _id: "60d3b41abdacab0026a733c6",
        name: "Краторная булка N-200i",
        type: "main",
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        count: 2,
        price: 1255,
        image: "https://code.s3.yandex.net/react/code/bun-02.png",
        image_mobile:
          "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        image_large:
          "https://code.s3.yandex.net/react/code/bun-02-large.png",
        __v: 0,
      }
    const action = decreaseCount(ingredient);
    ingredient.count = 1;
    const state = ingredientsReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      ingredients: [
        ...initialState.ingredients
      ]
    });
  });
  it("should CLEAR_INGREDIENT_LIST_COUNT", () => {
    const action = clearIngredientsCount();
    const state = ingredientsReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      ingredients: [
        ...initialState.ingredients
      ]
    });
  });
});