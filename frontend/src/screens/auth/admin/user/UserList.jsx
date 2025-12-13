import { useState } from "react";
import { apiUtil, end_point } from "../../../../utils/apiUtil";
import BaseList from "../components/BaseList";

const UserList = () => {
  const [user, setUser] = useState({});
  const fields = [
    {
      type: "image",
      key: "avatar",
      label: "Avatar",
    },
    {
      type: "app-select",
      key: "city",
      endPointKey: "city",
      label: "Thành phồ",
    },
    {
      type: "app-select",
      key: "district",
      extraQueryKey: "cityId",
      extraQueryValueKey: "cityId",
      endPointKey: "district",
      label: "Quận",
    },
    {
      type: "text",
      key: "address",
      label: "Địa chỉ",
    },
    {
      label: "Vai trò",
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
      key: "role",
    },
    {
      label: "Tên",
      type: "text",
      key: "name",
    },
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

  const tableFields = ["id", "email", "name", "role"];

  const customSubmit = async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    const res = await apiUtil.post(end_point["user"], formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    setUser(res.data.data);
  };

  return (
    <BaseList
      customSubmit={customSubmit}
      endPointKey={"user"}
      url={"/admin/user"}
      tableFields={tableFields}
      formFields={fields}
      newData={user}
    />
  );
};

export default UserList;
