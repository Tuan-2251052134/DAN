import { useParams } from "react-router";
import Form from "../../../../components/form/Form";

const CVDetail = () => {
  const { id } = useParams();

  const fields = [
    {
      label: "Id",
      type: "number",
      key: "id",
      disabled: true,
    },
    {
      label: "Tên CV",
      type: "text",
      key: "name",
    },
    {
      label: "Hình ảnh CV",
      type: "iframe",
      key: "url",
    },
    {
      label: "Nhập file CV",
      type: "cvFile",
      key: "cvFile",
    },
    {
      type: "app-select",
      label: "Job seeker",
      endPointKey: "user",
      key: "user",
    },
  ];

  const endPointKey = "cv";

  return <Form endPointKey={endPointKey} id={id} fields={fields} />;
};

export default CVDetail;
