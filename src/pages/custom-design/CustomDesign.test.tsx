import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { CustomDesign } from ".";
import { store } from "../../store";
import { renderWithProviders } from "../../utils/test-utils";
import { serverResponse } from "./testData";

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
