import { useContext } from "react";
import { useNavigate } from "react-router";
import Form from "../../components/form/Form";
import UserContext from "../../context";
import { apiUtil, end_point } from "../../utils/apiUtil";

const Login = () => {
  const navigate = useNavigate();
  const { setUser: setContextUser } = useContext(UserContext);

  const submit = async (user) => {
    const res = await apiUtil.post(end_point["user-login"], user);
    const authUser = res.data.data;

    localStorage.setItem("user", JSON.stringify(authUser));
    setContextUser({ type: "LOGIN", payload: authUser });

    if (["ADMIN"].includes(authUser.role)) {
      navigate("/admin");
    } else {
      navigate("/home");
    }
  };

  const fields = [
    {
      label: "Email",
      type: "email",
      key: "email",
    },
    {
      label: "Mật khẩu",
      type: "password",
      key: "password",
    },
  ];

  return (
    <div class="d-flex justify-content-center mt-5">
      <Form fields={fields} customSubmit={submit} col4={true} />
    </div>
  );
};

export default Login;
