import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// 🔹 Mock BaseList
jest.mock("../../../../../screens/auth/admin/components/BaseList", () => (props) => (
  <div data-testid="base-list-mock">
    BaseList Mock - endPointKey: {props.endPointKey}, url: {props.url}
  </div>
));

import TypeList from "../../../../../screens/auth/admin/type/TypeList";

describe("TypeList Component", () => {
  it("renders BaseList with correct props", () => {
    render(<TypeList />);

    // kiểm tra BaseList mock render
    const baseList = screen.getByTestId("base-list-mock");
    expect(baseList).toBeInTheDocument();

    // kiểm tra props cơ bản
    expect(baseList).toHaveTextContent("endPointKey: type");
    expect(baseList).toHaveTextContent("url: /admin/type");
  });
});
