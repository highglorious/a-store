import { call, put, takeLatest } from "redux-saga/effects";
import { madeInAlfaActions } from "./";
import { getProducts } from "../../api/fetchData";
import { ProductListType } from "../../types/api";

function* fetchProductListSaga() {
  try {
    const res: ProductListType = yield call(getProducts, "made-in-alfa");
    yield put(madeInAlfaActions.success(res));
  } catch (error) {
    yield put(madeInAlfaActions.failure());
  }
}

export function* watchFetchProductListSaga() {
  yield takeLatest(madeInAlfaActions.request.type, fetchProductListSaga);
}
