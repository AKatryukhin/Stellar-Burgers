import { IOrders } from "../types/data-types";
import { TWsActions } from "../actions/actionsWS";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR, WS_CONNECTION_SUCCESS,
  WS_CONNECTION_USER_CLOSED,
  WS_CONNECTION_USER_ERROR, WS_CONNECTION_USER_SUCCESS,
  WS_GET_ORDERS,
  WS_GET_USER_ORDERS
} from "../types/ws-types";

interface IWsState {
  wsConnected: boolean,
  wsProfileConnected: boolean,
  orders: Array<IOrders>,
  total: number,
  totalToday: number,
  userOrders: Array<IOrders>
}

export const initialState: IWsState = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0,
  userOrders: [],
  wsProfileConnected: false
};

export const wsReducer = (state = initialState, action: TWsActions): IWsState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false
      };

    case WS_GET_ORDERS:
      return {
        ...state,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
        orders: action.payload.orders
      };
    case WS_GET_USER_ORDERS:
      return {
        ...state,
        userOrders: action.payload.orders
      };
    case WS_CONNECTION_USER_SUCCESS:
      return {
        ...state,
        wsProfileConnected: true
      };
    case  WS_CONNECTION_USER_CLOSED:
      return {
        ...state,
        wsProfileConnected: false
      }
    case WS_CONNECTION_USER_ERROR:
      return {
        ...state,
        wsProfileConnected: false
      }
    default:
      return state;
  }
};