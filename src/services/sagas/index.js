import { spawn, call, put, all, takeEvery} from 'redux-saga/effects';
import {getIngredientsList} from "../../utils/IngredientsApi";
import {watchLoadIngredients} from "./ingredients";

export default function* rootSaga() {
    const sagas = [watchLoadIngredients];
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
