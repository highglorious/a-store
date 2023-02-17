import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ProductForm } from ".";
import { MemoryRouter } from "react-router-dom";

describe("ProductForm Component Test", () => {
  test("render ProductForm component", async () => {
    const data = {
      colors: ["white", "black", "red"],
      sizes: ["XS", "S", "M", "L", "XL"],
      stickerNumbers: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      ],
      availability: true,
    };

    render(<ProductForm {...data} />);

    expect(screen.getByText(/размер/i)).toBeInTheDocument();
    expect(screen.getByText(/цвет/i)).toBeInTheDocument();
    expect(screen.getByText(/номер стикера/i)).toBeInTheDocument();
    expect(screen.queryByText(/модель/i)).not.toBeInTheDocument();
  });

  test("component with model prop only", async () => {
    const data = {
      models: ["Max", "Pro"],
    };

    render(<ProductForm {...data} />);

    expect(screen.getByText(/модель/i)).toBeInTheDocument();
    expect(screen.queryByText(/цвет/i)).not.toBeInTheDocument();
  });
});
