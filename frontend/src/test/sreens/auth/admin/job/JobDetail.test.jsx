import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

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
import JobDetail from "../../../../../screens/auth/admin/job/JobDetail";

describe("JobDetail Component", () => {
  it("renders Form with correct props", () => {
    // giả lập id từ useParams
    useParams.mockReturnValue({ id: "456" });

    render(<JobDetail />);

    // kiểm tra Form render
    const form = screen.getByTestId("form-mock");
    expect(form).toBeInTheDocument();

    // kiểm tra props truyền vào Form
    expect(form).toHaveTextContent("endPointKey: job");
    expect(form).toHaveTextContent("id: 456");
  });
});
