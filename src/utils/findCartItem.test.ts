import { describe, expect, test } from "@jest/globals";
import { findCartItem } from "./findCartItem";
import { CartItemType } from "../components/cart/cartSlice";

const cartItems: CartItemType[] = [
  {
    id: 0,
    preview: "img_0",
    title: "title_0",
    price: 99,
    model: "iPhone",
    quantity: 3,
  },
  {
    id: 1,
    preview: "img_0",
    title: "title_1",
    price: 1999,
    size: "XL",
    color: "white",
    quantity: 1,
  },
  {
    id: 1,
    preview: "img_1",
    title: "title_1",
    price: 1999,
    size: "XL",
    color: "black",
    quantity: 3,
  },
];

describe("Find CartItem Utility Test", () => {
  test("should return third array item", () => {
    const item = findCartItem(cartItems, {
      id: 1,
      size: "XL",
      color: "black",
    });
    expect(item).toBe(cartItems[2]);
    expect(item?.quantity).toBe(3);
  });
  test("should return first array item", () => {
    const item = findCartItem(cartItems, {
      id: 0,
      model: "iPhone",
    });
    expect(item).toBe(cartItems[0]);
  });
  test("should return undefined", () => {
    const item = findCartItem(cartItems, {
      id: 23,
      model: "iPhone",
    });
    expect(item).toBe(undefined);
  });
});
