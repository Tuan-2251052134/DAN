// PublicJobDetail.test.jsx
import { render, screen } from "@testing-library/react";
import PublicJobDetail from "../../../screens/public/PublicJobDetail/PublicJobDetail";
import UserContext from "../../../context";

// --- Mock react-router ---
jest.mock("react-router", () => ({
  useParams: () => ({ id: "123" }),
}));

// --- Mock Form ---
jest.mock("../../../components/form/Form", () => {
  return ({ fields }) => (
    <div data-testid="mock-form">
      {fields.map((f, idx) => (
        <input
          key={idx}
          data-testid={`field-${f.label || "image"}`}
          type={f.type}
          value={""}
          disabled={f.disabled}
        />
      ))}
    </div>
  );
});

// --- Mock authApiUtil ---
jest.mock("../../../utils/apiUtil", () => ({
  authApiUtil: () => ({ post: jest.fn() }),
  end_point: { job: "/job", apply: "/apply" },
}));

describe("PublicJobDetail component", () => {
  it("renders all form fields correctly", () => {
    render(
      <UserContext.Provider value={{ user: { id: 1 } }}>
        <PublicJobDetail />
      </UserContext.Provider>
    );

    const form = screen.getByTestId("mock-form");
    expect(form).toBeInTheDocument();

    const labels = [
      "image",
      "Tên công việc",
      "Mô tả công việc",
      "Giá tiền",
      "Thể loại",
      "Hạn chót",
    ];
    labels.forEach((label) => {
      expect(screen.getByTestId(`field-${label}`)).toBeInTheDocument();
    });
  });
});
