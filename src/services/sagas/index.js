import { spawn, call, put, all, takeEvery} from 'redux-saga/effects';
import {watchLoadIngredients} from "./ingredients";
import {watchLoadSelectIngredients} from "./selectedIngredients";
import {watchGetOrderNumber} from "./order";


export default function* rootSaga() {
    const sagas = [
        watchLoadIngredients,
        watchLoadSelectIngredients,
        watchGetOrderNumber
    ];
    const retrySagas = yield sagas.map(saga => {
        return spawn(function* () {
            while (true) {
                try {
                    yield call(saga);
                    break;
                }
                catch (e) {
                    console.log(e);
                }
            }
        });
    });

    yield all(retrySagas);
}
