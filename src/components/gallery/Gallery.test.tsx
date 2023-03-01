import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Gallery } from ".";

describe("Gallery Component Test", () => {
  test("render 3 list image with 1 preview", () => {
    const data = {
      images: [
        "https://static.tildacdn.com/stor6531-3139-4435-b365-653562306137/98058636.jpg",
        "https://static.tildacdn.com/stor6531-3139-4435-b365-653562306137/98058636.jpg",
        "https://static.tildacdn.com/stor6531-3139-4435-b365-653562306137/98058636.jpg",
      ],
    };

    render(<Gallery {...data} />, { wrapper: MemoryRouter });
    expect(screen.getAllByTestId("preview-img")).toHaveLength(1);
    expect(screen.getAllByTestId("list-img")).toHaveLength(3);
  });
});
