import { RootState } from "../../store";

export const customDesignSelector = (state: RootState) => state.customDesign;

export const productGroupSelector = (state: RootState) =>
  customDesignSelector(state).productGroup;
export const isLoadingSelector = (state: RootState) =>
  customDesignSelector(state).isLoading;
export const hasErrorSelector = (state: RootState) =>
  customDesignSelector(state).hasError;
