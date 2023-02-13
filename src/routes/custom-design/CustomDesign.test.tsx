import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CustomDesign } from ".";
import { MemoryRouter } from "react-router-dom";

describe("Custom Design Page Test", () => {
  test("render page", async () => {
    render(<CustomDesign />, { wrapper: MemoryRouter });
    expect(screen.getByText(/Свой дизайн/i)).toBeInTheDocument();
  });
});
