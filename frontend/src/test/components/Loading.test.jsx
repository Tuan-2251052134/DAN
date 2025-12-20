// src/test/Loading.test.jsx
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Loading from "../../components/Loading/Loading";

describe("Loading Component", () => {
  it("renders the loading spinner", () => {
    render(<Loading />);

    // Kiểm tra div spinner
    const spinner = screen.getByRole("status");
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass("spinner-border");

    // Kiểm tra text "Loading..."
    const text = screen.getByText("Loading...");
    expect(text).toBeInTheDocument();
    expect(text).toHaveClass("visually-hidden");
  });
});
