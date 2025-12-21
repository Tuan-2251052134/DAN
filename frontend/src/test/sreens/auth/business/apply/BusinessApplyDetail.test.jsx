/**
 * @jest-environment jsdom
 */

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import BusinessApplyDetail from "../../../../../screens/auth/business/apply/BusinessApplyDetail/BusinessApplyDetail";

// Polyfill TextEncoder/TextDecoder
import { TextDecoder, TextEncoder } from "util";
global.TextEncoder = global.TextEncoder || TextEncoder;
global.TextDecoder = global.TextDecoder || TextDecoder;

// Mock react-router
const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
  useNavigate: () => mockNavigate,
  useParams: () => ({ applyId: "123" }),
}));

// Mock utils/apiUtil **không tham chiếu biến ngoài**
jest.mock("../../../../../utils/apiUtil", () => {
  const putFn = jest.fn(() => Promise.resolve({ data: {} }));
  return {
    authApiUtil: () => ({
      put: putFn, // tạo trực tiếp trong scope factory
    }),
    end_point: {
      "apply-detail": (id) => `/api/apply/${id}`,
    },
    __putFn: putFn, // nếu muốn test xem put đã được gọi
  };
});

// Lấy putFn từ module mock để assert
import { __putFn } from "../../../../../utils/apiUtil";

describe("BusinessApplyDetail Component", () => {
  beforeEach(() => {
    __putFn.mockClear();
    mockNavigate.mockClear();
  });

  it("customSubmit calls authApiUtil.put with PASS status", async () => {
    render(<BusinessApplyDetail endPointKey="apply" id="123" />);
    fireEvent.click(screen.getByText("Xác nhận")); // đúng text nút

    await waitFor(() => {
      expect(__putFn).toHaveBeenCalledWith(
        "/api/apply/123",
        expect.objectContaining({ status: "PASS" })
      );
    });
  });

  it("denyApply calls authApiUtil.put with FAIL status", async () => {
    render(<BusinessApplyDetail endPointKey="apply" id="123" />);
    fireEvent.click(screen.getByText("Từ chối")); // đúng text nút

    await waitFor(() => {
      expect(__putFn).toHaveBeenCalledWith(
        "/api/apply/123",
        expect.objectContaining({ status: "FAIL" })
      );
    });
  });
});
