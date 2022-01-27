import { spawn, call, put, all, takeEvery} from 'redux-saga/effects';
import {getIngredientsList} from "../../utils/IngredientsApi";

function* getIngredients() {
    try {
        const { data } = yield call(getIngredientsList);
        yield put({ type: 'GET_INGREDIENTS_SUCCESS', ingredients: data });
    } catch {
        yield put({ type: 'GET_INGREDIENTS_FAILED' });
    }
}

export function* watchLoadIngredients() {
    yield takeEvery('GET_INGREDIENTS_REQUEST', getIngredients);
}

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
