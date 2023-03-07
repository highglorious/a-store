/* eslint-disable testing-library/no-debugging-utils */
import "@testing-library/jest-dom";
import preview from "jest-preview";
import { fireEvent, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { Order } from ".";
import { store } from "../../store";
import { renderWithProviders } from "../../utils/test-utils";
import { cartActions } from "../../components/cart/cartSlice";

const routes = [
  {
    path: "/",
    element: <Order />,
  },
];

const router = createMemoryRouter(routes, {
  initialEntries: ["/"],
});

describe("Order Page Test", () => {
  test("should render message if cart is empty", async () => {
    renderWithProviders(<RouterProvider router={router} />, { store });

    expect(screen.getByText("Корзина пуста")).toBeInTheDocument();
  });

  test("should render 1 cart items with total cost", async () => {
    store.dispatch(
      cartActions.addItemToCart({
        id: 0,
        title: "title_0",
        preview: " ",
        price: 1000,
        quantity: 5,
      })
    );

    renderWithProviders(<RouterProvider router={router} />, { store });

    preview.debug();
    expect(screen.getByText("Ваш заказ")).toBeInTheDocument();
    expect(screen.getByText("Итого:")).toBeInTheDocument();

    await fireEvent.click(screen.getByRole("radio", { name: /России/i }));
    expect(screen.getByText("5 350")).toBeInTheDocument();

    await fireEvent.click(screen.getByRole("radio", { name: /Москве/i }));
    expect(screen.getByText("5 300")).toBeInTheDocument();
  });
});
