import { useNavigate } from "react-router-dom";
import Form from "../../../../components/form/Form";
import { useContext } from "react";
import UserContext from "../../../../context";
import { authApiUtil, end_point } from "../../../../utils/apiUtil";
import { handleError } from "../../../../utils/errorAlertUtil";

const JobseekerCVCreate = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const fields = [
    {
      type: "text",
      key: "name",
      label: "Tên CV",
    },
    {
      type: "file",
      key: "cvFile",
      label: "Chọn CV",
    },
  ];

  const customSubmit = async (data) => {
    try {
      data.userId = user.id;
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      await authApiUtil().post(end_point[`cv`], formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });

      navigate("/jobseeker/cv");
    } catch (ex) {
      handleError(ex);
    }
  };

  const endPointKey = "cv";

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <Form
          isFormData={true}
          defaultValue={{ userId: user?.id }}
          fields={fields}
          endPointKey={endPointKey}
          customSubmit={customSubmit}
        />
      </div>
    </div>
  );
};

export default JobseekerCVCreate;
