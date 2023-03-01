import "@testing-library/jest-dom";
import { fireEvent, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { Cart } from ".";
import { store } from "../../store";
import { renderWithProviders } from "../../utils/test-utils";
import { cartActions } from "./cartSlice";

const routes = [
  {
    path: "/",
    element: <Cart />,
  },
];

const router = createMemoryRouter(routes, {
  initialEntries: ["/"],
});

describe("Cart Component Test", () => {
  test("should render 2 cart items with total cost", async () => {
    store.dispatch(
      cartActions.addItemToCart({
        id: 0,
        title: "title_0",
        preview: " ",
        price: 1000,
        quantity: 3,
      })
    );

    store.dispatch(
      cartActions.addItemToCart({
        id: 1,
        title: "title_1",
        preview: " ",
        price: 2000,
        quantity: 2,
      })
    );

    renderWithProviders(<RouterProvider router={router} />, { store });

    expect(screen.getByText("Итого:")).toBeInTheDocument();
    expect(screen.getByText("7 000")).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /delete/i })).toHaveLength(2);
  });

  test("should increment count of item and total price cart", async () => {
    store.dispatch(
      cartActions.deleteItems({
        id: 1,
      })
    );

    renderWithProviders(<RouterProvider router={router} />, { store });

    await fireEvent.click(screen.getByRole("button", { name: /increment/i }));

    expect(screen.getByText("4")).toBeInTheDocument();
  });

  test("should decrement count of item and total price cart", async () => {
    store.dispatch(
      cartActions.deleteItems({
        id: 1,
      })
    );

    renderWithProviders(<RouterProvider router={router} />, { store });

    await fireEvent.click(screen.getByRole("button", { name: /decrement/i }));
    await fireEvent.click(screen.getByRole("button", { name: /decrement/i }));
    await fireEvent.click(screen.getByRole("button", { name: /decrement/i }));

    expect(screen.getByText("1")).toBeInTheDocument();
    //expect(screen.getAllByRole("button", { name: /delete/i })).toHaveLength(2);
  });

  test("should delete item from cart", async () => {
    store.dispatch(
      cartActions.deleteItems({
        id: 1,
      })
    );

    renderWithProviders(<RouterProvider router={router} />, { store });

    await fireEvent.click(screen.getByRole("button", { name: /delete/i }));

    expect(
      screen.queryByRole("button", { name: /delete/i })
    ).not.toBeInTheDocument();
  });

  test("should delete item from cart if count is 1", async () => {
    store.dispatch(
      cartActions.addItemToCart({
        id: 1,
        title: "title_1",
        preview: " ",
        price: 2000,
        quantity: 1,
      })
    );

    renderWithProviders(<RouterProvider router={router} />, { store });

    await fireEvent.click(screen.getByRole("button", { name: /decrement/i }));

    expect(
      screen.queryByRole("button", { name: /delete/i })
    ).not.toBeInTheDocument();
  });
});
