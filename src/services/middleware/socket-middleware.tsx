import type { Middleware, MiddlewareAPI } from 'redux';
import { getCookie } from "../../utils/cookie";
import { AppDispatch, RootState } from "../types/store-types";
import { TWsActions } from "../actions/actionsWS";

export const socketMiddleware = (wsUrl: string, wsActions: TWsActions): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => (action: TWsActions) => {
      const { dispatch } = store;
      const { type } = action;
      // @ts-ignore
      const { wsInit, onOpen, onClose, onError, onMessage, wsUserInit } = wsActions;

      if (type === wsInit) {
        socket = new WebSocket(`${wsUrl}/all`);
      } else if (type === wsUserInit) {
        if (getCookie('token')) {
          socket = new WebSocket(`${wsUrl}?token=${getCookie('token')}`);
        }
      }

      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        };
        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };
        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch({type: onMessage, payload: parsedData})
        };
        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
        };
      }
      next(action);
    };
  }) as Middleware;
};