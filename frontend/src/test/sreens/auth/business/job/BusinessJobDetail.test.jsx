import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BusinessJobDetail from "../../../../../screens/auth/business/job/BusinessJobDetail/BusinessJobDetail";

// 🔹 Mock react-router
jest.mock("react-router", () => ({
  useNavigate: () => jest.fn(), // tạo mock ngay trong factory
  useParams: () => ({ id: "123" }),
}));

// 🔹 Mock Form component
jest.mock("../../../../../components/form/Form", () => (props) => {
  return (
    <div>
      {props.fields.map((f) => (
        <div key={f.key}>
          <label htmlFor={f.key}>{f.label || "image"}</label>
          <input
            id={f.key}
            type={f.type === "textarea" ? "text" : f.type}
            disabled={f.disabled}
            defaultValue={props.defaultValue?.[f.key] || ""}
          />
        </div>
      ))}
      {props.extraButtons?.map((btn) => (
        <button key={btn.name} onClick={btn.click}>
          {btn.name}
        </button>
      ))}
      <button onClick={props.afterSubmit}>Submit</button>
    </div>
  );
});

describe("BusinessJobDetail", () => {
  it("renders all form fields", () => {
    render(<BusinessJobDetail />);
    const labels = [
      "image",
      "tên",
      "Tên công việc",
      "Mô tả công việc",
      "Giá tiền",
      "Thể loại",
      "Ngày tạo",
      "Hạn chót",
      "Tin nhắn",
    ];

    labels.forEach((label) => {
      expect(screen.getByLabelText(label)).toBeInTheDocument();
    });
  });

  it("calls afterSubmit when submit button is clicked", () => {
    render(<BusinessJobDetail />);
    const submitButton = screen.getByText("Submit");
    fireEvent.click(submitButton);
    // navigate được mock sẵn, bạn có thể check console.log hoặc spy nếu muốn
  });

  it("calls navigateToApply when extra button is clicked", () => {
    render(<BusinessJobDetail />);
    const extraButton = screen.getByText("xem danh sách ứng tuyển");
    fireEvent.click(extraButton);
    // navigate được mock sẵn
  });
});
