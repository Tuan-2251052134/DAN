// src/test/screens/admin/district/DistrictList.test.jsx
import { render, screen } from "@testing-library/react";

// ✅ MOCK BaseList (PHẢI TRƯỚC import DistrictList)
jest.mock(
  "../../../../../screens/auth/admin/components/BaseList",
  () => (props) => (
    <div data-testid="base-list-mock">
      BaseList Mock - endPointKey: {props.endPointKey}, url: {props.url}
    </div>
  )
);

import DistrictList from "../../../../../screens/auth/admin/district/DistrictList";

describe("DistrictList Component", () => {
  it("renders BaseList with correct props", () => {
    render(<DistrictList />);

    // kiểm tra BaseList mock render
    const baseList = screen.getByTestId("base-list-mock");
    expect(baseList).toBeInTheDocument();

    // kiểm tra props truyền xuống
    expect(baseList).toHaveTextContent("endPointKey: district");
    expect(baseList).toHaveTextContent("url: /admin/district");
  });
});
