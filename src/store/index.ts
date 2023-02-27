import createSagaMiddleware from "@redux-saga/core";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { cartReducer } from "../components/cart/cartSlice";
import { customDesignReducer } from "../pages/custom-design";
import { madeInAlfaReducer } from "../pages/made-in-alfa";
import { productReducer } from "../pages/product";
import { rootSaga } from "./root-saga";

const persistConfig = {
  key: "cart",
  storage,
};

const sagaMiddleware = createSagaMiddleware();
const persistedReducer = persistReducer(persistConfig, cartReducer);

export const store = configureStore({
  reducer: {
    madeInAlfa: madeInAlfaReducer,
    customDesign: customDesignReducer,
    product: productReducer,
    cart: persistedReducer,
  },
  middleware: [sagaMiddleware],
});
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof configureStore>;
export const persistor = persistStore(store);
