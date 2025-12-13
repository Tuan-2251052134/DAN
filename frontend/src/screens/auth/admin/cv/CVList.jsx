import BaseList from "../components/BaseList";

const CVList = () => {
  const formFields = [
    {
      key: "name",
      label: "Tên CV",
      type: "text",
    },
    {
      type: "app-select",
      endPointKey: "user",
      label: "Job seeker",
      key: "user",
    },
    {
      type: "file",
      label: "File cv",
      key: "cvFile",
    },
  ];
  const tableFields = ["id", "name"];

  const customSubmit = (data) => {
    console.log()
  }
  return (
    <BaseList
      formFields={formFields}
      endPointKey={"cv"}
      tableFields={tableFields}
    />
  );
};

export default CVList;
