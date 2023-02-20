import { RootState } from "../../store";

export const productSelector = (state: RootState) => state.product;

export const itemProductSelector = (state: RootState) =>
  productSelector(state).product;
export const isLoadingSelector = (state: RootState) =>
  productSelector(state).isLoading;
export const hasErrorSelector = (state: RootState) =>
  productSelector(state).hasError;
export const colorSelector = (state: RootState) => productSelector(state).color;
export const sizeSelector = (state: RootState) => productSelector(state).size;
export const modelSelector = (state: RootState) => productSelector(state).model;
export const stickerNumberSelector = (state: RootState) =>
  productSelector(state).stickerNumber;
export const productIdSelector = (state: RootState) =>
  productSelector(state).productId;
