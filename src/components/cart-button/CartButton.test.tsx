import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { CartButton } from ".";
import { store } from "../../store";
import { renderWithProviders } from "../../utils/test-utils";
import { cartActions } from "../cart/cartSlice";

const handler = () => {};
const routes = [
  {
    path: "/",
    element: <CartButton handleView={handler} />,
  },
];

const router = createMemoryRouter(routes, {
  initialEntries: ["/"],
});

describe("CartButton Component Test", () => {
  test("should not render with empty cart", async () => {
    renderWithProviders(<RouterProvider router={router} />, {
      store,
    });

    expect(screen.queryByTestId("cart-button")).not.toBeInTheDocument();
  });

  test("should render with badge showing the number of items that are equal to 5", async () => {
    store.dispatch(
      cartActions.addItemToCart({
        id: 0,
        title: "title_0",
        preview: " ",
        price: 4999,
        quantity: 3,
      })
    );

    store.dispatch(
      cartActions.addItemToCart({
        id: 1,
        title: "title_1",
        preview: " ",
        price: 1999,
        quantity: 2,
      })
    );

    renderWithProviders(<RouterProvider router={router} />, {
      store,
    });
    expect(screen.getByTestId("cart-button")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });
});
