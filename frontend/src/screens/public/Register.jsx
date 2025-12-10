import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../../components/form/Form";
import { apiUtil, end_point } from "../../utils/apiUtil";
import { handleError } from "../../utils/errorAlertUtil";

const Register = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(user).forEach((key) => {
        formData.append(key, user[key]);
      });

      await apiUtil.post(end_point["user"], formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("đã tạo tài khoản thành công");
      navigate("/login")
    } catch (ex) {
      handleError(ex);
    }
  };

  const fields = [
    {
      label: "Avatar",
      type: "image",
      value: user.avatar && URL.createObjectURL(user.avatar),
      setValue: (value) => {
        setUser({ ...user, avatar: value });
      },
    },
    {
      label: "Tên",
      value: user.name,
      type: "text",
      setValue: (value) => {
        setUser({ ...user, name: value });
      },
    },
    {
      label: "Email",
      value: user.value,
      type: "email",
      setValue: (value) => {
        setUser({ ...user, email: value });
      },
    },
    {
      label: "Mật khẩu",
      value: user.password,
      type: "password",
      setValue: (value) => {
        setUser({ ...user, password: value });
      },
    },
    {
      label: "Địa chỉ",
      value: user.address,
      type: "text",
      setValue: (value) => {
        setUser({ ...user, address: value });
      },
    },
    {
      label: "vai trò",
      type: "select",
      data: [
        {
          label: "doanh nghiệp",
          value: "BUSINESS",
        },
        {
          label: "job seeker",
          value: "JOB_SEEKER",
        },
      ],
      setValue: (item) => {
        setUser({ ...user, role: item.value });
      },
    },
    {
      label: "Thành phố",
      type: "app-select",
      mainUrl: end_point["city"],
      setValue: (id) => {
        setUser({ ...user, cityId: id });
      },
    },
    {
      label: "Quận",
      type: "app-select",
      mainUrl: `${end_point["district"]}/?cityId=${user.cityId}`,
      setValue: (id) => {
        setUser({ ...user, districtId: id });
      },
    },
  ];

  return (
    <div className="d-flex justify-content-center mt-3 mb-3 ">
      <Form fields={fields} submit={submit} col4={true} />
    </div>
  );
};

export default Register;
