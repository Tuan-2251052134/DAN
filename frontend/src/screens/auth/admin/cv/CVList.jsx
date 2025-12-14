import { authApiUtil, end_point } from "../../../../utils/apiUtil";
import { handleError } from "../../../../utils/errorAlertUtil";
import BaseList from "../components/BaseList";

const CVList = () => {
  const formFields = [
    {
      key: "name",
      label: "Tên CV",
      type: "text",
    },
    {
      type: "app-select",
      endPointKey: "user",
      label: "Job seeker",
      key: "user",
    },
    {
      type: "file",
      label: "File cv",
      key: "cvFile",
    },
  ];
  const tableFields = ["id", "name"];

  const customSubmit = async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    const res = await authApiUtil().post(end_point["cv"], formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    alert("tạo thành công");
    return res.data.data;
  };
  return (
    <BaseList
      formFields={formFields}
      endPointKey={"cv"}
      url={"/admin/cv"}
      customSubmit={customSubmit}
      tableFields={tableFields}
    />
  );
};

export default CVList;
