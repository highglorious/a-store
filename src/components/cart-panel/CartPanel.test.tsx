import "@testing-library/jest-dom";
import { fireEvent, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { CartPanel } from ".";
import { store } from "../../store";
import { renderWithProviders } from "../../utils/test-utils";
import { cartActions } from "../cart/cartSlice";

const handler = () => {};
const routes = [
  {
    path: "/",
    element: <CartPanel view={true} handleView={handler} />,
  },
];

const router = createMemoryRouter(routes, {
  initialEntries: ["/"],
});

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: any) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    }),
  });
});

describe("CartPanel Component Test", () => {
  test("should render component", async () => {
    store.dispatch(
      cartActions.addItemToCart({
        id: 4,
        title: "title_4",
        preview: "preview",
        price: 1000,
        quantity: 3,
        model: "pro max 12",
      })
    );

    renderWithProviders(<RouterProvider router={router} />, { store });

    expect(screen.getByText("Ваш заказ")).toBeInTheDocument();
    expect(screen.getByText("title_4")).toBeInTheDocument();
    expect(screen.getByText("Дальше")).toBeInTheDocument();
  });
});
