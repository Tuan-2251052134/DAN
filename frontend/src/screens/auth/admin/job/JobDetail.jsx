import { useParams } from "react-router-dom";
import Form from "../../../../components/form/Form";

const JobDetail = () => {
  const { id } = useParams();
  const fields = [
    {
      type: "text",
      label: "Tên",
      key: "name",
    },
    {
      type: "datetime-local",
      label: "Ngày tạo",
      key: "createdDate",
    },
    {
      type: "textarea",
      label: "Mô tả",
      key: "description",
    },
    {
      type: "number",
      label: "Tiền công",
      key: "payment",
    },
    {
      type: "app-select",
      label: "Người dùng",
      endPointKey: "user",
      key: "user",
    },
    {
      type: "datetime-local",
      label: "Ngày hoàn thành",
      key: "expiredDate",
    },
    {
      type: "select",
      label: "Trạng thái",
      key: "status",
      data: [
        {
          label: "Duyệt",
          value: "PASS",
        },
        {
          label: "Đợi duyệt",
          value: "WAIT",
        },
        {
          label: "Không duyệt",
          value: "FAIL",
        },
      ],
    },
    {
      type: "text",
      label: "Thông tin",
      key: "message.value",
    },
    {
      type: "app-select",
      label: "Thể loại",
      key: "type",
      endPointKey: "type",
    },
  ];

  const endPointKey = "job";

  return <Form endPointKey={endPointKey} id={id} fields={fields} />;
};

export default JobDetail;
