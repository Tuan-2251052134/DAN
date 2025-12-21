import { useContext, useState } from "react";
import Form from "../../../components/form/Form";
import UserContext from "../../../context";
import "./styles.css";
import { apiUtil, authApiUtil, end_point } from "../../../utils/apiUtil";
import JobCard from "../../../components/jobCard/JobCard";
import { useEffect } from "react";
import { handleError } from "../../../utils/errorAlertUtil";

const Profile = () => {
  const { user } = useContext(UserContext);
  const fields = [
    {
      type: "number",
      key: "id",
      label: "Id",
      disabled: true,
    },
    {
      type: "image",
      key: "avatar",
      label: "Avatar",
    },
    {
      type: "app-select",
      key: "district.city",
      endPointKey: "city",
      label: "Thành phố",
    },
    {
      type: "app-select",
      key: "district",
      extraQueryKey: "cityId",
      extraQueryValueKey: "district.cityId",
      endPointKey: "district",
      label: "Quận",
    },
    {
      type: "text",
      key: "address",
      label: "Địa chỉ",
    },
    {
      label: "Vai trò",
      type: "select",
      data: [
        {
          label: "doanh nghiệp",
          value: "BUSINESS",
        },
        {
          label: "job seeker",
          value: "JOB_SEEKER",
        },
      ],
      key: "role",
    },
    {
      label: "Tên",
      type: "text",
      key: "name",
    },
    {
      label: "Email",
      type: "email",
      key: "email",
    },
    {
      label: "Mật khẩu",
      type: "password",
      key: "password",
    },
    ...(user?.role == "JOB_SEEKER"
      ? [
          {
            label: "CV",
            type: "iframe",
            key: "cv.url",
          },
          {
            label: "CV",
            type: "file",
            key: "cv",
          },
        ]
      : []),
  ];

  const customSubmit = async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    await authApiUtil().put(end_point["user-detail"]("profile"), formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };
  const [offset, setOffset] = useState(0);

  const [applies, setApplies] = useState([]);

  const fetchApplies = async () => {
    try {
      const res = await authApiUtil().get(
        `${end_point["apply"]}?offset=${offset}`
      );
      setApplies(res.data.data);
    } catch (ex) {
      handleError(ex);
    }
  };

  useEffect(() => {
    fetchApplies();
  }, [offset]);

  const increaseOffset = () => {
    setOffset(offset + 1);
  };

  const descreaseOffset = () => {
    setOffset(offset - 1);
  };

  return (
    <>
      <div className="d-flex justify-content-center mt-3 mb-3">
        <Form
          endPointKey={"user"}
          id={"profile"}
          fields={fields}
          customSubmit={customSubmit}
          deleteHandler={() => {}}
        />
      </div>
      <div className="d-flex justify-content-center mt-3 mb-3">
        <div className="jobsContainer col-8 p-3">
          {applies.map((apply) => (
            <JobCard
              url={"/job"}
              id={apply.jobId}
              typeName={apply["job.type.name"]}
              name={apply["job.name"]}
              createdDate={apply.createdDate}
              expiredDate={apply["job.expiredDate"]}
              status={apply.status}
            />
          ))}
          <div className="d-flex justify-content-center mt-2 gap-2">
            {offset ? (
              <button className="btn btn-primary" onClick={descreaseOffset}>
                &larr;{" "}
              </button>
            ) : (
              <></>
            )}
            {applies.length ? (
              <button className="btn btn-primary" onClick={increaseOffset}>
                &rarr;{" "}
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
