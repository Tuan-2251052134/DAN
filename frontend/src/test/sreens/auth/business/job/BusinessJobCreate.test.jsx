import React from "react";
import { render, screen } from "@testing-library/react";
import BusinessJobCreate from "../../../../../screens/auth/business/job/BusinessJobCreate/BusinessJobCreate";
import UserContext from "../../../../../context";

// 🔹 Mock react-router
jest.mock("react-router", () => ({
  useNavigate: () => jest.fn(),
}));

// 🔹 Mock authApiUtil
jest.mock("../../../../../utils/apiUtil", () => ({
  authApiUtil: () => ({ post: jest.fn() }),
  end_point: { job: "/job" },
}));

// 🔹 Mock handleError
jest.mock("../../../../../utils/errorAlertUtil", () => ({
  handleError: jest.fn(),
}));

// 🔹 Mock react-select
jest.mock("react-select", () => (props) => (
  <select
    aria-label={props["aria-label"] || props.label || "Thể loại"}
    value={props.value || ""}
    onChange={(e) => props.onChange({ value: e.target.value })}
    data-testid="react-select"
  >
    <option value="">Chọn</option>
    <option value="1">Loại 1</option>
    <option value="2">Loại 2</option>
  </select>
));

describe("BusinessJobCreate", () => {
  const user = { id: 1, name: "Test User" };

  const renderComponent = () =>
    render(
      <UserContext.Provider value={{ user }}>
        <BusinessJobCreate />
      </UserContext.Provider>
    );

  it("renders form fields", () => {
    renderComponent();
    expect(screen.getByLabelText("Tên công việc")).toBeInTheDocument();
    expect(screen.getByLabelText("Mô tả công việc")).toBeInTheDocument();
    expect(screen.getByLabelText("Giá tiền")).toBeInTheDocument();
    expect(screen.getByLabelText("Thể loại")).toBeInTheDocument();
    expect(screen.getByLabelText("Hạn chót")).toBeInTheDocument();
  });
});
