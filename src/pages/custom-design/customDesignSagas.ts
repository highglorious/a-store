import { call, put, takeLatest } from "redux-saga/effects";
import { getProducts } from "../../api/fetchData";
import { ProductListGroupType } from "../../types/api";
import { customDesignActions } from "./";

function* fetchProductGroupSaga() {
  try {
    const res: ProductListGroupType = yield call(getProducts, "your-design");
    yield put(customDesignActions.success(res));
  } catch (error) {
    yield put(customDesignActions.failure());
  }
}

export function* watchFetchProductGroupSaga() {
  yield takeLatest(customDesignActions.request.type, fetchProductGroupSaga);
}
