// Register.test.jsx
import { render, screen } from "@testing-library/react";
import Register from "../../../screens/public/Register";

// --- Mock react-router ---
jest.mock("react-router", () => ({
  useNavigate: () => jest.fn(),
}));

// --- Mock Form component ---
jest.mock("../../../components/form/Form", () => {
  return ({ fields, submit }) => (
    <div data-testid="mock-form">
      {fields.map((f) => (
        <input
          key={f.label}
          data-testid={`field-${f.label}`}
          type={f.type}
          value={f.value || ""}
          onChange={() => {}}
        />
      ))}
      <button onClick={submit}>Submit</button>
    </div>
  );
});

// --- Mock apiUtil để tránh import axios/ESM ---
jest.mock("../../../utils/apiUtil", () => ({
  apiUtil: { post: jest.fn() },
  end_point: {
    user: "/user",
    city: "/city",
    district: "/district",
  },
}));

// --- Mock handleError ---
jest.mock("../../../utils/errorAlertUtil", () => ({
  handleError: jest.fn(),
}));

describe("Register component", () => {
  it("renders the form with all fields", () => {
    render(<Register />);

    // Kiểm tra form mock
    const form = screen.getByTestId("mock-form");
    expect(form).toBeInTheDocument();

    // Kiểm tra tất cả các input field
    const labels = [
      "Avatar",
      "Tên",
      "Email",
      "Mật khẩu",
      "Địa chỉ",
      "vai trò",
      "Thành phố",
      "Quận",
    ];

    labels.forEach((label) => {
      expect(screen.getByTestId(`field-${label}`)).toBeInTheDocument();
    });

    // Kiểm tra button submit
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });
});
