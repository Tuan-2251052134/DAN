import "bootstrap/dist/css/bootstrap.min.css";
import { useContext, useEffect, useReducer } from "react";
import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import HeaderMenu from "./components/headerMenu/HeaderMenu";
import Menu from "./components/menu/Menu";
import UserContext from "./context";
import userReducer from "./reducers/userReducer";
import CityDetail from "./screens/auth/admin/city/CityDetail";
import CityList from "./screens/auth/admin/city/CityList";
import CVDetail from "./screens/auth/admin/cv/CVDetail";
import CVList from "./screens/auth/admin/cv/CVList";
import DistrictDetail from "./screens/auth/admin/district/DistrictDetail";
import DistrictList from "./screens/auth/admin/district/DistrictList";
import JobDetail from "./screens/auth/admin/job/JobDetail";
import JobList from "./screens/auth/admin/job/JobList";
import TypeDetail from "./screens/auth/admin/type/TypeDetail";
import TypeList from "./screens/auth/admin/type/TypeList";
import UserDetail from "./screens/auth/admin/user/UserDetail";
import UserList from "./screens/auth/admin/user/UserList";
import BusinessApplyDetail from "./screens/auth/business/apply/BusinessApplyDetail/BusinessApplyDetail";
import BusinessApplyList from "./screens/auth/business/apply/BusinessApplyList/BusinessApplyList";
import BusinessJobCreate from "./screens/auth/business/job/BusinessJobCreate/BusinessJobCreate";
import BusinessJobDetail from "./screens/auth/business/job/BusinessJobDetail/BusinessJobDetail";
import BusinessJobList from "./screens/auth/business/job/BusinessjobList/BusinessJobList";
import Profile from "./screens/auth/Profile";
import Home from "./screens/public/Home/Home";
import Login from "./screens/public/Login";
import PublicJobDetail from "./screens/public/PublicJobDetail/PublicJobDetail";
import Register from "./screens/public/Register";

const MenuProvider = ({ menuType }) => {
  if (menuType === "ADMIN") {
    return (
      <Menu>
        <Outlet />
      </Menu>
    );
  }
  return (
    <>
      <HeaderMenu />
      <Outlet />
    </>
  );
};

const CheckAuthProvider = ({ role }) => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      if (!role.includes(user.role)) {
        alert("không được phép vào trang này");
        navigate("/home");
      }
    }
  }, [setUser]);
  return <Outlet />;
};

const GetAuthProvider = () => {
  const { setUser } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser({ type: "LOGIN", payload: user });
    }
  }, []);
  return <Outlet />;
};

function App() {
  const [user, setUser] = useReducer(userReducer, null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<GetAuthProvider />}>
            <Route path={""} element={<CheckAuthProvider role={["ADMIN"]} />}>
              <Route
                path={"admin"}
                element={<MenuProvider menuType={"ADMIN"} />}
              >
                <Route path={"job"} element={<JobList />} />
                <Route path={"job/:id"} element={<JobDetail />} />

                <Route path={"user"} element={<UserList />} />

                <Route path={"apply"} element={<div>apply</div>} />

                <Route path={"cv"} element={<CVList />} />
                <Route path={"cv/:id"} element={<CVDetail />} />

                <Route path={"district"} element={<DistrictList />} />
                <Route path={"district/:id"} element={<DistrictDetail />} />

                <Route path={"city"} element={<CityList />} />
                <Route path={"city/:id"} element={<CityDetail />} />

                <Route path={"type"} element={<TypeList />} />
                <Route path={"type/:id"} element={<TypeDetail />} />

                <Route path={"user"} element={<UserList />} />
                <Route path={"user/:id"} element={<UserDetail />} />
              </Route>
            </Route>

            <Route path={""} element={<MenuProvider />}>
              <Route path={"business"} element={<Outlet />}>
                <Route path={"job"} element={<Outlet />}>
                  <Route path={""} element={<BusinessJobList />} />
                  <Route path={":id"} element={<Outlet />}>
                    <Route path={""} element={<BusinessJobDetail />} />
                    <Route path={"apply"} element={<Outlet />}>
                      <Route path={""} element={<BusinessApplyList />} />
                      <Route path={":applyId"} element={<BusinessApplyDetail />} />
                    </Route>
                  </Route>
                  <Route path={"create"} element={<BusinessJobCreate />} />
                </Route>
              </Route>

              <Route path={"profile"} element={<Profile />} />
              <Route path={"job/:id"} element={<PublicJobDetail />} />
              <Route path={"home"} element={<Home />} />
              <Route path={"register"} element={<Register />} />
              <Route path={"login"} element={<Login />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
