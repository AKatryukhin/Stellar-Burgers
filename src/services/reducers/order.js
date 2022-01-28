const initialState = {
    orderNumber: null,
    orderNumberRequest: false,
    orderNumberFailed: false,
};

export const order = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ORDER_NUMBER_REQUEST': {
            return {
                ...state,
                orderNumberRequest: true
            };
        }
        case 'GET_ORDER_NUMBER_SUCCESS': {
            return {
                ...state,
                orderNumberFailed: false,
                orderNumber: action.payload,
                orderNumberRequest: false };
        }
        case 'RESET_ORDER_NUMBER': {
            return initialState;
        }

        case 'GET_ORDER_NUMBER_FAILED': {
            return {
                ...state,
                orderNumberFailed: true,
                orderNumberRequest: false };
        }
        default:
            return state;
    }
};
