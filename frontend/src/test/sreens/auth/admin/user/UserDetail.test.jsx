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
import UserDetail from "../../../../../screens/auth/admin/user/UserDetail";

describe("UserDetail Component", () => {
  it("renders Form with correct props", () => {
    // giả lập id từ useParams
    useParams.mockReturnValue({ id: "321" });

    render(<UserDetail />);

    // kiểm tra Form render
    const form = screen.getByTestId("form-mock");
    expect(form).toBeInTheDocument();

    // kiểm tra props truyền vào Form
    expect(form).toHaveTextContent("endPointKey: user");
    expect(form).toHaveTextContent("id: 321");
  });
});
