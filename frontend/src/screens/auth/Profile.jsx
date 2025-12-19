import { useContext } from "react";
import Form from "../../components/form/Form";
import UserContext from "../../context";
import { authApiUtil, end_point } from "../../utils/apiUtil";

const Profile = () => {
  const { user } = useContext(UserContext);
  const fields = [
    {
      type: "number",
      key: "id",
      label: "Id",
      disabled: true,
    },
    {
      type: "image",
      key: "avatar",
      label: "Avatar",
    },
    {
      type: "app-select",
      key: "district.city",
      endPointKey: "city",
      label: "Thành phố",
    },
    {
      type: "app-select",
      key: "district",
      extraQueryKey: "cityId",
      extraQueryValueKey: "district.cityId",
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
    ...(user?.role == "JOB_SEEKER"
      ? [
          {
            label: "CV",
            type: "iframe",
            key: "cv.url",
          },
          {
            label: "CV",
            type: "file",
            key: "cv",
          },
        ]
      : []),
  ];

  const customSubmit = async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    await authApiUtil().put(end_point["user-detail"]("profile"), formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  return (
    <div className="d-flex justify-content-center mt-3 mb-3">
      <Form
        endPointKey={"user"}
        id={"profile"}
        fields={fields}
        customSubmit={customSubmit}
        deleteHandler={() => {}}
      />
    </div>
  );
};

export default Profile;
