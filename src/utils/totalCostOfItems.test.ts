import { describe, expect, test } from "@jest/globals";
import { CartItemType } from "../components/cart/cartSlice";
import { totalCostOfItems } from "./totalCostOfItems";

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

describe("Total Cost of Items Utility Test", () => {
  test("should return total cost equals to 8293", () => {
    const total = totalCostOfItems(cartItems);
    expect(total).toBe(8293);
  });
});
