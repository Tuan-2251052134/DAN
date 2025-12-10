import BaseList from "../components/BaseList";

const JobList = () => {
  const formFields = [
    {
      type: "text",
      label: "Tên",
      key: "name",
    },
    {
      type: "datetime-local",
      label: "Ngày tạo",
      key: "createdDate",
    },
    {
      type: "textarea",
      label: "Mô tả",
      key: "description",
    },
    {
      type: "number",
      label: "Tiền công",
      key: "payment",
    },
    {
      type: "app-select",
      label: "Người dùng",
      endPointKey: "user",
      key: "user",
    },
    {
      type: "datetime-local",
      label: "Ngày hoàn thành",
      key: "expiredDate",
    },
    {
      type: "select",
      label: "Trạng thái",
      key: "status",
      data: [
        {
          label: "Duyệt",
          value: "PASS",
        },
        {
          label: "Đợi duyệt",
          value: "WAIT",
        },
        {
          label: "Không duyệt",
          value: "FAIL",
        },
      ],
    },
    {
      type: "text",
      label: "Thông tin",
      key: "message.value",
    },
    {
      type: "app-select",
      label: "Thể loại",
      key: "type",
      endPointKey: "type",
    },
  ];

  const tableFields = ["id", "name", "status"];

  return (
    <BaseList
      endPointKey={"job"}
      formFields={formFields}
      tableFields={tableFields}
      url={"/admin/job"}
    />
  );
};

export default JobList;
