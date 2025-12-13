import { useEffect, useState } from "react";
import Form from "../../../../components/form/Form";
import Table from "../../../../components/table/Table";

const BaseList = ({
  endPointKey,
  formFields,
  tableFields,
  url,
  customSubmit,
  newData = false,
}) => {
  const [dataList, setDataList] = useState([]);

  const afterSubmit = (data) => {
    setDataList([data, ...dataList]);
  };

  useEffect(() => {
    if (newData) {
      setDataList([newData, ...dataList]);
    }
  }, [newData]);

  return (
    <>
      <Form
        endPointKey={endPointKey}
        afterSubmit={afterSubmit}
        fields={formFields}
        customSubmit={customSubmit}
      />

      <Table
        list={dataList}
        setList={setDataList}
        url={url}
        endPointKey={endPointKey}
        fields={tableFields}
        searchFields={formFields}
      />
    </>
  );
};

export default BaseList;
