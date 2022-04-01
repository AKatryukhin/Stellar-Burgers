import { order } from "./order";
import { fetchOrder, requestOrderFailed, requestOrderSuccess, resetOrder } from "../actions/actionsOrder";

const initialState = {
  orderNumber: 0,
  orderNumberRequest: false,
  orderNumberFailed: false,
};

describe("order reducer", () => {
  it("should return the initial state", () => {
    expect(order(undefined, {})).toEqual(initialState);
  });
  it("should GET_ORDER_REQUEST", () => {
    const orderIngredientsArr = ["60d3b41abdacab0026a733c6", "60d3b41abdacab0026a733c6", "60d3b41abdacab0026a733cd"];
    const token = 'token';
    const action = fetchOrder(token, orderIngredientsArr);
    const state = order(initialState, action);
    expect(state).toEqual({
      ...state,
      orderNumberRequest: true
    });
  });
  it("should GET_ORDER_NUMBER_SUCCESS", () => {
    const data = {
      success: true,
      name: "Краторная булка N-200i",
      order: {
        number: 1325
      }
    }
    const action = requestOrderSuccess(data);
    const state = order(initialState, action);
    expect(state).toEqual({
      ...state,
      orderNumberFailed: false,
      orderNumber: action.payload,
      orderNumberRequest: false,
    });
  });
  it("should GET_ORDER_NUMBER_FAILED", () => {
    const action = requestOrderFailed();
    const state = order(initialState, action);
    expect(state).toEqual({
      ...initialState,
      orderNumberFailed: true,
    });
  });
  it("should RESET_ORDER_NUMBER", () => {
    const action = resetOrder();
    const state = order(initialState, action);
    expect(state).toEqual({
      ...initialState
    });
  });
});