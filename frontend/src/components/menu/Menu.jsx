import { Link, useLocation } from "react-router";
import "./styles.css";
import { useContext } from "react";
import UserContext from "../../context";

const Menu = ({ children }) => {
  const { pathname } = useLocation();
  const { user } = useContext(UserContext);

  const menuItems = [
    { name: "Công việc", link: "/admin/job" },
    { name: "Người dùng", link: "/admin/user" },
    { name: "Danh sách ứng tuyển", link: "/admin/apply" },
    { name: "CV", link: "/admin/cv" },
    { name: "Quận", link: "/admin/district" },
    { name: "Thành phố", link: "/admin/city" },
    { name: "Thể loại", link: "/admin/type" },
  ];

  return (
    <div className="container-fluid">
      <div className="d-flex h-100vh row">
        <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark col-2">
          <a
            href="/"
            className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
          >
            <span className="fs-4">Admin</span>
          </a>
          <hr />
          <ul className="nav nav-pills flex-column mb-auto">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.link}
                  className={`nav-link ${pathname === item.link && "active"}`}
                  aria-current="page"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <hr />
          <div className="dropdown">
            <a
              href="#"
              className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
              id="dropdownUser1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src={user?.avatar}
                alt="not found"
                width="32"
                height="32"
                className="rounded-circle me-2"
              />
              <strong>{user?.name}</strong>
            </a>
            <ul
              className="dropdown-menu dropdown-menu-dark text-small shadow"
              aria-labelledby="dropdownUser1"
            >
              <li>
                <a className="dropdown-item" href="#">
                  New project...
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Settings
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Profile
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-10 p-0 d-flex flex-column align-items-center pt-5 gap-5 pb-5">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Menu;
