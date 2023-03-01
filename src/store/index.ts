import createSagaMiddleware from "@redux-saga/core";
import { configureStore } from "@reduxjs/toolkit";
import { customDesignReducer } from "../pages/custom-design";
import { madeInAlfaReducer } from "../pages/made-in-alfa";
import { productReducer } from "../pages/product";
import { rootSaga } from "./root-saga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    madeInAlfa: madeInAlfaReducer,
    customDesign: customDesignReducer,
    product: productReducer,
  },
  middleware: [sagaMiddleware],
});
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof configureStore>;
