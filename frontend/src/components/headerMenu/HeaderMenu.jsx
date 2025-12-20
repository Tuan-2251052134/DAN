import { useContext, useMemo } from "react";
import { Link, useNavigate } from "react-router";
import UserContext from "../../context";
import "./styles.css";

const HeaderMenu = () => {
  const navigate = useNavigate();
  const navigateToRegister = () => {
    navigate("/register");
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  const { user, setUser } = useContext(UserContext);

  const logout = () => {
    localStorage.removeItem("user");
    setUser({ type: "LOGOUT" });
  };

  const routes = useMemo(
    () => [
      ...(user?.role === "BUSINESS"
        ? [
            {
              to: "/business/job",
              name: "Quản lý công việc",
            },
          ]
        : []),
    ],
    [user]
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home">
          Website
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {routes.map((item, index) => (
              <li className="nav-item" key={index}>
                <Link className="nav-link active" aria-current="page" to={item.to}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="d-flex gap-2">
            {user ? (
              <>
                <div className="d-flex justify-content-center align-items-center gap-3">
                  <Link
                    className="text-dark text-decoration-none"
                    to="/profile"
                  >
                    {user?.name}
                  </Link>
                  <img className="image" src={user?.avatar} />
                </div>
                <button
                  className="btn btn-outline-danger"
                  type="button"
                  onClick={logout}
                >
                  đăng xuất
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn btn-outline-primary"
                  type="button"
                  onClick={navigateToLogin}
                >
                  đăng nhập
                </button>
                <button
                  className="btn btn-outline-success"
                  type="button"
                  onClick={navigateToRegister}
                >
                  đăng ký
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HeaderMenu;
