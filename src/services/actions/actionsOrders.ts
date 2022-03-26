import { LINK_OPEN_INFO_ORDER, MODAL_INFO_ORDER_CLOSE, MODAL_INFO_ORDER_OPEN } from "../types/orders-types";
import { IOrdersFeed } from "../types/data-types";

export interface IInfoOrderOpenAction {
  readonly type: typeof MODAL_INFO_ORDER_OPEN;
  readonly order: IOrdersFeed
}

export interface IInfoOrderCloseAction {
  readonly type: typeof MODAL_INFO_ORDER_CLOSE
}

export interface ILinkOpenInfoOrderAction {
  readonly type: typeof LINK_OPEN_INFO_ORDER;
  readonly order: IOrdersFeed
}

export type TOrdersActions =
  | IInfoOrderOpenAction
  | IInfoOrderCloseAction
  | ILinkOpenInfoOrderAction;

export const infoOrderOpenAction = (order: IOrdersFeed): IInfoOrderOpenAction => ({
  type: MODAL_INFO_ORDER_OPEN,
  order
})

export const infoOrderCloseAction = (): IInfoOrderCloseAction => ({
  type: MODAL_INFO_ORDER_CLOSE
})

export const linkOpenInfoOrderAction = (order: IOrdersFeed): ILinkOpenInfoOrderAction => ({
  type: LINK_OPEN_INFO_ORDER,
  order
})