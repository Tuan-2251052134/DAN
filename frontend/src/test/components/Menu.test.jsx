// src/test/Menu.test.jsx
import { render, screen } from "@testing-library/react";
import Menu from "../../components/menu/Menu";
import UserContext from "../../context";

// Mock react-router
jest.mock("react-router", () => ({
  useLocation: () => ({
    pathname: "/admin/user", // mock pathname đang active
  }),
  Link: ({ to, children, className }) => (
    <div data-testid="link" className={className}>
      {children}
    </div>
  ),
}));

describe("Menu Component", () => {
  const mockUser = {
    name: "Test User",
    avatar: "avatar.png",
  };

  const renderMenu = () =>
    render(
      <UserContext.Provider value={{ user: mockUser }}>
        <Menu>
          <div>Child content</div>
        </Menu>
      </UserContext.Provider>
    );

  it("renders all menu items", () => {
    renderMenu();
    const menuItems = [
      "Công việc",
      "Người dùng",
      "Danh sách ứng tuyển",
      "CV",
      "Quận",
      "Thành phố",
      "Thể loại",
    ];

    menuItems.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it("highlights active link based on pathname", () => {
    renderMenu();
    const activeLink = screen.getByText("Người dùng");
    expect(activeLink.className).toContain("active");
  });

  it("displays user info from context", () => {
    renderMenu();
    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    const avatar = screen.getByRole("img", { name: "not found" });
    expect(avatar).toHaveAttribute("src", mockUser.avatar);
  });

  it("renders children correctly", () => {
    renderMenu();
    expect(screen.getByText("Child content")).toBeInTheDocument();
  });
});
