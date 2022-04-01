import { order } from "./order";
import { ordersReducer } from "./orders";
import { fetchOrder, requestOrderFailed } from "../actions/actionsOrder";
import { infoOrderCloseAction, infoOrderOpenAction, linkOpenInfoOrderAction } from "../actions/actionsOrders";
import { IIngredientData } from "../../utils/common-types";

const initialState= {
  order: undefined,
  modalInfoOrderOpen: false,
  linkInfoOrderOpen: false,
};
export const testOrder = {
  createdAt: "2022-02-09T15:56:00.422Z",
  ingredients: [{
    calories: 420,
    carbohydrates: 53,
    fat: 24,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    name: "Краторная булка N-200i",
    price: 1255,
    proteins: 80,
    type: "bun",
    __v: 0,
    _id: "60d3b41abdacab0026a733c6",
  }],
  name: "Space краторный бургер",
  number: 9829,
  status: "done",
  updatedAt: "2022-02-09T15:56:00.735Z",
  _id: "6203e4106d7cd8001b2d4f20"
};
describe("orders reducer", () => {
  it("should return the initial state", () => {
    expect(ordersReducer(undefined, {})).toEqual(initialState);
  });
  it("should MODAL_INFO_ORDER_OPEN", () => {
    const action = infoOrderOpenAction(testOrder);
    const state = ordersReducer(initialState, action);
    expect(state).toEqual({
      ...state,
      modalInfoOrderOpen: true,
      order: action.order,
    });
  });
  it("should MODAL_INFO_ORDER_CLOSE", () => {
    const action = infoOrderCloseAction();
    const state = ordersReducer(initialState, action);
    expect(state).toEqual({
      ...state,
      modalInfoOrderOpen: false,
    });
  });
  it("should LINK_OPEN_INFO_ORDER", () => {
    const action = linkOpenInfoOrderAction(testOrder);
    const state = ordersReducer(initialState, action);
    expect(state).toEqual({
      ...state,
      order: action.order,
      linkInfoOrderOpen: true,
    });
  });
});