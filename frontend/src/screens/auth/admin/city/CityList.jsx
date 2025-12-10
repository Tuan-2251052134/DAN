import BaseList from "../components/BaseList";

const CityList = () => {
  const formFields = [
    {
      label: "Tên thành phố",
      type: "text",
      key: "name",
    },
  ];
  const url = "/admin/city";
  const tableFields = ["id", "name"];
  const endPointKey = "city";
  return (
    <BaseList
      endPointKey={endPointKey}
      formFields={formFields}
      url={url}
      tableFields={tableFields}
    />
  );
};

export default CityList;
