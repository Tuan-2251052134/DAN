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
import DistrictDetail from "../../../../../screens/auth/admin/district/DistrictDetail";

describe("DistrictDetail Component", () => {
  it("renders Form with correct props", () => {
    // set giả id từ useParams
    useParams.mockReturnValue({ id: "123" });

    render(<DistrictDetail />);

    // kiểm tra Form render
    const form = screen.getByTestId("form-mock");
    expect(form).toBeInTheDocument();

    // kiểm tra props
    expect(form).toHaveTextContent("endPointKey: district");
    expect(form).toHaveTextContent("id: 123");
  });
});
