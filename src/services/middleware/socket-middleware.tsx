import type { Middleware, MiddlewareAPI } from 'redux';
import { getCookie } from "../../utils/cookie";
import { AppDispatch, RootState } from "../types/store-types";
import { TWsAction, TWsActions } from "../actions/actionsWS";

export const socketMiddleware = (wsUrl: string, wsActions: TWsAction): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => (action: TWsActions) => {
      const { dispatch } = store;
      const { type } = action;
      const { wsInit, onOpen, onClose, onError, onMessage, wsUserInit } = wsActions;

      if (type === wsInit) {
        socket = new WebSocket(`${wsUrl}/all`);
      } else if (type === wsUserInit) {
        if (getCookie('accessToken')) {
           const token = getCookie('accessToken')
          const sliceToken = token && token.split('Bearer ')[1];
          socket = new WebSocket(`${wsUrl}?token=${sliceToken}`);
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