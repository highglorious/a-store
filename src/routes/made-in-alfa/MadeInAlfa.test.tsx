import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MadeInAlfa } from ".";
import { MemoryRouter } from "react-router-dom";

describe("Made In Alfa Page Test", () => {
  test("render page", async () => {
    render(<MadeInAlfa />, { wrapper: MemoryRouter });
    expect(
      screen.getByText(/Хотим каждую из этих вещей!/i)
    ).toBeInTheDocument();
  });

  test("rendered 5 cards", () => {
    render(<MadeInAlfa />, { wrapper: MemoryRouter });
    expect(screen.getAllByTestId("product-card")).toHaveLength(5);
  });
});
