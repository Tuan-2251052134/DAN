// src/test/HeaderMenu.test.jsx
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import HeaderMenu from "../../components/headerMenu/HeaderMenu";
import UserContext from "../../context";

// Mock react-router
jest.mock("react-router", () => ({
  useNavigate: () => jest.fn(),
  Link: ({ children, to, ...props }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));

describe("HeaderMenu Component", () => {
  it("shows login/register buttons when user is not logged in", () => {
    const contextValue = { user: null, setUser: jest.fn() };

    render(
      <UserContext.Provider value={contextValue}>
        <HeaderMenu />
      </UserContext.Provider>
    );

    expect(screen.getByText(/đăng nhập/i)).toBeInTheDocument();
    expect(screen.getByText(/đăng ký/i)).toBeInTheDocument();
  });

  it("shows user info and logout button when user is logged in", () => {
    const setUserMock = jest.fn();
    const user = {
      name: "John Doe",
      avatar: "/avatar.png",
      role: "BUSINESS",
    };

    render(
      <UserContext.Provider value={{ user, setUser: setUserMock }}>
        <HeaderMenu />
      </UserContext.Provider>
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /đăng xuất/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", "/avatar.png");
  });

  it("calls setUser with LOGOUT when logout button is clicked", () => {
    const setUserMock = jest.fn();
    const user = {
      name: "John Doe",
      avatar: "/avatar.png",
      role: "BUSINESS",
    };

    render(
      <UserContext.Provider value={{ user, setUser: setUserMock }}>
        <HeaderMenu />
      </UserContext.Provider>
    );

    const logoutBtn = screen.getByRole("button", { name: /đăng xuất/i });
    fireEvent.click(logoutBtn);

    expect(setUserMock).toHaveBeenCalledWith({ type: "LOGOUT" });
  });

  it("renders BUSINESS routes when user role is BUSINESS", () => {
    const user = {
      name: "John Doe",
      avatar: "/avatar.png",
      role: "BUSINESS",
    };

    render(
      <UserContext.Provider value={{ user, setUser: jest.fn() }}>
        <HeaderMenu />
      </UserContext.Provider>
    );

    expect(screen.getByText(/Quản lý công việc/i)).toBeInTheDocument();
  });
});
