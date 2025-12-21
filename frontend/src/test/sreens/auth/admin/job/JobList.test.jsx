import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

// 🔹 Mock BaseList
jest.mock(
  "../../../../../screens/auth/admin/components/BaseList",
  () => (props) =>
    (
      <div data-testid="base-list-mock">
        BaseList Mock - endPointKey: {props.endPointKey}, url: {props.url}
      </div>
    )
);

import JobList from "../../../../../screens/auth/admin/job/JobList";

describe("JobList Component", () => {
  it("renders BaseList with correct props", () => {
    render(<JobList />);

    // kiểm tra BaseList mock render
    const baseList = screen.getByTestId("base-list-mock");
    expect(baseList).toBeInTheDocument();

    // kiểm tra props cơ bản
    expect(baseList).toHaveTextContent("endPointKey: job");
    expect(baseList).toHaveTextContent("url: /admin/job");
  });
});
