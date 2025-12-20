// src/test/screens/admin/cv/CVList.test.jsx
import { render, screen } from "@testing-library/react";
import CVList from "../../../../../screens/auth/admin/cv/CVList";

// Mock BaseList
jest.mock(
  "../../../../../screens/auth/admin/components/BaseList",
  () => (props) =>
    (
      <div data-testid="base-list-mock">
        BaseList Mock - endPointKey: {props.endPointKey}, url: {props.url}
      </div>
    )
);

// Mock authApiUtil (nếu muốn test customSubmit riêng, nhưng BaseList được mock thì không cần)
jest.mock("../../../../../utils/apiUtil", () => ({
  authApiUtil: jest.fn(() => ({
    post: jest.fn(() =>
      Promise.resolve({ data: { data: { id: 1, name: "Test CV" } } })
    ),
  })),
  end_point: {
    cv: "/api/cv",
  },
}));

describe("CVList Component", () => {
  it("renders BaseList with correct props", () => {
    render(<CVList />);

    // Kiểm tra BaseList render
    const baseList = screen.getByTestId("base-list-mock");
    expect(baseList).toBeInTheDocument();

    // Kiểm tra props
    expect(baseList).toHaveTextContent("endPointKey: cv");
    expect(baseList).toHaveTextContent("url: /admin/cv");
  });
});
