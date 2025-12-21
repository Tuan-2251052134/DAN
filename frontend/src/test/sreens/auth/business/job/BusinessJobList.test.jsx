import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import BusinessJobList from "../../../../../screens/auth/business/job/BusinessjobList/BusinessJobList";
import UserContext from "../../../../../context";

// 🔹 Mock API
jest.mock("../../../../../utils/apiUtil", () => ({
  authApiUtil: () => ({
    get: jest.fn().mockResolvedValue({
      data: {
        data: [
          {
            id: 1,
            name: "Job 1",
            "type.name": "Type 1",
            createdDate: "2025-01-01",
            expiredDate: "2025-01-31",
            status: "active",
          },
          {
            id: 2,
            name: "Job 2",
            "type.name": "Type 2",
            createdDate: "2025-02-01",
            expiredDate: "2025-02-28",
            status: "inactive",
          },
        ],
      },
    }),
  }),
  end_point: { job: "/job" },
}));

// 🔹 Mock handleError
jest.mock("../../../../../utils/errorAlertUtil", () => ({
  handleError: jest.fn(),
}));

// 🔹 Mock JobCard
jest.mock(
  "../../../../../components/jobCard/JobCard",
  () =>
    ({ name, typeName }) =>
      (
        <div data-testid="job-card">
          {name} - {typeName}
        </div>
      )
);

// 🔹 Mock SearchBar
jest.mock(
  "../../../../../components/searchBar/SearchBar",
  () =>
    ({ setParentParams }) =>
      (
        <input
          placeholder="searchbar"
          onChange={(e) => setParentParams({ name: e.target.value })}
        />
      )
);

// 🔹 Mock Form (nếu cần)
jest.mock("../../../../../components/form/Form", () => () => (
  <div>FormMock</div>
));

// 🔹 Mock react-router useNavigate
jest.mock("react-router", () => ({
  useNavigate: () => jest.fn(),
}));

describe("BusinessJobList", () => {
  const mockUser = { id: 10, name: "Test User" };

  it("renders jobs when API returns data", async () => {
    render(
      <UserContext.Provider value={{ user: mockUser }}>
        <BusinessJobList />
      </UserContext.Provider>
    );

    await waitFor(() => {
      const cards = screen.getAllByTestId("job-card");
      expect(cards).toHaveLength(2);
      expect(cards[0]).toHaveTextContent("Job 1 - Type 1");
      expect(cards[1]).toHaveTextContent("Job 2 - Type 2");
    });
  });
});
