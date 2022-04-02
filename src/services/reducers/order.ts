import {
    GET_ORDER_NUMBER_FAILED,
    GET_ORDER_NUMBER_SUCCESS, GET_ORDER_REQUEST,
    RESET_ORDER_NUMBER
} from "../types/action-types";
import { TOrderActions } from "../actions/actionsOrder";

type TOrderState = {
    orderNumber: number | null;
    orderNumberRequest: boolean;
    orderNumberFailed: boolean;
};

const initialState: TOrderState = {
    orderNumber: null,
    orderNumberRequest: false,
    orderNumberFailed: false,
};

export const order = (state = initialState, action: TOrderActions): TOrderState => {
    switch (action.type) {
        case GET_ORDER_REQUEST: {
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
