import { useState } from "react";
import Form from "../../components/form/Form";
import { end_point } from "../../utils/apiUtil";

const Profile = () => {
  const [user, setUser] = useState({});
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
  return <Form fields={fields} submit={() => {}} deleteHandler={() => {}} />;
};

export default Profile;
