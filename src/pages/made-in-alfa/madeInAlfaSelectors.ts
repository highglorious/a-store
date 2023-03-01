import { RootState } from "../../store";

export const madeInAlfaSelector = (state: RootState) => state.madeInAlfa;

export const productListSelector = (state: RootState) =>
  madeInAlfaSelector(state).productList;
export const isLoadingSelector = (state: RootState) =>
  madeInAlfaSelector(state).isLoading;
export const hasErrorSelector = (state: RootState) =>
  madeInAlfaSelector(state).hasError;
