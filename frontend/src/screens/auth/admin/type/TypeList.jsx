import BaseList from "../components/BaseList";

const TypeList = () => {
  const formFields = [
    {
      label: "Tên",
      key: "name",
      type: "text",
    },
  ];
  const url = "/admin/type";
  const endPointKey = "type";
  const tableFields = ["id", "name"];

  return (
    <BaseList
      url={url}
      endPointKey={endPointKey}
      formFields={formFields}
      tableFields={tableFields}
    />
  );
};

export default TypeList;
