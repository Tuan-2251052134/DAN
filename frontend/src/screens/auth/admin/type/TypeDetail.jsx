import { useParams } from "react-router-dom";
import Form from "../../../../components/form/Form";

const TypeDetail = () => {
  const { id } = useParams();

  const fields = [
    {
      label: "Id",
      type: "number",
      key: "id",
      disabled: true,
    },
    {
      label: "Tên loại",
      type: "text",
      key: "name",
    },
  ];

  const endPointKey = "type";
  return <Form endPointKey={endPointKey} id={id} fields={fields} />;
};

export default TypeDetail;
