/* eslint-disable testing-library/no-debugging-utils */
import "@testing-library/jest-dom";
import preview from "jest-preview";
import { fireEvent, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { Order } from ".";
import { store } from "../../store";
import { setupServer } from "msw/node";
import { renderWithProviders } from "../../utils/test-utils";
import { cartActions } from "../../components/cart/cartSlice";
import { rest } from "msw";
import { CreateOrderType } from "../../types/api";

const routes = [
  {
    path: "/",
    element: <Order />,
  },
];

const router = createMemoryRouter(routes, {
  initialEntries: ["/"],
});

const data: CreateOrderType = {
  name: "name",
  email: "valid@email.com",
  phone: "+7 999 999-99-99",
  address: "address",
  deliveryType: "Самовывоз (пр-т Андропова, 18 корп. 3)",
  paymentType: "Банковская карта",
  products: [
    {
      id: 0,
      totalPrice: 5000,
      totalCount: 5,
      color: "green",
    },
  ],
};

export const handlers = [
  rest.post("http://qa-games.ru/astore/create-order", async (req, res, ctx) => {
    const payload = await req.json();

    console.log(JSON.stringify(payload));
    console.log(JSON.stringify(data));

    if (JSON.stringify(payload) === JSON.stringify(data)) {
      return res(ctx.status(200));
    } else {
      return res(ctx.status(400));
    }
  }),
];
const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Order Page Test", () => {
  test("should render message if cart is empty", async () => {
    renderWithProviders(<RouterProvider router={router} />, { store });

    expect(screen.getByText("Корзина пуста")).toBeInTheDocument();
  });

  test("should render error notification", async () => {
    server.use(
      rest.post("http://qa-games.ru/astore/create-order", (req, res, ctx) => {
        return res.networkError("Failed to connect");
      })
    );

    store.dispatch(
      cartActions.addItemToCart({
        id: 0,
        title: "title_0",
        preview: " ",
        price: 1000,
        quantity: 5,
        color: "green",
      })
    );

    renderWithProviders(<RouterProvider router={router} />, { store });

    fireEvent.input(screen.getByRole("textbox", { name: /ФИО/i }), {
      target: {
        value: "name",
      },
    });

    fireEvent.input(screen.getByRole("textbox", { name: /E-mail/i }), {
      target: {
        value: "valid@email.com",
      },
    });

    fireEvent.input(screen.getByRole("textbox", { name: /Телефон/i }), {
      target: {
        value: "9999999999",
      },
    });

    fireEvent.input(screen.getByRole("textbox", { name: /Адрес/i }), {
      target: {
        value: "address",
      },
    });

    fireEvent.click(screen.getByRole("checkbox"));

    await fireEvent.click(screen.getByRole("button", { name: "next" }));

    expect(await screen.findByText("Что-то пошло не так!")).toBeInTheDocument();
  });

  test("should render succesful text", async () => {
    renderWithProviders(<RouterProvider router={router} />, { store });

    fireEvent.input(screen.getByRole("textbox", { name: /ФИО/i }), {
      target: {
        value: "name",
      },
    });

    fireEvent.input(screen.getByRole("textbox", { name: /E-mail/i }), {
      target: {
        value: "valid@email.com",
      },
    });

    fireEvent.input(screen.getByRole("textbox", { name: /Телефон/i }), {
      target: {
        value: "9999999999",
      },
    });

    fireEvent.input(screen.getByRole("textbox", { name: /Адрес/i }), {
      target: {
        value: "address",
      },
    });

    fireEvent.click(screen.getByRole("checkbox"));

    await fireEvent.click(screen.getByRole("button", { name: "next" }));

    expect(
      await screen.findByText("Заказ создан успешно!")
    ).toBeInTheDocument();
  });

  test("should render 1 cart items with total cost", async () => {
    store.dispatch(
      cartActions.addItemToCart({
        id: 0,
        title: "title_0",
        preview: " ",
        price: 1000,
        quantity: 5,
        color: "green",
      })
    );

    renderWithProviders(<RouterProvider router={router} />, { store });

    //preview.debug();
    expect(screen.getByText("Ваш заказ")).toBeInTheDocument();
    expect(screen.getByText("Итого:")).toBeInTheDocument();

    await fireEvent.click(screen.getByRole("radio", { name: /России/i }));
    expect(screen.getByText("5 350")).toBeInTheDocument();

    await fireEvent.click(screen.getByRole("radio", { name: /Москве/i }));
    expect(screen.getByText("5 300")).toBeInTheDocument();
  });
});
