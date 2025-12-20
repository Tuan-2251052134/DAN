import { useParams } from "react-router";
import Form from "../../../../components/form/Form";

const DistrictDetail = () => {
  const { id } = useParams();

  const fields = [
    {
      label: "Id",
      type: "number",
      key: "id",
      disabled: true,
    },
    {
      label: "Tên quận",
      type: "text",
      key: "name",
    },
    {
      type: "app-select",
      label: "Thành phố",
      endPointKey: "city",
      key: "city",
    },
  ];

  const endPointKey = "district";

  return <Form endPointKey={endPointKey} id={id} fields={fields} />;
};

export default DistrictDetail;
