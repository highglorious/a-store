import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ContactUs } from ".";

describe("Contacts Page Test", () => {
  test("should render page with tilte, text, map", async () => {
    render(<ContactUs />);

    expect(await screen.findByText(/Контакты/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Принимаем к оплате карты Visa, Mastercard, МИР./i)
    ).toBeInTheDocument();
  });
});
