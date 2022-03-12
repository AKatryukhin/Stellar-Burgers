import {
  GET_INGREDIENTS_FAILED, GET_ORDER_NUMBER_FAILED,
  GET_ORDER_NUMBER_SUCCESS,
  GET_ORDER_REQUEST,
  OPEN_ORDER_MODAL, RESET_ORDER_NUMBER
} from "../action-types/types";

export const fetchOrder = (orderIngredientsArr) => {
  return { type: GET_ORDER_REQUEST, payload: orderIngredientsArr };
};

export const requestOrderSuccess = (data) => {
  return { type: GET_ORDER_NUMBER_SUCCESS, payload: data.order.number };
};

export const requestOrderFailed = () => {
  return { type: GET_ORDER_NUMBER_FAILED }
};

export const openOrderModal = () => {
  return { type: OPEN_ORDER_MODAL };
};

export const resetOrder = () => {
  return { type: RESET_ORDER_NUMBER };
};