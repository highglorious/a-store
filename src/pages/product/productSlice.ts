import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductColorType, ProductType } from "../../types/api";

type ProductState = {
  product: ProductType;
  isLoading: boolean;
  hasError: boolean;
  color?: ProductColorType;
  size?: string;
  stickerNumber?: number;
  model?: string;
  productId: number;
};

const initialState: ProductState = {
  product: {} as ProductType,
  isLoading: false,
  hasError: false,
  productId: -1,
};

const request = (state: ProductState, { payload }: PayloadAction<string>) => {
  state.isLoading = true;
  state.hasError = false;
};
const failure = (state: ProductState) => {
  state.isLoading = false;
  state.hasError = true;
};
const success = (
  state: ProductState,
  { payload }: PayloadAction<ProductType>
) => {
  state.isLoading = false;
  state.hasError = false;
  state.product = payload;
};
const setColor = (
  state: ProductState,
  { payload }: PayloadAction<ProductState["color"]>
) => {
  state.color = payload;
};
const setSize = (
  state: ProductState,
  { payload }: PayloadAction<ProductState["size"]>
) => {
  state.size = payload;
};
const setModel = (
  state: ProductState,
  { payload }: PayloadAction<ProductState["model"]>
) => {
  state.model = payload;
};
const setStickerNumber = (
  state: ProductState,
  { payload }: PayloadAction<ProductState["stickerNumber"]>
) => {
  state.stickerNumber = payload;
};
const setProductId = (
  state: ProductState,
  { payload }: PayloadAction<ProductState["productId"]>
) => {
  state.productId = payload;
};

export const { actions: productActions, reducer: productReducer } = createSlice(
  {
    name: "product",
    initialState: initialState,
    reducers: {
      request,
      success,
      failure,
      setColor,
      setSize,
      setModel,
      setStickerNumber,
      setProductId,
    },
  }
);
