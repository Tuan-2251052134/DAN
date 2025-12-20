import { useParams } from "react-router";
import Form from "../../../../components/form/Form";

const UserDetail = () => {
  const { id } = useParams();

  const fields = [
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
  ];

  return <Form endPointKey={"user"} id={id} fields={fields} />;
};

export default UserDetail;
