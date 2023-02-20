import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductListType } from "../../types/api";

type MadeInAlfaState = {
  productList: ProductListType;
  isLoading: boolean;
  hasError: boolean;
};

const initialState: MadeInAlfaState = {
  productList: [],
  isLoading: false,
  hasError: false,
};

const request = (state: MadeInAlfaState) => {
  state.isLoading = true;
  state.hasError = false;
};
const failure = (state: MadeInAlfaState) => {
  state.isLoading = false;
  state.hasError = true;
};

const success = (
  state: MadeInAlfaState,
  { payload }: PayloadAction<ProductListType>
) => {
  state.isLoading = false;
  state.hasError = false;
  state.productList = payload;
};

export const { actions: madeInAlfaActions, reducer: madeInAlfaReducer } =
  createSlice({
    name: "made-in-alfa",
    initialState: initialState,
    reducers: {
      request,
      success,
      failure,
    },
  });
