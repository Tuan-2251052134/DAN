// BusinessApplyList.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";

// 1️⃣ Mock react-router hoàn toàn
const mockedNavigate = jest.fn();
jest.mock("react-router", () => ({
  useNavigate: () => mockedNavigate,
  useParams: () => ({ id: "123" }),
}));

// 2️⃣ Mock authApiUtil
jest.mock("../../../../../utils/apiUtil", () => ({
  authApiUtil: jest.fn(() => ({
    get: jest.fn(),
  })),
  end_point: { apply: "api/apply" },
}));

// 3️⃣ Mock handleError trực tiếp trong factory
jest.mock("../../../../../utils/errorAlertUtil", () => ({
  handleError: jest.fn(),
}));

import BusinessApplyList from "../../../../../screens/auth/business/apply/BusinessApplyList/BusinessApplyList";
import { authApiUtil } from "../../../../../utils/apiUtil";
import { handleError } from "../../../../../utils/errorAlertUtil";

describe("BusinessApplyList", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders applies with correct status", async () => {
    // mock API trả về data
    authApiUtil.mockReturnValueOnce({
      get: jest.fn().mockResolvedValue({
        data: {
          data: [
            {
              id: "1",
              "cv.url": "https://example.com/cv1.pdf",
              "cv.name": "CV 1",
              createdDate: "2025-12-21",
              status: "WAIT",
            },
            {
              id: "2",
              "cv.url": "https://example.com/cv2.pdf",
              "cv.name": "CV 2",
              createdDate: "2025-12-20",
              status: "PASS",
            },
            {
              id: "3",
              "cv.url": "https://example.com/cv3.pdf",
              "cv.name": "CV 3",
              createdDate: "2025-12-19",
              status: "FAIL",
            },
          ],
        },
      }),
    });

    render(<BusinessApplyList />);

    const cv1 = await screen.findByText("CV 1");
    const cv2 = await screen.findByText("CV 2");
    const cv3 = await screen.findByText("CV 3");

    expect(cv1).toBeInTheDocument();
    expect(cv2).toBeInTheDocument();
    expect(cv3).toBeInTheDocument();

    expect(screen.getByText("Trạng thái: WAIT")).toBeInTheDocument();
    expect(screen.getByText("Trạng thái: PASS")).toBeInTheDocument();
    expect(screen.getByText("Trạng thái: FAIL")).toBeInTheDocument();
  });

  it("navigates to detail page when button clicked", async () => {
    authApiUtil.mockReturnValueOnce({
      get: jest.fn().mockResolvedValue({
        data: {
          data: [
            {
              id: "1",
              "cv.url": "url1",
              "cv.name": "CV 1",
              createdDate: "2025-12-21",
              status: "WAIT",
            },
          ],
        },
      }),
    });

    render(<BusinessApplyList />);

    await screen.findByText("CV 1");

    fireEvent.click(screen.getByText("Xem chi tiết"));

    expect(mockedNavigate).toHaveBeenCalledWith("/business/job/123/apply/1");
  });

  it("calls handleError if API fails", async () => {
    authApiUtil.mockReturnValueOnce({
      get: jest.fn().mockRejectedValue(new Error("API Error")),
    });

    render(<BusinessApplyList />);

    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(handleError).toHaveBeenCalled();
  });
});
