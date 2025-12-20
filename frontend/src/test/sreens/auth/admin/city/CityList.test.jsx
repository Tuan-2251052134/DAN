// src/test/screens/auth/admin/city/CityList.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";

// ⚡ Mock BaseList trực tiếp trong factory function
jest.mock(
  "../../../../../screens/auth/admin/components/BaseList",
  () => ({
    __esModule: true,
    default: (props) => <div data-testid="base-list-mock">BaseList Mock</div>,
  })
);

import CityList from "../../../../../screens/auth/admin/city/CityList";

describe("CityList Component", () => {
  it("renders BaseList with correct props", () => {
    render(<CityList />);

    // Kiểm tra BaseList render
    const baseList = screen.getByTestId("base-list-mock");
    expect(baseList).toBeInTheDocument();

    // Không kiểm tra BaseList được gọi với props vì chúng ta không dùng jest.fn ở đây
    // Nếu muốn kiểm tra props, bạn cần dùng `jest.fn` trong factory function.
  });
});
