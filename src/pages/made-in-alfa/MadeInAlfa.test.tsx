import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { MadeInAlfa } from ".";
import { store } from "../../store";
import { renderWithProviders } from "../../utils/test-utils";

const serverResponse = [
  {
    id: 0,
    preview: "http://qa-games.ru/astore/public/images/15932051.jpeg",
    title: "Рюкзак «Для умных и свободных»",
    description:
      "Поместится и ноутбук, и худи. У рюкзака широкие красные лямки и светоотражающие элементы — вас заметят и днём, и ночью.",
    price: 4999,
    availability: true,
  },
  {
    id: 1,
    preview: "http://qa-games.ru/astore/public/images/68519498.jpeg",
    title: "Футболка Для умных и свободных",
    description:
      "Мягкая хлопковая футболка для тех, кто любит быть в центре внимания. Состав и способ ухода вынесли на самое видное место.",
    price: 1999,
    availability: true,
  },
  {
    id: 2,
    preview: "http://qa-games.ru/astore/public/images/77117755.jpeg",
    title: "Блокнот Для умных и свободных",
    description:
      "Под твёрдой обложкой — 300 белых страниц с градиентом. Должно хватить для небольшого романа или рабочих записей.",
    price: 1499,
    availability: true,
  },
  {
    id: 3,
    preview: "http://qa-games.ru/astore/public/images/15932051.jpeg",
    title: "Чехол с кардхолдером",
    description:
      "Чтобы карта всегда была под рукой. К чехлу мы сделали яркий стикер — вам решать, клеить его или нет.",
    price: 799,
    availability: false,
  },
  {
    id: 4,
    preview: "http://qa-games.ru/astore/public/images/56369345.jpeg",
    title: "Экоручка",
    description:
      "Мы сделали ручки из переработанной офисной бумаги. У нас всё идёт в дело.",
    price: 99,
    availability: true,
  },
];

export const handlers = [
  rest.get("http://qa-games.ru/astore/made-in-alfa", (req, res, ctx) => {
    return res(ctx.json(serverResponse), ctx.delay(10));
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const routes = [
  {
    path: "/made-in-alfa",
    element: <MadeInAlfa />,
  },
];

const router = createMemoryRouter(routes, {
  initialEntries: ["/made-in-alfa"],
});

describe("MadeInAlfa Page Test", () => {
  test("should render page with tilte, subtitle and 5 product cards", async () => {
    renderWithProviders(<RouterProvider router={router} />, { store });

    expect(await screen.findByText(/Сделано в Альфе/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Хотим каждую из этих вещей!/i)
    ).toBeInTheDocument();
    expect(screen.getAllByTestId("product-card")).toHaveLength(5);
  });
});
