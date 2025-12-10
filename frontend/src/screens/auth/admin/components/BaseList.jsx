import { useState } from "react";
import Form from "../../../../components/form/Form";
import Table from "../../../../components/table/Table";

const BaseList = ({ endPointKey, formFields, tableFields, url }) => {
  const [dataList, setDataList] = useState([]);

  const afterSubmit = (data) => {
    setDataList([data, ...dataList]);
  };

  return (
    <>
      <Form
        endPointKey={endPointKey}
        afterSubmit={afterSubmit}
        fields={formFields}
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
