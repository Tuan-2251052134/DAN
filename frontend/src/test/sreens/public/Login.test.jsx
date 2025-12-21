// Login.test.jsx
import { render, screen } from "@testing-library/react";
import Login from "../../../screens/public/Login";
import UserContext from "../../../context";

// Mock react-router
jest.mock("react-router", () => ({
  useNavigate: () => jest.fn(),
}));

// Mock Form
jest.mock("../../../components/form/Form", () => {
  return ({ fields, customSubmit }) => (
    <div data-testid="mock-form">
      {fields.map((f) => (
        <input
          key={f.label}
          data-testid={`field-${f.label}`}
          type={f.type}
          value=""
          onChange={() => {}}
        />
      ))}
      <button onClick={customSubmit}>Submit</button>
    </div>
  );
});

// Mock apiUtil để tránh import axios
jest.mock("../../../utils/apiUtil", () => ({
  apiUtil: { post: jest.fn() },
  end_point: { "user-login": "/user-login" },
}));

describe("Login component", () => {
  it("renders the form with all fields", () => {
    render(
      <UserContext.Provider value={{ setUser: jest.fn() }}>
        <Login />
      </UserContext.Provider>
    );

    const form = screen.getByTestId("mock-form");
    expect(form).toBeInTheDocument();

    const labels = ["Email", "Mật khẩu"];
    labels.forEach((label) => {
      expect(screen.getByTestId(`field-${label}`)).toBeInTheDocument();
    });

    expect(screen.getByText("Submit")).toBeInTheDocument();
  });
});
