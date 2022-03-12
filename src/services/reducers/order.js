import {
    GET_ORDER_NUMBER_FAILED,
    GET_ORDER_NUMBER_REQUEST,
    GET_ORDER_NUMBER_SUCCESS,
    RESET_ORDER_NUMBER
} from "../action-types/types";

const initialState = {
    orderNumber: null,
    orderNumberRequest: false,
    orderNumberFailed: false,
};

export const order = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDER_NUMBER_REQUEST: {
            return {
                ...state,
                orderNumberRequest: true
            };
        }
        case GET_ORDER_NUMBER_SUCCESS: {
            return {
                ...state,
                orderNumberFailed: false,
                orderNumber: action.payload,
                orderNumberRequest: false,
            };
        }
        case RESET_ORDER_NUMBER: {
            return initialState;
        }

        case GET_ORDER_NUMBER_FAILED: {
            return {
                ...initialState,
                orderNumberFailed: true,
                 };
        }
        default:
            return state;
    }
};
