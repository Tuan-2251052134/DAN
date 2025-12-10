import { useParams } from "react-router-dom";
import Form from "../../../../components/form/Form";

const CityDetail = () => {
  const { id } = useParams();

  const fields = [
    {
      label: "Id",
      type: "number",
      key: "id",
      disabled: true,
    },
    {
      label: "Tên thành phố",
      type: "text",
      key: "name",
    },
  ];

  const endPointKey = "city";

  return <Form endPointKey={endPointKey} id={id} fields={fields} />;
};

export default CityDetail;
