import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { CardGroup } from ".";
import { dataOneItem, dataThreeItems } from "./testData";

describe("CardGroup Component Test", () => {
  test("should render group with one card", async () => {
    render(<CardGroup {...dataOneItem} />, { wrapper: MemoryRouter });
    expect(screen.getByText(/1 999/i)).toBeInTheDocument();
    expect(screen.getByText(/group title/i)).toBeInTheDocument();
    expect(screen.getByText(/group description/i)).toBeInTheDocument();
    expect(screen.getByText(/item title/i)).toBeInTheDocument();
    expect(screen.getByText(/subtitle/i)).toBeInTheDocument();
  });
  test("should render group with 3 cards", () => {
    render(<CardGroup {...dataThreeItems} />, { wrapper: MemoryRouter });
    expect(screen.getAllByTestId("product-card")).toHaveLength(3);
  });
});
