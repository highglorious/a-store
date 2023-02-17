import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Product } from ".";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { routesConfig } from "../router";

describe("Product Page Test", () => {
  test("render page id 9", async () => {
    const routes = [
      {
        path: "/product/:productId",
        element: <Product />,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/product/9"],
    });

    render(<RouterProvider router={router} />);

    expect(screen.getByText(/Футболка с FLAT-стикерами/i)).toBeInTheDocument();
    expect(screen.getByText(/1 749 ₽/i)).toBeInTheDocument();
    expect(screen.getByText("цвет")).toBeInTheDocument();
    expect(screen.getByText(/В корзину/i)).toBeInTheDocument();
  });

  test("render page id 0", async () => {
    const routes = [
      {
        path: "/product/:productId",
        element: <Product />,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/product/0"],
    });

    render(<RouterProvider router={router} />);

    expect(
      screen.getByText(/Рюкзак «Для умных и свободных»/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/4 999 ₽/i)).toBeInTheDocument();
    expect(screen.queryByText("цвет")).not.toBeInTheDocument();
    expect(screen.getByText(/Нет в наличии/i)).toBeInTheDocument();
  });
});
