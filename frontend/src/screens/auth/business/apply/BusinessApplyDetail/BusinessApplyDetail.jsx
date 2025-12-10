import { useEffect } from "react";
import { handleError } from "../../../../../utils/errorAlertUtil";
import { authApiUtil, end_point } from "../../../../../utils/apiUtil";
import Form from "../../../../../components/form/Form";
import { useParams } from "react-router-dom";

const BusinessApplyDetail = () => {
  const { applyId } = useParams();

  const fields = [
    {
      type: "image",
      key: "cv.user.avatar",
      disabled: true,
    },
    {
      type: "text",
      key: "cv.user.name",
      label: "Tên ứng viên",
      disabled: true,
    },
    {
      type: "email",
      key: "cv.user.email",
      label: "Email",
      disabled: true,
    },
    {
      type: "text",
      key: "cv.name",
      disabled: true,
    },
    {
      type: "iframe",
      key: "cv.url",
      label: "CV",
      disabled: true,
    },
    {
      type: "text",
      key: "status",
      label: "Trạng thái",
      disabled: true,
    },
  ];

  const getData = async () => {
    try {
      const res = await authApiUtil().get(end_point["apply-detail"](applyId));
    } catch (ex) {
      handleError(ex);
    }
  };

  const customSubmit = async (data) => {
    data.status = "PASS";
    try {
      const res = await authApiUtil().patch(
        end_point["apply-detail"](applyId),
        data
      );
      alert("Chấp nhận thành công");
    } catch (ex) {
      handleError(ex);
    }
  };

  const denyApply = async (data) => {
    data.status = "FAIL";
    try {
      const res = await authApiUtil().patch(
        end_point["apply-detail"](applyId),
        data
      );
      alert("Chấp nhận thành công");
    } catch (ex) {
      handleError(ex);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="mt-5 mb-5 d-flex justify-content-center">
      <Form
        fields={fields}
        id={applyId}
        endPointKey={"apply"}
        customSubmit={customSubmit}
        displayDelete={false}
        extraButtons={[{ name: "Từ chối", click: denyApply }]}
      />
    </div>
  );
};

export default BusinessApplyDetail;
