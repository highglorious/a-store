import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Card } from ".";
import { MemoryRouter } from "react-router-dom";

describe("Card Component Test", () => {
  test("render card component with or without availability", async () => {
    // ARRANGE
    const data = {
      id: 0,
      preview:
        "https://static.tildacdn.com/stor6531-3139-4435-b365-653562306137/98058636.jpg",
      title: "Рюкзак",
      price: 1999,
      availability: true,
      path: "/",
    };

    render(<Card {...data} />, { wrapper: MemoryRouter });

    expect(screen.getByText(/1 999/i)).toBeInTheDocument();
    expect(screen.getByText(/Рюкзак/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Рюкзак/i)).toBeInTheDocument();

    render(<Card {...data} availability={false} />, { wrapper: MemoryRouter });
    expect(screen.getByText(/Нет в наличии/i)).toBeInTheDocument();
  });
});
