import { describe, expect, test } from "@jest/globals";
import formatCurrency from "./formatCurrency";

//Intl use non-breaking space (Jest issue #9239 https://github.com/facebook/jest/issues/9239)
const nbs = "\xa0";

describe("Format Currency Utility Test", () => {
  test("should format 99 to 99 ₽", () => {
    const price = formatCurrency(99);
    expect(price).toBe(`99${nbs}₽`);
  });
  test("should format 1999 to 1 999 ₽", () => {
    const price = formatCurrency(1999);
    expect(price).toBe(`1${nbs}999${nbs}₽`);
  });
});
