import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { CartItem } from ".";

import { store } from "../../store";
import { renderWithProviders } from "../../utils/test-utils";
import { CartItemType } from "../cart/cartSlice";

describe("Cart Item Component Test", () => {
  test("should render item with buttons", async () => {
    const cartItemProps: CartItemType = {
      id: 0,
      preview:
        "https://static.tildacdn.com/stor6531-3139-4435-b365-653562306137/98058636.jpg",
      title: "title_0",
      price: 1999,
      size: "S",
      color: "black",
      stickerNumber: 5,
      quantity: 5,
    };

    const routes = [
      {
        path: "/",
        element: <CartItem {...cartItemProps} />,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
    });

    renderWithProviders(<RouterProvider router={router} />, { store });

    screen.getByRole("button", { name: /delete/i });
    screen.getByRole("button", { name: /increment/i });
    screen.getByRole("button", { name: /decrement/i });
    expect(screen.getByText("title_0")).toBeInTheDocument();
    expect(screen.getByText("Стикер: 5")).toBeInTheDocument();
    expect(screen.getByText("Цвет: Черный")).toBeInTheDocument();
    expect(screen.getByText("Размер: S")).toBeInTheDocument();
    expect(screen.getByAltText("title_0")).toBeInTheDocument();
    expect(screen.getByText("9 995")).toBeInTheDocument();
  });
});
