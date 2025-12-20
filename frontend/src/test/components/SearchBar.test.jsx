// SearchBar.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../../components/searchBar/SearchBar";

// Mock AppSelect để tránh gọi API
jest.mock("../../components/appSelect/AppSelect", () => ({ value, setValue }) => {
  return (
    <select
      data-testid="app-select"
      value={value || ""}
      onChange={(e) => setValue(e.target.value)}
    >
      <option value="">--Select--</option>
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
    </select>
  );
});

describe("SearchBar component", () => {
  const fields = [
    { type: "text", key: "name", label: "Name" },
    { type: "app-select", key: "type", endPointKey: "jobType" },
  ];

  it("renders text input and AppSelect", () => {
    render(<SearchBar fields={fields} setParentParams={jest.fn()} />);
    expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
    expect(screen.getByTestId("app-select")).toBeInTheDocument();
    expect(screen.getByText("Tìm kiếm")).toBeInTheDocument();
  });

  it("updates params when typing in text input", () => {
    const mockSetParentParams = jest.fn();
    render(<SearchBar fields={fields} setParentParams={mockSetParentParams} />);

    const input = screen.getByPlaceholderText("Name");
    fireEvent.change(input, { target: { value: "Test Job" } });

    const button = screen.getByText("Tìm kiếm");
    fireEvent.click(button);

    expect(mockSetParentParams).toHaveBeenCalledWith({
      name: "Test Job",
      offset: 0,
    });
  });

  it("updates params when selecting AppSelect value", () => {
    const mockSetParentParams = jest.fn();
    render(<SearchBar fields={fields} setParentParams={mockSetParentParams} />);

    const select = screen.getByTestId("app-select");
    fireEvent.change(select, { target: { value: "2" } });

    const button = screen.getByText("Tìm kiếm");
    fireEvent.click(button);

    expect(mockSetParentParams).toHaveBeenCalledWith({
      typeId: "2",
      offset: 0,
    });
  });
});
