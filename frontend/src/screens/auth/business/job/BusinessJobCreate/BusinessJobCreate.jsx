import { useNavigate } from "react-router-dom";
import Form from "../../../../../components/form/Form";
import { useContext } from "react";
import UserContext from "../../../../../context";
import { authApiUtil, end_point } from "../../../../../utils/apiUtil";
import { handleError } from "../../../../../utils/errorAlertUtil";

const BusinessJobCreate = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const fields = [
    {
      type: "text",
      label: "Tên công việc",
      key: "name",
    },
    {
      type: "textarea",
      label: "Mô tả công việc",
      key: "description",
    },
    {
      type: "number",
      label: "Giá tiền",
      key: "payment",
    },
    {
      type: "app-select",
      label: "Thể loại",
      endPointKey: "type",
      key: "typeId",
    },
    {
      type: "datetime-local",
      label: "Hạn chót",
      key: "expiredDate",
    },
  ];
  const customSubmit = async (data) => {
    try {
      data.userId = user.id;
      await authApiUtil().post(end_point["job"], data);
      alert("tạo thành công");
      navigate("/business/job");
    } catch (ex) {
      handleError(ex);
    }
  };

  return (
    <div className="mt-5 d-flex justify-content-center">
      <Form fields={fields} endPointKey={"job"} customSubmit={customSubmit} />
    </div>
  );
};

export default BusinessJobCreate;
