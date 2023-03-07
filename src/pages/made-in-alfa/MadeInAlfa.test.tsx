import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { MadeInAlfa } from ".";
import { store } from "../../store";
import { renderWithProviders } from "../../utils/test-utils";
import { serverResponse } from "./testData";

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
