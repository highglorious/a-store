import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CardGroup } from ".";
import { MemoryRouter } from "react-router-dom";

describe("CardGroup Component Test", () => {
  test("render CardGroup component", async () => {
    const data = {
      title: "group title",
      description: "description",
      products: [
        {
          id: 0,
          preview:
            "https://static.tildacdn.com/stor6531-3139-4435-b365-653562306137/98058636.jpg",
          title: "item title",
          price: 1999,
          availability: true,
          subtitle: "subtitle",
          stickerNumbers: [1, 2, 3],
        },
      ],
    };

    render(<CardGroup {...data} />, { wrapper: MemoryRouter });

    expect(screen.getByText(/1 999/i)).toBeInTheDocument();
    expect(screen.getByText(/group title/i)).toBeInTheDocument();
    expect(screen.getByText(/description/i)).toBeInTheDocument();
    expect(screen.getByText(/item title/i)).toBeInTheDocument();
    expect(screen.getByText(/subtitle/i)).toBeInTheDocument();
  });

  test("rendered 3 card in group", () => {
    const data = {
      title: "group title",
      description: "description",
      products: [
        {
          id: 0,
          preview:
            "https://static.tildacdn.com/stor6531-3139-4435-b365-653562306137/98058636.jpg",
          title: "item title 1",
          price: 1999,
          availability: true,
          subtitle: "subtitle",
          stickerNumbers: [1, 2, 3],
        },
        {
          id: 2,
          preview:
            "https://static.tildacdn.com/stor6531-3139-4435-b365-653562306137/98058636.jpg",
          title: "item title 2",
          price: 1999,
          availability: true,
          subtitle: "subtitle",
          stickerNumbers: [1, 2, 3],
        },
        {
          id: 3,
          preview:
            "https://static.tildacdn.com/stor6531-3139-4435-b365-653562306137/98058636.jpg",
          title: "item title 3",
          price: 1999,
          availability: true,
          subtitle: "subtitle",
          stickerNumbers: [1, 2, 3],
        },
      ],
    };
    render(<CardGroup {...data} />, { wrapper: MemoryRouter });
    expect(screen.getAllByTestId("product-card")).toHaveLength(3);
  });
});
