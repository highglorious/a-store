import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { Product } from ".";
import { renderWithProviders } from "../../utils/test-utils";
import { store } from "../../store";
import { ErrorBoundary } from "../../pages/error-boundary";

const serverResponse = [
  {
    id: 0,
    preview: "http://qa-games.ru/astore/public/images/64963633.png",
    images: [
      "http://qa-games.ru/astore/public/images/64963633.png",
      "http://qa-games.ru/astore/public/images/61838715.png",
      "http://qa-games.ru/astore/public/images/33717334.png",
      "http://qa-games.ru/astore/public/images/40444416.png",
      "http://qa-games.ru/astore/public/images/51875593.png",
    ],
    title: "title_0",
    subtitle: "subtitle_0",
    price: 1999,
    description: "description_0",
    colors: ["white", "black", "red", "green", "gray"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    stickerNumbers: [1, 2, 3, 4, 5],
    availability: true,
  },
  {
    id: 1,
    preview: "http://qa-games.ru/astore/public/images/64963633.png",
    images: [
      "http://qa-games.ru/astore/public/images/64963633.png",
      "http://qa-games.ru/astore/public/images/61838715.png",
      "http://qa-games.ru/astore/public/images/33717334.png",
      "http://qa-games.ru/astore/public/images/40444416.png",
      "http://qa-games.ru/astore/public/images/51875593.png",
    ],
    title: "title_1",
    subtitle: "subtitle_1",
    price: 1749,
    description: "description_1",

    availability: false,
  },
];

export const handlers = [
  rest.get("http://qa-games.ru/astore/product/0", (req, res, ctx) => {
    return res(ctx.json(serverResponse[0]), ctx.delay(10));
  }),
  rest.get("http://qa-games.ru/astore/product/1", (req, res, ctx) => {
    return res(ctx.json(serverResponse[1]), ctx.delay(10));
  }),
];
const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("ProductPage Test", () => {
  test("should render page with productId 0 specs, active button", async () => {
    const routes = [
      {
        path: "/product/:productId",
        element: <Product />,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/product/0"],
    });

    renderWithProviders(<RouterProvider router={router} />, { store });

    expect(await screen.findByText(/title_0/i)).toBeInTheDocument();
    expect(screen.getByText(/1 999 ₽/i)).toBeInTheDocument();
    expect(screen.getByText("цвет")).toBeInTheDocument();
    expect(screen.getByText(/В корзину/i)).toBeInTheDocument();
  });

  test("should render page with productId 1 specs, disabled button", async () => {
    const routes = [
      {
        path: "/product/:productId",
        element: <Product />,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/product/1"],
    });

    renderWithProviders(<RouterProvider router={router} />, { store });

    expect(await screen.findByText(/title_1/i)).toBeInTheDocument();
    expect(screen.getByText(/1 749 ₽/i)).toBeInTheDocument();
    expect(screen.queryByText("цвет")).not.toBeInTheDocument();
    expect(screen.getByText(/Нет в наличии/i)).toBeInTheDocument();
  });

  test("should render error page", async () => {
    server.use(
      rest.get("http://qa-games.ru/astore/product/0", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    const routes = [
      {
        path: "/product/:productId",
        element: <Product />,
        errorElement: <ErrorBoundary />,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/product/0"],
    });

    renderWithProviders(<RouterProvider router={router} />, { store });

    expect(await screen.findByText(/Что-то пошло не так/i)).toBeInTheDocument();
    expect(screen.queryByText(/title_0/i)).not.toBeInTheDocument();
  });
});
