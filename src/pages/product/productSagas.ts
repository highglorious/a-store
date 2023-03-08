import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, select, takeLatest } from "redux-saga/effects";
import { getProducts } from "../../api/fetchData";
import { ProductColorType, ProductType } from "../../types/api";
import { productActions } from "./";
import { productIdSelector } from "./productSelectors";

function* fetchProductSaga({ payload: productId }: PayloadAction<string>) {
  try {
    const prevId: ReturnType<typeof productIdSelector> = yield select(
      productIdSelector
    );
    const res: ProductType = yield call(getProducts, `product/${productId}`);
    yield put(productActions.success(res));
    if (res.id !== prevId) {
      yield put(productActions.setColor(res.colors?.at(0) as ProductColorType));
      yield put(productActions.setSize(res.sizes?.at(0)));
      yield put(productActions.setModel(res.models?.at(0)));
      yield put(productActions.setStickerNumber(res.stickerNumbers?.at(0)));
      yield put(productActions.setProductId(res.id));
    }
  } catch (error) {
    yield put(productActions.failure());
  }
}

export function* watchFetchProductSaga() {
  yield takeLatest(productActions.request.type, fetchProductSaga);
}
