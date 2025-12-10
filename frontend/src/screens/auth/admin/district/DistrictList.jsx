import BaseList from "../components/BaseList";

const DistrictList = () => {
  const formFields = [
    {
      type: "text",
      label: "Tên",
      key: "name",
    },
    {
      type: "app-select",
      label: "thành phố",
      endPointKey: "city",
      key: "city",
    },
  ];

  const tableFields = ["id", "name"];

  return (
    <BaseList
      endPointKey={"district"}
      formFields={formFields}
      tableFields={tableFields}
      url={"/admin/district"}
    />
  );
};

export default DistrictList;
