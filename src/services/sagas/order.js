import {call, put, takeEvery} from "redux-saga/effects";
import {placeAnOrder} from "../../utils/IngredientsApi";



function* workGetOrderNumber(orderIngredientsArr) {
    try {
        const { data } = yield call(placeAnOrder(orderIngredientsArr));
        yield put({ type: 'GET_ORDER_NUMBER_SUCCESS', payload: data.order.number });
    } catch {
        yield put({ type: 'GET_ORDER_NUMBER_FAILED' });
    }
}

export function* watchGetOrderNumber() {
    yield takeEvery('GET_ORDER_REQUEST', workGetOrderNumber);
}