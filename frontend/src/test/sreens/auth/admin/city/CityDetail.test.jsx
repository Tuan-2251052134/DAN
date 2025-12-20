import { render, screen } from "@testing-library/react";
import CityDetail from "../../../../../screens/auth/admin/city/CityDetail";

// Mock react-router
const mockedNavigate = jest.fn();
jest.mock("react-router", () => ({
  useParams: () => ({ id: "123" }),
  useNavigate: () => mockedNavigate,
}));

// Mock Form để tránh gọi API hoặc logic không cần thiết
jest.mock("../../../../../components/form/Form", () => (props) => (
  <div>Form Mock - ID: {props.id}</div>
));

test("renders form with correct fields", () => {
  render(<CityDetail />);
  expect(screen.getByText(/Form Mock - ID: 123/i)).toBeInTheDocument();
});
