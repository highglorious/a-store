import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { CardGroup } from ".";

describe("CardGroup Component Test", () => {
  test("render CardGroup component", async () => {
    const data = {
      id: 0,
      title: "group title",
      description: "group description",
      products: [
        {
          id: 5,
          preview: "http://qa-games.ru/astore/public/images/43306375.jpeg",
          title: "item title",
          description: "description",
          price: 1999,
          availability: true,
          subtitle: "subtitle",
        },
      ],
    };
    render(<CardGroup {...data} />, { wrapper: MemoryRouter });
    expect(screen.getByText(/1 999/i)).toBeInTheDocument();
    expect(screen.getByText(/group title/i)).toBeInTheDocument();
    expect(screen.getByText(/group description/i)).toBeInTheDocument();
    expect(screen.getByText(/item title/i)).toBeInTheDocument();
    expect(screen.getByText(/subtitle/i)).toBeInTheDocument();
  });
  test("rendered 3 card in group", () => {
    const data = {
      id: 0,
      title: "group title",
      description: "group description",
      products: [
        {
          id: 0,
          preview:
            "https://static.tildacdn.com/stor6531-3139-4435-b365-653562306137/98058636.jpg",
          title: "item title 1",
          price: 1999,
          availability: true,
          subtitle: "subtitle",
          description: "description",
        },
        {
          id: 2,
          preview:
            "https://static.tildacdn.com/stor6531-3139-4435-b365-653562306137/98058636.jpg",
          title: "item title 2",
          price: 1999,
          availability: true,
          subtitle: "subtitle",
          description: "description",
        },
        {
          id: 3,
          preview:
            "https://static.tildacdn.com/stor6531-3139-4435-b365-653562306137/98058636.jpg",
          title: "item title 3",
          price: 1999,
          availability: true,
          subtitle: "subtitle",
          description: "description",
        },
      ],
    };
    render(<CardGroup {...data} />, { wrapper: MemoryRouter });
    expect(screen.getAllByTestId("product-card")).toHaveLength(3);
  });
});
