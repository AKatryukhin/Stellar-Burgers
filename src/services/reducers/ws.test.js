import {wsReducer} from "./ws";
import {
  wsConnectionClosed,
  wsConnectionError,
  wsConnectionSuccess, wsConnectionUserError, wsConnectionUserSuccess,
  wsGetOrders,
  wsGetUserOrders, wsUserConnectionClosed
} from "../actions/actionsWS";

// export const order = {
//   ingredients: [{
//     calories: 643,
//     carbohydrates: 85,
//     fat: 26,
//     image: "https://code.s3.yandex.net/react/code/bun-01.png",
//     image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
//     image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
//     name: "Флюоресцентная булка R2-D3",
//     price: 988,
//     proteins: 44,
//     type: "bun",
//     __v: 0,
//     _id: "60d3b41abdacab0026a733c7",
//   },
//     {
//       calories: 14,
//       carbohydrates: 11,
//       fat: 22,
//       image: "https://code.s3.yandex.net/react/code/sauce-04.png",
//       image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
//       image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
//       name: "Соус фирменный Space Sauce",
//       price: 80,
//       proteins: 50,
//       type: "sauce",
//       __v: 0,
//       _id: "60d3b41abdacab0026a733cd",
//     }],
//   name: "Флюоресцентный space бургер",
//   number: 12355,
//   status: "done",
//   _id: '615c66437deb54001ba5f58b',
//   createdAt: "2022-03-20T09:30:58.061Z",
//   updatedAt: "2022-03-22T16:23:10.075Z",
// };

const orders =  {createdAt: "2022-03-29T15:30:11.130Z",
  ingredients: ["60d3b41abdacab0026a733c6", "60d3b41abdacab0026a733c6", "60d3b41abdacab0026a733cd"],
  name: "Краторный space бургер",
  number: 12423,
  status: "done",
  updatedAt: "2022-03-29T15:30:11.376Z",
  _id: "6243260325b9a4001b6eb1e1"}

const payloadUser = {
  total: 10,
  totalToday: 5,
  orders: [orders]
}

const payload = {
  total: 10,
  totalToday: 5,
  orders: [orders]
}


describe('webSocket reducer', () => {
  const initialState = {
    wsConnected: false,
    orders: [],
    total: 0,
    totalToday: 0,
    userOrders: [],
    wsProfileConnected: false
  };
  it('should return the initial state', () => {
    expect(wsReducer(undefined, {})).toEqual(initialState)
  })
  it('should WS_CONNECTION_SUCCESS', () => {
    const action = wsConnectionSuccess()
    const state = wsReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      wsConnected: true,
    });
  })
  it('should WS_CONNECTION_ERROR', () => {
    const action = wsConnectionError()
    const state = wsReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      wsConnected: false,
    });
  })
  it('should WS_CONNECTION_CLOSED', () => {
    const action = wsConnectionClosed()
    const state = wsReducer(initialState, action);
    expect(state).toEqual({
      ...state,
      wsConnected: false
    });
  })
  it('should WS_GET_ORDERS', () => {
    const action = wsGetOrders(payload)
    const state = wsReducer(initialState, action);
    expect(state).toEqual({
      ...state,
      total: 10,
      totalToday: 5,
      orders: [orders]
    })
  })
  it('should WS_GET_USER_ORDERS', () => {
    const action = wsGetUserOrders(payloadUser)
    const state = wsReducer(initialState, action);
    expect(state).toEqual({
      ...state,
      userOrders: [orders],
    })
  })
  it('should WS_CONNECTION_USER_SUCCESS', () => {
    const action = wsConnectionUserSuccess()
    const state = wsReducer(initialState, action);
    expect(state).toEqual({
      ...state,
      wsProfileConnected: true
    })
  })
  it('should WS_CONNECTION_USER_CLOSED', () => {
    const action = wsUserConnectionClosed()
    const state = wsReducer(initialState, action);
    expect(state).toEqual({
      ...state,
      wsProfileConnected: false
    })
  })
  it('should handle WS_CONNECTION_USER_ERROR', () => {
    const action = wsConnectionUserError()
    const state = wsReducer(initialState, action);
    expect(state).toEqual({
      ...state,
      wsProfileConnected: false
    })
  })
})