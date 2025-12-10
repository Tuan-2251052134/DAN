import { useNavigate, useParams } from "react-router-dom";
import Form from "../../../../../components/form/Form";

const BusinessJobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const fields = [
    {
      type: "image",
      label: "",
      key: "user.avatar",
      disabled: true,
    },
    {
      type: "text",
      label: "tên",
      key: "user.name",
      disabled: true,
    },
    {
      type: "text",
      label: "Tên công việc",
      key: "name",
      disabled: true,
    },
    {
      type: "textarea",
      label: "Mô tả công việc",
      key: "description",
      disabled: true,
    },
    {
      type: "number",
      label: "Giá tiền",
      key: "payment",
      disabled: true,
    },
    {
      type: "text",
      label: "Thể loại",
      key: "type.name",
      disabled: true,
    },
    {
      type: "datetime-local",
      label: "Ngày tạo",
      key: "createdDate",
      disabled: true,
    },
    {
      type: "datetime-local",
      label: "Hạn chót",
      key: "expiredDate",
    },
    {
      type: "text",
      label: "Tin nhắn",
      key: "message.value",
      disabled: true,
    },
  ];

  const afterSubmit = () => {
    navigate("/business/job");
  };

  const navigateToApply = () => {
    navigate(`/business/job/${id}/apply/`);
  };

  return (
    <div className="mt-5 d-flex justify-content-center">
      <Form
        defaultValue={{ status: "WAIT" }}
        fields={fields}
        endPointKey={"job"}
        id={id}
        afterSubmit={afterSubmit}
        extraButtons={[
          { name: "xem danh sách ứng tuyển", click: navigateToApply },
        ]}
      />
    </div>
  );
};

export default BusinessJobDetail;
