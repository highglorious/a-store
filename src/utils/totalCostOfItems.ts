import { CartItemType } from "../components/cart/cartSlice";

export const totalCostOfItems = (items: CartItemType[]) =>
  items.reduce((total, item) => total + item.price * item.quantity, 0);
