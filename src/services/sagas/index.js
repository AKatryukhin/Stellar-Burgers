import { spawn, call, all } from "redux-saga/effects";
import { watchLoadIngredients } from "./ingredients";
import { watchGetOrderNumber } from "./order";
import { watchPasswordActions } from "./password";

export default function* rootSaga() {
  const sagas = [watchLoadIngredients, watchGetOrderNumber, watchPasswordActions];
  const retrySagas = yield sagas.map((saga) => {
    return spawn(function* () {
      while (true) {
        try {
          yield call(saga);
          break;
        } catch (e) {
          console.log(e);
        }
      }
    });
  });

  yield all(retrySagas);
}
