import { useEffect, useState } from "react";
import BaseList from "../components/BaseList";
import { apiUtil, end_point } from "../../../../utils/apiUtil";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    const res = await apiUtil.get(end_point["user"]);
    setUsers(res.data.data);
  };

  const fields = [
    {
      type: "app-select",
      key: "districtId",
      endPointKey: "district",
      label: "Quận",
    },
    {
      type: "text",
      key: "address",
      label: "Địa chỉ",
    },
    {
      type
    }
  ];

  useEffect(() => {
    getUsers();
  }, []);
  return <BaseList endPointKey={"cv"} formFields={fields} />;
};

export default UserList;
