// src/test/sreens/public/Home.test.jsx
import { render, screen } from "@testing-library/react";
import Home from "../../../screens/public/Home/Home";
// Mock react-router
jest.mock("react-router", () => ({
  useNavigate: () => jest.fn(),
}));

// Mock apiUtil
jest.mock("../../../utils/apiUtil", () => ({
  apiUtil: {
    get: () =>
      Promise.resolve({
        data: {
          data: [
            {
              id: 1,
              name: "Job 1",
              "type.name": "Type 1",
              createdDate: "2025-01-01",
              expiredDate: "2025-12-31",
            },
            {
              id: 2,
              name: "Job 2",
              "type.name": "Type 2",
              createdDate: "2025-02-01",
              expiredDate: "2025-11-30",
            },
          ],
        },
      }),
  },
  end_point: { job: "/job" },
}));

// Mock handleError
jest.mock("../../../utils/errorAlertUtil", () => ({
  handleError: jest.fn(),
}));

// Mock SearchBar component
jest.mock("../../../components/searchBar/SearchBar", () => {
  return ({ setParentParams }) => {
    return <div data-testid="search-bar"></div>;
  };
});

// Mock JobCard component
jest.mock("../../../components/jobCard/JobCard", () => {
  return ({ name, typeName }) => (
    <div data-testid="job-card">
      {name} - {typeName}
    </div>
  );
});

describe("Home component", () => {
  it("renders search bar", () => {
    render(<Home />);
    expect(screen.getByTestId("search-bar")).toBeInTheDocument();
  });

  it("renders job cards after fetching data", async () => {
    render(<Home />);

    // findAllByTestId tự đợi promise resolve
    const cards = await screen.findAllByTestId("job-card");
    expect(cards).toHaveLength(2);
    expect(cards[0]).toHaveTextContent("Job 1 - Type 1");
    expect(cards[1]).toHaveTextContent("Job 2 - Type 2");
  });
});
