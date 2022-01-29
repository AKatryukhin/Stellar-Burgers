import { spawn, call, put, all, takeEvery} from 'redux-saga/effects';
import {watchLoadIngredients} from "./ingredients";
import {watchGetOrderNumber} from "./order";
import {watchCurrentIngredients} from "./currentIngredient";


export default function* rootSaga() {
    const sagas = [
        watchLoadIngredients,
        watchGetOrderNumber,
        watchCurrentIngredients
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
