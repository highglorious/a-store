import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductListGroupType } from "../../types/api";

type CustomDesignState = {
  productGroup: ProductListGroupType;
  isLoading: boolean;
  hasError: boolean;
};

const initialState: CustomDesignState = {
  productGroup: [],
  isLoading: false,
  hasError: false,
};

const request = (state: CustomDesignState) => {
  state.isLoading = true;
  state.hasError = false;
};
const failure = (state: CustomDesignState) => {
  state.isLoading = false;
  state.hasError = true;
};

const success = (
  state: CustomDesignState,
  { payload }: PayloadAction<ProductListGroupType>
) => {
  state.isLoading = false;
  state.hasError = false;
  state.productGroup = payload;
};

export const { actions: customDesignActions, reducer: customDesignReducer } =
  createSlice({
    name: "custom-design",
    initialState: initialState,
    reducers: {
      request,
      success,
      failure,
    },
  });
