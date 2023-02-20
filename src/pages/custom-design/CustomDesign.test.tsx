import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { CustomDesign } from ".";
import { store } from "../../store";
import { renderWithProviders } from "../../utils/test-utils";

const serverResponse = [
  {
    id: 0,
    title: "Бархатные стикеры",
    description: "Тактильный антистресс",
    products: [
      {
        id: 5,
        preview: "http://qa-games.ru/astore/public/images/43306375.jpeg",
        title: "Худи с бархатными стикерами",
        description:
          "Выберите стикер, а мы перенесём его на ткань — как на фото. Одежду можно стирать в машинке при 30 °C, вывернув наизнанку. Гладить — с внутренней стороны. Посмотреть и потрогать все стикеры можно в A-Store на Технопарке. А ещё там можно добавить сразу несколько стикеров на одну вещь.",
        price: 4199,
        availability: true,
        subtitle: "Выберите один из восьми стикеров",
      },
      {
        id: 6,
        preview: "http://qa-games.ru/astore/public/images/61646585.png",
        title: "Футболка с бархатными стикерами",
        description:
          "Выберите стикер, а мы перенесём его на ткань — как на фото. Одежду можно стирать в машинке при 30 °C, вывернув наизнанку. Гладить — с внутренней стороны. Посмотреть и потрогать все стикеры можно в A-Store на Технопарке. А ещё там можно добавить сразу несколько стикеров на одну вещь.",
        price: 1799,
        availability: true,
        subtitle: "Все варианты — внутри",
      },
      {
        id: 7,
        preview: "http://qa-games.ru/astore/public/images/51168667.png",
        title: "Футболка оверсайз с бархатными стикерами",
        description:
          "Выберите стикер, а мы перенесём его на ткань — как на фото. Одежду можно стирать в машинке при 30 °C, вывернув наизнанку. Гладить — с внутренней стороны. Посмотреть и потрогать все стикеры можно в A-Store на Технопарке. А ещё там можно добавить сразу несколько стикеров на одну вещь.",
        price: 1799,
        availability: true,
        subtitle: "Нажмите, чтобы выбрать стикер",
      },
    ],
  },
  {
    id: 1,
    title: "FLAT-стикеры",
    description: "Тема для обсуждения в любой компании",
    products: [
      {
        id: 8,
        preview: "http://qa-games.ru/astore/public/images/80077475.png",
        title: "Худи с FLAT-стикерами",
        description:
          "Выберите стикер, а мы перенесём его на ткань — как на фото. Одежду можно стирать в машинке при 30 °C, вывернув наизнанку. Гладить — с внутренней стороны. Посмотреть и потрогать все стикеры можно в A-Store на Технопарке. А ещё там можно добавить сразу несколько стикеров на одну вещь.",
        price: 4149,
        availability: true,
        subtitle: "Выберите один из 20 стикеров",
      },
      {
        id: 9,
        preview: "http://qa-games.ru/astore/public/images/64963633.png",
        title: "Футболка с FLAT-стикерами",
        description:
          "Выберите стикер, а мы перенесём его на ткань — как на фото. Одежду можно стирать в машинке при 30 °C, вывернув наизнанку. Гладить — с внутренней стороны. Посмотреть и потрогать все стикеры можно в A-Store на Технопарке. А ещё там можно добавить сразу несколько стикеров на одну вещь.",
        price: 1749,
        availability: true,
        subtitle: "Все варианты — внутри",
      },
      {
        id: 10,
        preview: "http://qa-games.ru/astore/public/images/48495271.png",
        title: "Футболка оверсайз с FLAT-стикерами",
        description:
          "Выберите стикер, а мы перенесём его на ткань — как на фото. Одежду можно стирать в машинке при 30 °C, вывернув наизнанку. Гладить — с внутренней стороны. Посмотреть и потрогать все стикеры можно в A-Store на Технопарке. А ещё там можно добавить сразу несколько стикеров на одну вещь.",
        price: 1949,
        availability: true,
        subtitle: "Нажмите, чтобы выбрать стикер",
      },
    ],
  },
  {
    id: 2,
    title: "3D-стикеры",
    description: "Дизайн с эффектом объёмного градиента",
    products: [
      {
        id: 11,
        preview: "http://qa-games.ru/astore/public/images/89787126.png",
        title: "Худи с 3D-стикерами",
        description:
          "Выберите стикер, а мы перенесём его на ткань — как на фото. Одежду можно стирать в машинке при 30 °C, вывернув наизнанку. Гладить — с внутренней стороны. Посмотреть и потрогать все стикеры можно в A-Store на Технопарке. А ещё там можно добавить сразу несколько стикеров на одну вещь.",
        price: 4099,
        availability: true,
        subtitle: "Нажмите, чтобы выбрать стикер",
      },
      {
        id: 12,
        preview: "http://qa-games.ru/astore/public/images/85987507.png",
        title: "Футболка с 3D-стикерами",
        description:
          "Выберите стикер, а мы перенесём его на ткань — как на фото. Одежду можно стирать в машинке при 30 °C, вывернув наизнанку. Гладить — с внутренней стороны. Посмотреть и потрогать все стикеры можно в A-Store на Технопарке. А ещё там можно добавить сразу несколько стикеров на одну вещь.",
        price: 1699,
        availability: true,
        subtitle: "Все варианты — внутри",
      },
      {
        id: 13,
        preview: "http://qa-games.ru/astore/public/images/79520262.png",
        title: "Футболка оверсайз с 3D-стикерами",
        description:
          "Выберите стикер, а мы перенесём его на ткань — как на фото. Одежду можно стирать в машинке при 30 °C, вывернув наизнанку. Гладить — с внутренней стороны. Посмотреть и потрогать все стикеры можно в A-Store на Технопарке. А ещё там можно добавить сразу несколько стикеров на одну вещь.",
        price: 1899,
        availability: true,
        subtitle: "Нажмите, чтобы выбрать стикер",
      },
    ],
  },
];

export const handlers = [
  rest.get("http://qa-games.ru/astore/custom-design", (req, res, ctx) => {
    return res(ctx.json(serverResponse), ctx.delay(10));
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const routes = [
  {
    path: "/custom-design",
    element: <CustomDesign />,
  },
];

const router = createMemoryRouter(routes, {
  initialEntries: ["/custom-design"],
});

describe("CustomDesign Page Test", () => {
  test("should render page with tilte, 3 group subtitles and 9 product cards", async () => {
    renderWithProviders(<RouterProvider router={router} />, { store });

    expect(await screen.findByText(/Свой дизайн/i)).toBeInTheDocument();
    expect(screen.getByText(/Бархатные стикеры/i)).toBeInTheDocument();
    expect(screen.getByText(/FLAT-стикеры/i)).toBeInTheDocument();
    expect(screen.getByText(/3D-стикеры/i)).toBeInTheDocument();
    expect(screen.getAllByTestId("product-card")).toHaveLength(9);
  });
});
