import { fork } from "redux-saga/effects";
import { watchFetchProductGroupSaga } from "../pages/custom-design/customDesignSagas";
import { watchFetchProductListSaga } from "../pages/made-in-alfa/madeInAlfaSagas";
import { watchFetchProductSaga } from "../pages/product/productSagas";

export function* rootSaga() {
  yield fork(watchFetchProductListSaga);
  yield fork(watchFetchProductSaga);
  yield fork(watchFetchProductGroupSaga);
}
