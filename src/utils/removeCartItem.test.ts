import { describe, expect, test } from "@jest/globals";
import { removeCartItem } from "./removeCartItem";
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

describe("Remove CartItem Utility Test", () => {
  test("should return array with 2 rest items", () => {
    const item = removeCartItem(cartItems, {
      id: 1,
      size: "XL",
      color: "black",
    });
    expect(item.length).toBe(2);
  });
  test("should return array with 1 rest item", () => {
    let item = removeCartItem(cartItems, {
      id: 1,
      size: "XL",
      color: "black",
    });
    item = removeCartItem(item, {
      id: 0,
      model: "iPhone",
    });
    expect(item.length).toBe(1);
  });
});
