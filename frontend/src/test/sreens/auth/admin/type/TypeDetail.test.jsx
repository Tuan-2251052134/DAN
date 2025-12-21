import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// 🔹 Mock Form
jest.mock("../../../../../components/form/Form", () => (props) => (
  <div data-testid="form-mock">
    endPointKey: {props.endPointKey}, id: {props.id}
  </div>
));

// 🔹 Mock useParams
jest.mock("react-router", () => ({
  useParams: jest.fn(),
}));

import { useParams } from "react-router";
import TypeDetail from "../../../../../screens/auth/admin/type/TypeDetail";

describe("TypeDetail Component", () => {
  it("renders Form with correct props", () => {
    // giả lập id từ useParams
    useParams.mockReturnValue({ id: "789" });

    render(<TypeDetail />);

    // kiểm tra Form render
    const form = screen.getByTestId("form-mock");
    expect(form).toBeInTheDocument();

    // kiểm tra props truyền vào Form
    expect(form).toHaveTextContent("endPointKey: type");
    expect(form).toHaveTextContent("id: 789");
  });
});
