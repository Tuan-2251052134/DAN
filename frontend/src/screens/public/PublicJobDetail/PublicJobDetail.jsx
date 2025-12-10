import { useNavigate, useParams } from "react-router-dom";
import Form from "../../../components/form/Form";

const PublicJobDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const fields = [
    {
      type: "image",
      label: "",
      key: "user.avatar",
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
      label: "Hạn chót",
      key: "expiredDate",
      disabled: true,
    },
  ];

  const endPointKey = "job";

  const customSubmit = () => {
    navigate(`/jobseeker/cv?jobId=${id}`);
  };

  return (
    <div className="container pt-5 pb-5">
      <div className="row justify-content-center">
        <Form
          id={id}
          displayDelete={false}
          fields={fields}
          endPointKey={endPointKey}
          customSubmit={customSubmit}
        />
      </div>
    </div>
  );
};

export default PublicJobDetail;
