import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";
// import logger from 'redux-logger';
import reducer from "../reducers";
import rootSaga from "../sagas";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_PROFILE_ORDERS_START,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_USER_CLOSED,
  WS_CONNECTION_USER_ERROR,
  WS_CONNECTION_USER_SUCCESS,
  WS_GET_ORDERS,
  WS_GET_USER_ORDERS,
} from "../types/ws-types";
import { socketMiddleware } from "../middleware/socket-middleware";

const sagaMiddleware = createSagaMiddleware();
const wsUrl = "wss://norma.nomoreparties.space/orders";
const wsActions = {
  wsInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_ORDERS,
};

const wsUserActions = {
  wsUserInit: WS_CONNECTION_PROFILE_ORDERS_START,
  onOpen: WS_CONNECTION_USER_SUCCESS,
  onClose: WS_CONNECTION_USER_CLOSED,
  onError: WS_CONNECTION_USER_ERROR,
  onMessage: WS_GET_USER_ORDERS,
};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false, serializableCheck: false }).concat(
      sagaMiddleware,
      socketMiddleware(wsUrl, wsActions),
      socketMiddleware(wsUrl, wsUserActions)
    ),
  devTools: process.env.NODE_ENV !== "production",
});

sagaMiddleware.run(rootSaga);
export default store;
