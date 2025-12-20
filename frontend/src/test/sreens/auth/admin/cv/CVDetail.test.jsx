// src/test/screens/admin/cv/CVDetail.test.jsx
import { render, screen } from "@testing-library/react";
import CVDetail from "../../../../../screens/auth/admin/cv/CVDetail";

jest.mock("react-router", () => ({
  useParams: () => ({ id: "123" }),
}));

// Mock Form
jest.mock("../../../../../components/form/Form", () => ({
  __esModule: true,
  default: (props) => (
    <div data-testid="form-mock">
      Form Mock - id: {props.id}, endPointKey: {props.endPointKey}
    </div>
  ),
}));

describe("CVDetail Component", () => {
  it("renders Form with correct props", () => {
    render(<CVDetail />);

    const form = screen.getByTestId("form-mock");
    expect(form).toBeInTheDocument();
    expect(form).toHaveTextContent("id: 123");
    expect(form).toHaveTextContent("endPointKey: cv");
  });
});
