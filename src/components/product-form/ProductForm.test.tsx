import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { ProductForm } from ".";
import { productActions } from "../../pages/product";
import { store } from "../../store";
import { renderWithProviders } from "../../utils/test-utils";

describe("ProductForm Component Test", () => {
  test("should render form with size, color and sticker selects", async () => {
    const data = {
      colors: ["white", "black", "red"],
      sizes: ["XS", "S", "M", "L", "XL"],
      stickerNumbers: [1, 2, 3, 4, 5],
      availability: true,
    };

    renderWithProviders(<ProductForm {...data} />, { store });

    expect(screen.getByText(/размер/i)).toBeInTheDocument();
    expect(screen.getByText(/цвет/i)).toBeInTheDocument();
    expect(screen.getByText(/номер стикера/i)).toBeInTheDocument();
    expect(screen.queryByText(/модель/i)).not.toBeInTheDocument();
  });

  test("should render form with model select only", async () => {
    const data = {
      models: ["Max", "Pro"],
    };

    renderWithProviders(<ProductForm {...data} />, { store });

    expect(screen.getByText(/модель/i)).toBeInTheDocument();
    expect(screen.queryByText(/цвет/i)).not.toBeInTheDocument();
  });

  test("should change selected state", async () => {
    const data = {
      colors: ["white", "black", "red"],
      sizes: ["XS", "S", "M", "L", "XL"],
      stickerNumbers: [1, 2, 3, 4, 5],
      availability: true,
    };

    store.dispatch(productActions.setSize("M"));
    store.dispatch(productActions.setColor("red"));
    store.dispatch(productActions.setStickerNumber(5));

    renderWithProviders(<ProductForm {...data} />, { store });

    expect(screen.getByText("Красный")).toBeInTheDocument();
    expect(screen.getByText("M")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });
});
