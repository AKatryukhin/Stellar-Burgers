import {
  GET_ORDER_NUMBER_FAILED,
  GET_ORDER_NUMBER_SUCCESS,
  GET_ORDER_REQUEST,
  OPEN_ORDER_MODAL, RESET_ORDER_NUMBER
} from "../types/action-types";
import { IResponseOrder } from "../types/data-types";

export interface IFetchOrderAction {
  readonly type: typeof GET_ORDER_REQUEST;
  readonly order: Array<string>;
  readonly accessToken: string | undefined;
}

export interface IRequestOrderSuccessAction {
  readonly type: typeof GET_ORDER_NUMBER_SUCCESS;
  readonly payload: number;
}

export interface IRequestOrderFailedAction {
  readonly type: typeof GET_ORDER_NUMBER_FAILED;
}

export interface IOpenOrderModalAction {
  readonly type: typeof OPEN_ORDER_MODAL;
}

export interface IResetOrderAction {
  readonly type: typeof RESET_ORDER_NUMBER;
}

export type TOrderActions =
  IFetchOrderAction |
  IRequestOrderSuccessAction |
  IRequestOrderFailedAction |
  IOpenOrderModalAction |
  IResetOrderAction;

export const fetchOrder = (token: string | undefined, orderIngredientsArr: Array<string>): IFetchOrderAction => {
  return { type: GET_ORDER_REQUEST, accessToken: token, order: orderIngredientsArr };
};

export const requestOrderSuccess = (data: IResponseOrder): IRequestOrderSuccessAction => {
  return { type: GET_ORDER_NUMBER_SUCCESS, payload: data.order.number };
};

export const requestOrderFailed = (): IRequestOrderFailedAction => {
  return { type: GET_ORDER_NUMBER_FAILED }
};

export const openOrderModal = (): IOpenOrderModalAction => {
  return { type: OPEN_ORDER_MODAL };
};

export const resetOrder = (): IResetOrderAction => {
  return { type: RESET_ORDER_NUMBER };
};