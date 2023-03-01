import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CustomProductParams } from "../../pages/product/productSlice";
import { ProductType } from "../../types/api";
import { removeCartItem } from "../../utils/removeCartItem";
import { findCartItem } from "../../utils/findCartItem";

export type CartItemType = CustomProductParams &
  Pick<ProductType, "id" | "preview" | "title" | "price"> & {
    quantity: number;
  };

export type CartItemQueryType = CustomProductParams & Pick<CartItemType, "id">;

type CartState = {
  items: CartItemType[];
};

const initialState: CartState = {
  items: [],
};

const addItemToCart = (
  state: CartState,
  { payload }: PayloadAction<CartItemType>
) => {
  const item = findCartItem(state.items, payload);

  if (item) {
    item.quantity++;
  } else {
    state.items.push(payload);
  }
};
const addItem = (
  state: CartState,
  { payload }: PayloadAction<CartItemQueryType>
) => {
  const item = findCartItem(state.items, payload);

  if (item) {
    item.quantity++;
  }
};
const removeItem = (
  state: CartState,
  { payload }: PayloadAction<CartItemQueryType>
) => {
  const item = findCartItem(state.items, payload);

  if (item) {
    if (item.quantity === 1) {
      state.items = removeCartItem(state.items, payload);
    } else {
      item.quantity--;
    }
  }
};
const deleteItems = (
  state: CartState,
  { payload }: PayloadAction<CartItemQueryType>
) => {
  state.items = removeCartItem(state.items, payload);
};

export const { actions: cartActions, reducer: cartReducer } = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: { addItemToCart, addItem, removeItem, deleteItems },
});
