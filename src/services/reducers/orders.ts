import {
  LINK_OPEN_INFO_ORDER,
  MODAL_INFO_ORDER_CLOSE,
  MODAL_INFO_ORDER_OPEN,
} from "../types/orders-types";
import { TOrdersActions } from "../actions/actionsOrders";
import { IOrdersFeed } from "../types/data-types";

export type TFeedState = {
  order?: IOrdersFeed;
  modalInfoOrderOpen: boolean;
  linkInfoOrderOpen: boolean;
};

export const initialState: TFeedState = {
  order: undefined,
  modalInfoOrderOpen: false,
  linkInfoOrderOpen: false,
};

export const ordersReducer = (
  state = initialState,
  action: TOrdersActions
): TFeedState => {
  switch (action.type) {
    case MODAL_INFO_ORDER_OPEN: {
      return {
        ...state,
        modalInfoOrderOpen: true,
        order: action.order,
      };
    }
    case MODAL_INFO_ORDER_CLOSE: {
      return {
        ...state,
        modalInfoOrderOpen: false,
      };
    }
    case LINK_OPEN_INFO_ORDER: {
      return {
        ...state,
        order: action.order,
        linkInfoOrderOpen: true,
      };
    }
    default: {
      return state;
    }
  }
};
